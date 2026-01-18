<script>
	import { ShoppingCart, Share2, Coins, TrendingUp } from 'lucide-svelte';
	import { fly, fade } from 'svelte/transition';

	let { product, onBuy } = $props();

	const pricePerUnit = product.pricePerUnit || 2;
	const minAmount = product.minAmount || 1;
	const maxAmount = product.maxAmount || 10000;
	const defaultAmount = product.defaultAmount || 100;

	let amount = $state(defaultAmount);
	const totalPrice = $derived(amount * pricePerUnit);

	function handleAmountChange(e) {
		let value = parseInt(e.target.value) || minAmount;
		if (value < minAmount) value = minAmount;
		if (value > maxAmount) value = maxAmount;
		amount = value;
	}

	function handleBuy() {
		onBuy(product, amount, totalPrice);
	}

	function handleShare() {
		const url = new URL(window.location.origin + '/shop');
		url.searchParams.set('product', product.id.toString());

		navigator.clipboard
			.writeText(url.toString())
			.then(() => {})
			.catch(() => {});
	}
</script>

<div class="currency-card">
	<div class="currency-card__inner">
		<div class="currency-card__image-container">
			<img
				src={product.image}
				alt={product.name}
				class="currency-card__image"
				onerror={(e) => (e.currentTarget.src = '/shop/coin.png')}
			/>
			<div class="currency-card__image-overlay"></div>
			<div class="currency-card__icon-badge">
				<Coins size={14} fill="currentColor" />
				<span>Валюта</span>
			</div>
		</div>

		<div class="currency-card__content">
			<div class="currency-card__header">
				<h3 class="font-heading currency-card__name">{product.name}</h3>
				<button class="currency-card__share" onclick={handleShare} title="Копировать ссылку">
					<Share2 size={16} />
				</button>
			</div>

			<div class="currency-card__amount-section">
				<div class="currency-card__input-group">
					<input
						type="number"
						class="currency-card__input"
						value={amount}
						oninput={handleAmountChange}
						min={minAmount}
						max={maxAmount}
					/>
					<div class="currency-card__input-label">штук</div>
				</div>
				<div class="currency-card__range-info">
					<TrendingUp size={12} />
					<span>{minAmount.toLocaleString()} — {maxAmount.toLocaleString()}</span>
				</div>
			</div>

			<div class="currency-card__footer">
				<div class="currency-card__price-tag">
					<span class="currency-card__price">{totalPrice.toFixed(0)}</span>
					<span class="currency-card__currency">₽</span>
				</div>

				<button class="currency-card__buy-btn" onclick={handleBuy}>
					<ShoppingCart size={18} strokeWidth={2.5} />
					<span>К оплате</span>
					<div class="currency-card__buy-glow"></div>
				</button>
			</div>
		</div>
	</div>
	<div class="currency-card__glow"></div>
</div>

