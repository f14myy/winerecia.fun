<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import ShopHeader from '$lib/components/shop/ShopHeader.svelte';
	import ShopFilters from '$lib/components/shop/ShopFilters.svelte';
	import ProductCard from '$lib/components/shop/ProductCard.svelte';
	import CoinCard from '$lib/components/shop/CoinCard.svelte';
	import PurchaseModal from '$lib/components/shop/PurchaseModal.svelte';

	let selectedCategory = $state('all');
	let searchQuery = $state('');
	let modalOpen = $state(false);
	let modalProduct = $state(null);
	let modalAmount = $state(null);
	let modalPrice = $state(0);

	//
	// Дорогой кендлал
	// Компоненты модальных окон
	// Для успешной или НЕ успешной оплаты
	// Находятся в /lib/components/shop/
	// А еще нейронка тебе хуйню сгенерировала
	//

	// Услышал тебя, родной

	function handleBuy(product, amount, price) {
		modalProduct = product;
		modalAmount = amount;
		modalPrice = price;
		modalOpen = true;

		// Добавляем параметры в URL
		const params = new URLSearchParams();
		params.set('product', product.id.toString());
		if (amount && amount.duration) {
			params.set('variant', amount.duration.toString());
		}
		goto(`?${params.toString()}`, { replaceState: true, noScroll: true });
	}

	function handleCloseModal() {
		modalOpen = false;
		// Удаляем параметры из URL
		goto('/shop', { replaceState: true, noScroll: true });
	}

	async function handleConfirmPurchase(data) {
		console.log('Purchase confirmed:', data);

		try {
			const payload = {
				product_id: data.product.id,
				nickname: data.nickname,
				email: data.email,
				amount: 1, // Default amount for subscriptions
				promo_code: data.promoCode || ''
			};

			if (data.product.category === 'currency') {
				payload.amount = data.amount;
				// variant_id is likely not needed or null for currency, but payload preparation in server handles it
			} else {
				// Privilege variant
				if (data.amount && data.amount.id !== undefined) {
					payload.variant_id = data.amount.id;
				}
			}

			const response = await fetch('/api/payment', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			});

			const result = await response.json();

			if (!response.ok) {
				if (result.detail) {
					// Handle validation errors validation array or string
					const msg = Array.isArray(result.detail)
						? result.detail.map((e) => `${e.loc.join('.')}: ${e.msg}`).join('\n')
						: result.detail;
					alert(`Ошибка валидации:\n${msg}`);
				} else {
					alert('Произошла ошибка при создании платежа.');
				}
				return;
			}

			if (result.payment_url) {
				window.location.href = result.payment_url;
			} else {
				alert('Ошибка: Не получена ссылка на оплату.');
			}
		} catch (e) {
			console.error(e);
			alert('Ошибка сети или сервера.');
		}
	}

	let { data } = $props();

	// Fallback images map based on product IDs or names if API doesn't provide them
	const imageMap = {
		Мэр: '/shop/mer.webp',
		Конкистадор: '/shop/konk.webp',
		Император: '/shop/imperator.webp',
		Призидент: '/shop/tramp.webp',
		Султан: '/shop/sultann.webp',
		Властелин: '/shop/boss.webp',
		Винерик: '/shop/coin.png'
	};

	// Enrich products with local images if missing from API
	// Enrich products with local images if missing from API and map snake_case to camelCase
	const products = $derived(
		data.products.map((p) => {
			// Map snake_case currency fields to camelCase
			const mappedProduct = {
				...p,
				pricePerUnit: p.price_per_unit || p.pricePerUnit,
				minAmount: p.min_amount || p.minAmount,
				maxAmount: p.max_amount || p.maxAmount,
				defaultAmount: p.default_amount || p.defaultAmount,
				// Resolve image path: use local proxy to avoid mixed content issues
				image: p.image
					? p.image.startsWith('http')
						? `/api/images/${p.image.replace(/^https?:\/\/mc\.winerecia\.fun:8000\//, '')}`
						: `/api/images${p.image.startsWith('/') ? '' : '/'}${p.image}`
					: imageMap[p.name] || '/shop/coin.png'
			};

			// Handle variants
			let variants = p.variants || [];

			// If no variants for privilege, add defaults
			if (mappedProduct.category === 'privilege' && variants.length === 0) {
				variants = [
					{
						id: 'default_30',
						duration: 30,
						price: 150, // Default price, adjust as needed
						label: '30 дней',
						enabled: true
					},
					{
						id: 'default_forever',
						duration: 999,
						price: 450, // Default price
						label: 'Навсегда',
						badge: 'ВЫГОДНО',
						enabled: true
					}
				];
			}

			mappedProduct.variants = variants.map((v) => ({
				...v,
				enabled: v.enabled !== undefined ? v.enabled : true,
				label: v.label || (v.duration === 999 ? 'Навсегда' : `${v.duration} дней`)
			}));

			return mappedProduct;
		})
	);

	const filteredProducts = $derived(
		products.filter((product) => {
			const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
			const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
			return matchesCategory && matchesSearch;
		})
	);

	// Сразу нахуй открываем при наличии параметров
	$effect(() => {
		const productId = $page.url.searchParams.get('product');
		const variantDuration = $page.url.searchParams.get('variant');

		if (productId) {
			const product = products.find((p) => p.id === parseInt(productId));
			if (product) {
				let amount = null;
				let price = 0;

				if (product.category === 'currency') {
					amount = product.defaultAmount || 100;
					price = amount * (product.pricePerUnit || 2);
				} else if (product.variants) {
					if (variantDuration) {
						amount = product.variants.find((v) => v.duration === parseInt(variantDuration));
					}
					if (!amount) {
						amount = product.variants.find((v) => v.enabled) || product.variants[0];
					}
					price = amount.price;
				}

				modalProduct = product;
				modalAmount = amount;
				modalPrice = price;
				modalOpen = true;
			}
		}
	});
</script>

<svelte:head>
	<title>Магазин - Winerecia</title>
</svelte:head>

<section class="shop">
	<div class="container">
		<!-- Хедер и поиск -->
		<ShopHeader {searchQuery} onSearchChange={(value) => (searchQuery = value)} />

		<!-- Фильтры -->
		<ShopFilters
			{selectedCategory}
			onCategoryChange={(category) => (selectedCategory = category)}
		/>

		<!-- Товары -->
		<div class="shop__grid">
			{#each filteredProducts as product (product.id)}
				{#if product.category === 'currency'}
					<CoinCard {product} onBuy={handleBuy} />
				{:else}
					<ProductCard {product} onBuy={handleBuy} />
				{/if}
			{/each}
		</div>

		{#if filteredProducts.length === 0}
			<div class="shop__empty">
				<p>Товары не найдены</p>
			</div>
		{/if}
	</div>
</section>

<PurchaseModal
	isOpen={modalOpen}
	product={modalProduct}
	amount={modalAmount}
	price={modalPrice}
	onClose={handleCloseModal}
	onConfirm={handleConfirmPurchase}
/>

<style lang="scss">
	.shop {
		padding: 8rem 1rem 6rem;
		min-height: 100vh;
		background: linear-gradient(
			to bottom,
			var(--background),
			rgba(233, 30, 99, 0.05),
			var(--background)
		);

		&__grid {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
			gap: 2rem;
			align-items: start;

			@media (max-width: 768px) {
				grid-template-columns: 1fr;
			}
		}

		&__empty {
			text-align: center;
			padding: 4rem 2rem;
			color: var(--muted-foreground);
			font-size: 1.25rem;
		}
	}
</style>
