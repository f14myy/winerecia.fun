<script>
	/**
	 * Карточка отдельного преимущества.
	 * Применяется в секции "Почему мы?".
	 */
	let { icon, title, description } = $props();

	const Icon = $derived(icon);
</script>

<div class="feature-card card">
	<!-- Верхняя часть карточки: иконка и заголовок -->
	<div class="feature-card__title-content">
		<div class="feature-card__icon">
			<Icon size={28} strokeWidth={2.5} />
		</div>
		<h3 class="feature-card__title">{title}</h3>
	</div>

	<!-- Описание преимущества -->
	<p class="feature-card__description">{description}</p>

	<!-- Декоративное свечение при наведении -->
	<div class="feature-card__glow"></div>
</div>

<style lang="scss">
	.feature-card {
		padding: 2.5rem;
		background: linear-gradient(145deg, rgba(15, 10, 12, 0.9), rgba(30, 15, 20, 0.7));
		backdrop-filter: blur(12px);
		border: 1px solid rgba(233, 30, 99, 0.1);
		border-radius: 2rem;
		transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
		position: relative;
		overflow: hidden;
		height: 100%;
		display: flex;
		flex-direction: column;

		@media (max-width: 480px) {
			padding: 1.75rem;
		}

		&__title-content {
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 1.25rem;
			margin-bottom: 1.5rem;
		}

		&:hover {
			transform: translateY(-10px);
			border-color: rgba(233, 30, 99, 0.4);
			box-shadow:
				0 30px 60px -20px rgba(0, 0, 0, 0.6),
				0 0 20px rgba(233, 30, 99, 0.05);

			&::before {
				opacity: 1;
			}

			.feature-card__icon {
				transform: scale(1.1) rotate(5deg);
				box-shadow: 0 0 30px rgba(233, 30, 99, 0.4);
			}

			.feature-card__glow {
				opacity: 1;
			}

			.feature-card__title {
				color: #fff;
			}
		}

		&__icon {
			width: 3.5rem;
			height: 3.5rem;
			background: linear-gradient(135deg, #e91e63, #c2185b);
			border-radius: 1rem;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-shrink: 0;
			box-shadow: 0 8px 16px rgba(233, 30, 99, 0.2);
			transition: all 0.4s;

			:global(svg) {
				color: #fff;
			}
		}

		&__title {
			font-size: 1.5rem;
			font-weight: 800;
			color: rgba(255, 255, 255, 0.95);
			margin: 0;
			line-height: 1.2;
			font-family: var(--font-unbounded);
			letter-spacing: -0.02em;

			@media (max-width: 480px) {
				font-size: 1.25rem;
			}
		}

		&__description {
			color: var(--muted-foreground);
			line-height: 1.7;
			font-size: 1.05rem;
			flex-grow: 1;
			opacity: 0.8;
		}

		&__glow {
			position: absolute;
			top: -20%;
			right: -20%;
			width: 60%;
			height: 60%;
			background: radial-gradient(circle, rgba(233, 30, 99, 0.1), transparent 70%);
			opacity: 0;
			transition: opacity 0.5s;
			pointer-events: none;
		}
	}
</style>