<style lang="scss">
	.currency-card {
		position: relative;
		height: 100%;

		&__inner {
			height: 100%;
			background: rgba(14, 8, 11, 0.7);
			backdrop-filter: blur(40px);
			border: 1px solid rgba(255, 255, 255, 0.08);
			border-radius: 2rem;
			overflow: hidden;
			display: flex;
			flex-direction: column;
			transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
			position: relative;
			z-index: 1;

			&:hover {
				transform: translateY(-8px);
				border-color: rgba(233, 30, 99, 0.3);
				background: rgba(14, 8, 11, 0.8);
				box-shadow: 0 30px 60px -10px rgba(0, 0, 0, 0.5);

				.currency-card__image {
					transform: scale(1.1);
				}

				.currency-card__glow {
					opacity: 0.6;
				}
			}
		}

		&__image-container {
			width: 100%;
			aspect-ratio: 1.2;
			position: relative;
			overflow: hidden;
			background: rgba(255, 255, 255, 0.02);
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 1.5rem;
		}

		&__image {
			max-width: 80%;
			max-height: 80%;
			object-fit: contain;
			transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
			filter: drop-shadow(0 0 30px rgba(233, 30, 99, 0.2));
		}

		&__image-overlay {
			position: absolute;
			inset: 0;
			background: linear-gradient(to bottom, transparent 60%, rgba(14, 8, 11, 0.8));
			opacity: 0.1;
		}

		&__icon-badge {
			position: absolute;
			top: 1.25rem;
			left: 1.25rem;
			padding: 0.5rem 0.875rem;
			background: rgba(255, 255, 255, 0.1);
			backdrop-filter: blur(10px);
			border: 1px solid rgba(255, 255, 255, 0.1);
			border-radius: 2rem;
			display: flex;
			align-items: center;
			gap: 0.5rem;
			color: #fff;
			font-size: 0.75rem;
			font-weight: 800;
			text-transform: uppercase;
			letter-spacing: 0.05em;
		}

		&__content {
			padding: 1.5rem 1.75rem 2rem;
			display: flex;
			flex-direction: column;
			gap: 1.5rem;
			flex: 1;
		}

		&__header {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			gap: 1rem;
		}

		&__name {
			font-size: 1.375rem;
			font-weight: 900;
			color: #fff;
			line-height: 1.2;
		}

		&__share {
			width: 2.25rem;
			height: 2.25rem;
			display: flex;
			align-items: center;
			justify-content: center;
			background: rgba(255, 255, 255, 0.03);
			border: 1px solid rgba(255, 255, 255, 0.08);
			border-radius: 0.75rem;
			color: rgba(255, 255, 255, 0.4);
			cursor: pointer;
			transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

			&:hover {
				background: rgba(233, 30, 99, 0.1);
				border-color: rgba(233, 30, 99, 0.3);
				color: var(--accent);
				transform: scale(1.05);
			}
		}

		&__amount-section {
			display: flex;
			flex-direction: column;
			gap: 0.75rem;
		}

		&__input-group {
			display: flex;
			align-items: center;
			background: rgba(255, 255, 255, 0.02);
			border: 1px solid rgba(255, 255, 255, 0.05);
			border-radius: 1.25rem;
			padding: 0.25rem 1rem 0.25rem 0.5rem;
			transition: all 0.3s;

			&:focus-within {
				border-color: rgba(255, 255, 255, 0.1);
				background: rgba(255, 255, 255, 0.05);
			}
		}

		&__input {
			flex: 1;
			background: transparent;
			border: none;
			outline: none;
			color: #fff;
			font-size: 1.25rem;
			font-weight: 800;
			padding: 0.75rem;
			width: 100%;
			height: 3rem;

			&::-webkit-inner-spin-button,
			&::-webkit-outer-spin-button {
				filter: invert(1);
				margin-left: 0.5rem;
			}
		}

		&__input-label {
			font-size: 0.75rem;
			font-weight: 800;
			color: rgba(255, 255, 255, 0.2);
			text-transform: uppercase;
			letter-spacing: 0.1em;
		}

		&__range-info {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			font-size: 0.75rem;
			font-weight: 700;
			color: rgba(255, 255, 255, 0.2);
			padding-left: 0.5rem;
		}

		&__footer {
			margin-top: auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 1rem;
			flex-wrap: wrap;
		}

		&__price-tag {
			display: flex;
			align-items: baseline;
			gap: 0.25rem;
			flex-shrink: 0;
		}

		&__price {
			font-size: clamp(1.5rem, 5vw, 2rem);
			font-weight: 900;
			color: #fff;
			font-family: 'Unbounded', sans-serif;
			line-height: 1;
		}

		&__currency {
			font-size: 0.875rem;
			font-weight: 700;
			color: rgba(255, 255, 255, 0.3);
		}

		&__buy-btn {
			flex: 1;
			min-width: 140px;
			height: 3.5rem;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 0.75rem;
			background: var(--gradient-primary);
			border: none;
			border-radius: 1.25rem;
			color: #fff;
			font-weight: 800;
			font-size: 1rem;
			cursor: pointer;
			transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
			position: relative;
			overflow: hidden;

			&:hover {
				transform: scale(1.02);
				box-shadow: 0 10px 30px -10px rgba(233, 30, 99, 0.5);

				.currency-card__buy-glow {
					opacity: 1;
					left: 100%;
				}
			}

			&:active {
				transform: scale(0.98);
			}
		}

		&__buy-glow {
			position: absolute;
			top: 0;
			left: -100%;
			width: 100%;
			height: 100%;
			background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
			transition: left 0.6s cubic-bezier(0.16, 1, 0.3, 1);
			opacity: 0;
		}

		&__glow {
			position: absolute;
			top: 20%;
			right: -10%;
			width: 200px;
			height: 200px;
			background: radial-gradient(circle, rgba(233, 30, 99, 0.1), transparent 70%);
			opacity: 0;
			transition: opacity 0.5s;
			pointer-events: none;
			z-index: 0;
		}
	}
</style>
