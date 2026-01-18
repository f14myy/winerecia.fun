<script>
	import { Search } from 'lucide-svelte';
	import { fly } from 'svelte/transition';

	let { searchQuery, onSearchChange } = $props();
</script>

<div class="shop-header">
	<div class="shop-header__content">
		<div class="shop-header__info" in:fly={{ y: -20, duration: 800 }}>
			<h1 class="font-heading shop-header__title">Магазин <span>проекта</span></h1>
			<p class="shop-header__subtitle">
				Ваша поддержка помогает нам развивать мир Winerecia и создавать новый контент
			</p>
		</div>

		<div class="shop-header__search-wrapper" in:fly={{ y: 20, duration: 800, delay: 200 }}>
			<div class="shop-header__search">
				<Search size={20} strokeWidth={2.5} class="shop-header__search-icon" />
				<input
					type="text"
					placeholder="Поиск нужного товара..."
					value={searchQuery}
					oninput={(e) => onSearchChange(e.target.value)}
					class="shop-header__input"
				/>
				<div class="shop-header__search-glow"></div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.shop-header {
		margin-bottom: 4rem;
		position: relative;

		&__content {
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			gap: 3rem;

			@media (max-width: 968px) {
				flex-direction: column;
				align-items: flex-start;
				gap: 2rem;
			}
		}

		&__info {
			max-width: 600px;
		}

		&__title {
			font-size: clamp(2.5rem, 6vw, 4rem);
			font-weight: 900;
			line-height: 1.1;
			margin-bottom: 1.25rem;
			color: #fff;
			letter-spacing: -0.02em;

			span {
				background: var(--gradient-primary);
				-webkit-background-clip: text;
				background-clip: text;
				color: transparent;
			}
		}

		&__subtitle {
			font-size: 1.125rem;
			color: var(--muted-foreground);
			line-height: 1.6;
			max-width: 500px;
		}

		&__search-wrapper {
			flex: 1;
			max-width: 400px;
			width: 100%;
			position: relative;
		}

		&__search {
			position: relative;
			display: flex;
			align-items: center;
			gap: 1rem;
			padding: 0 1.5rem;
			background: rgba(255, 255, 255, 0.03);
			backdrop-filter: blur(10px);
			border: 1px solid rgba(255, 255, 255, 0.08);
			border-radius: 1.25rem;
			transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
			z-index: 1;

			&:focus-within {
				border-color: rgba(233, 30, 99, 0.5);
				background: rgba(255, 255, 255, 0.05);
				transform: translateY(-2px);
				box-shadow: 0 10px 30px -10px rgba(233, 30, 99, 0.2);

				.shop-header__search-icon {
					color: #ff4081;
				}

				.shop-header__search-glow {
					opacity: 1;
				}
			}
		}

		&__search-icon {
			color: rgba(255, 255, 255, 0.3);
			transition: color 0.3s;
		}

		&__input {
			flex: 1;
			height: 4rem;
			background: transparent;
			border: none;
			outline: none;
			color: #fff;
			font-size: 1.05rem;
			font-weight: 500;

			&::placeholder {
				color: rgba(255, 255, 255, 0.2);
			}
		}

		&__search-glow {
			position: absolute;
			inset: -1px;
			border-radius: 1.25rem;
			background: linear-gradient(135deg, rgba(233, 30, 99, 0.2), transparent);
			opacity: 0;
			transition: opacity 0.4s;
			z-index: -1;
			pointer-events: none;
		}
	}
</style>
