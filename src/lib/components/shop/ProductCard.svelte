<script>
	import { ShoppingCart, Share2, Crown, Zap } from 'lucide-svelte';
	import { fly, fade, scale } from 'svelte/transition';

	let { product, onBuy } = $props();
	let selectedVariant = $state(product.variants.find((v) => v.enabled) || product.variants[0]);

	function handleBuy() {
		onBuy(product, selectedVariant, selectedVariant.price);
	}

	function handleShare() {
		const url = new URL(window.location.origin + '/shop');
		url.searchParams.set('product', product.id.toString());
		if (selectedVariant && selectedVariant.duration) {
			url.searchParams.set('variant', selectedVariant.duration.toString());
		}

		navigator.clipboard
			.writeText(url.toString())
			.then(() => {})
			.catch(() => {});
	}
</script>

<div class="product-card">
	<div class="product-card__inner">
		<div class="product-card__image-container">
			<img
				src={product.image}
				alt={product.name}
				class="product-card__image"
				onerror={(e) => (e.currentTarget.src = '/shop/coin.png')}
			/>
			<div class="product-card__image-overlay"></div>
			{#if product.variants.some((v) => v.badge)}
				<div class="product-card__premium-badge">
					<Crown size={12} fill="currentColor" />
					<span>Premium</span>
				</div>
			{/if}
		</div>

		<div class="product-card__content">
			<div class="product-card__header">
				<h3 class="font-heading product-card__name">{product.name}</h3>
				<button class="product-card__share" onclick={handleShare} title="Копировать ссылку">
					<Share2 size={16} />
				</button>
			</div>

			<div class="product-card__variants">
				{#each product.variants as variant}
					<button
						class="product-card__variant"
						class:product-card__variant--active={selectedVariant.duration === variant.duration}
						class:product-card__variant--disabled={!variant.enabled}
						onclick={() => variant.enabled && (selectedVariant = variant)}
						disabled={!variant.enabled}
					>
						<span class="product-card__variant-label">{variant.label}</span>
						{#if variant.discount}
							<span class="product-card__variant-discount">{variant.discount}</span>
						{/if}
					</button>
				{/each}
			</div>

			<div class="product-card__footer">
				<div class="product-card__price-tag">
					<span class="product-card__price">{selectedVariant.price.toFixed(0)}</span>
					<span class="product-card__currency">₽</span>
				</div>

				<button class="product-card__buy-btn" onclick={handleBuy}>
					<ShoppingCart size={18} strokeWidth={2.5} />
					<span>В корзину</span>
					<div class="product-card__buy-glow"></div>
				</button>
			</div>
		</div>
	</div>
	<div class="product-card__glow"></div>
</div>

<style lang="scss">
	.product-card {
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

				.product-card__image {
					transform: scale(1.1);
				}

				.product-card__image-overlay {
					opacity: 0.2;
				}

				.product-card__glow {
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
		}

		&__image {
			width: 100%;
			height: 100%;
			object-fit: cover;
			transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
		}

		&__image-overlay {
			position: absolute;
			inset: 0;
			background: linear-gradient(to bottom, transparent 60%, rgba(14, 8, 11, 0.8));
			opacity: 0.1;
			transition: opacity 0.5s;
		}

		&__premium-badge {
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

		&__variants {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 0.5rem;
		}

		&__variant {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 0.25rem;
			padding: 0.625rem 0.5rem;
			background: rgba(255, 255, 255, 0.02);
			border: 1px solid rgba(255, 255, 255, 0.05);
			border-radius: 1rem;
			cursor: pointer;
			transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

			&:hover:not(&--disabled) {
				background: rgba(255, 255, 255, 0.05);
				border-color: rgba(255, 255, 255, 0.1);
			}

			&--active {
				background: rgba(233, 30, 99, 0.1);
				border-color: rgba(233, 30, 99, 0.4);

				.product-card__variant-label {
					color: #fff;
				}
			}

			&--disabled {
				opacity: 0.2;
				cursor: not-allowed;
			}
		}

		&__variant-label {
			font-size: 0.8125rem;
			font-weight: 700;
			color: rgba(255, 255, 255, 0.4);
			transition: color 0.3s;
		}

		&__variant-discount {
			font-size: 0.625rem;
			font-weight: 800;
			color: #4ade80;
			background: rgba(74, 222, 128, 0.1);
			padding: 0.125rem 0.375rem;
			border-radius: 0.25rem;
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

				.product-card__buy-glow {
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
