// Proxy images from backend to avoid mixed content issues (HTTPS -> HTTP)
// Features: in-memory cache, ETag support, proper error handling

const BACKEND_URL = 'http://mc.winerecia.fun:8000';
const CACHE_TTL = 60 * 60 * 24; // 24 hours in seconds
const MAX_CACHE_SIZE = 100; // Max images to cache in memory

// Simple in-memory cache with LRU-like behavior
const imageCache = new Map();

function getCached(key) {
	const item = imageCache.get(key);
	if (!item) return null;

	if (Date.now() > item.expires) {
		imageCache.delete(key);
		return null;
	}

	// Move to end (most recently used)
	imageCache.delete(key);
	imageCache.set(key, item);
	return item;
}

function setCache(key, data, contentType, etag) {
	// Evict oldest if at capacity
	if (imageCache.size >= MAX_CACHE_SIZE) {
		const firstKey = imageCache.keys().next().value;
		imageCache.delete(firstKey);
	}

	imageCache.set(key, {
		data,
		contentType,
		etag,
		expires: Date.now() + CACHE_TTL * 1000
	});
}

function generateETag(data) {
	// Simple hash based on content length and first/last bytes
	const arr = new Uint8Array(data);
	const hash = arr.length + '-' + (arr[0] || 0) + '-' + (arr[arr.length - 1] || 0);
	return `"${hash}"`;
}

export async function GET({ params, request }) {
	const path = params.path;

	if (!path) {
		return new Response('Path required', { status: 400 });
	}

	// Sanitize path to prevent directory traversal
	const sanitizedPath = path.replace(/\.\./g, '').replace(/\/+/g, '/');
	const cacheKey = sanitizedPath;

	// Check client cache via If-None-Match
	const clientETag = request.headers.get('if-none-match');

	// Check memory cache first
	const cached = getCached(cacheKey);
	if (cached) {
		// If client has same version, return 304
		if (clientETag && clientETag === cached.etag) {
			return new Response(null, {
				status: 304,
				headers: {
					ETag: cached.etag,
					'Cache-Control': `public, max-age=${CACHE_TTL}, immutable`
				}
			});
		}

		// Return cached version
		return new Response(cached.data, {
			headers: {
				'Content-Type': cached.contentType,
				'Cache-Control': `public, max-age=${CACHE_TTL}, immutable`,
				ETag: cached.etag,
				'X-Cache': 'HIT'
			}
		});
	}

	// Fetch from backend
	const backendUrl = `${BACKEND_URL}/${sanitizedPath}`;

	try {
		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

		const response = await fetch(backendUrl, {
			signal: controller.signal,
			headers: {
				Accept: 'image/*'
			}
		});

		clearTimeout(timeout);

		if (!response.ok) {
			if (response.status === 404) {
				return new Response('Image not found', {
					status: 404,
					headers: { 'Cache-Control': 'no-cache' }
				});
			}
			return new Response('Backend error', { status: 502 });
		}

		const contentType = response.headers.get('content-type') || 'image/png';

		// Only cache actual images
		if (!contentType.startsWith('image/')) {
			return new Response('Not an image', { status: 400 });
		}

		const imageData = await response.arrayBuffer();
		const etag = generateETag(imageData);

		// Cache it
		setCache(cacheKey, imageData, contentType, etag);

		return new Response(imageData, {
			headers: {
				'Content-Type': contentType,
				'Cache-Control': `public, max-age=${CACHE_TTL}, immutable`,
				ETag: etag,
				'X-Cache': 'MISS'
			}
		});
	} catch (error) {
		if (error.name === 'AbortError') {
			return new Response('Backend timeout', { status: 504 });
		}

		console.error('Image proxy error:', error.message);
		return new Response('Failed to fetch image', {
			status: 502,
			headers: { 'Cache-Control': 'no-cache' }
		});
	}
}
