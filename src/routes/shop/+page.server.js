export async function load({ fetch }) {
	try {
		const response = await fetch('http://mc.winerecia.fun:8000/api/v1/products?size=100');
		if (response.ok) {
			const data = await response.json();

			// Map API data to frontend format if necessary, or pass directly
			// For now, passing items directly, we might need to enhance them in the component
			return {
				products: data.items
			};
		} else {
			console.error('Failed to fetch products:', response.status);
			return { products: [] };
		}
	} catch (error) {
		console.error('Error fetching products:', error);
		return { products: [] };
	}
}
