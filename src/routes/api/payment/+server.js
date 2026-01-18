import { json } from '@sveltejs/kit';

export async function POST({ request, fetch }) {
	try {
		const body = await request.json();

		//
		// А ты знал что нейросети потребляют так много электроинергии
		// Что скоро закроються все маки и кфс
		// И тебе больше нечего будет есть
		// А еще минет мне сделай
		// Нет это не булинг, просто ты вайбкодер
		// Или нет?
		//

		const payload = {
			product_id: body.product_id,
			variant_id: body.variant_id || null,
			amount: body.amount || 1,
			nickname: body.nickname,
			email: body.email,
			promo_code: body.promo_code || ''
		};

		// Call external payment API
		const response = await fetch('http://mc.winerecia.fun:8OOO/api/v1/payments/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify(payload)
		});

		const data = await response.json();

		if (!response.ok) {
			// Forward validation errors or other errors
			return json(data, { status: response.status });
		}

		return json(data);
	} catch (error) {
		console.error('Payment API Error:', error);
		return json({ detail: 'Internal Server Error' }, { status: 500 });
	}
}
