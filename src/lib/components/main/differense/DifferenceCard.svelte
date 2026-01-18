<script>
	/**
	 * Карточка отличия сервера.
	 * Отображает иконку, заголовок, описание и список ключевых фишек.
	 */
	let { icon, title, description, features = [] } = $props();

	const Icon = $derived(icon);
</script>

<div class="difference-card card">
	<!-- Иконка отличия -->
	<div class="difference-card__icon">
		<Icon size={28} strokeWidth={2.5} />
	</div>

	<!-- Основной текст -->
	<h3 class="difference-card__title">{title}</h3>
	<p class="difference-card__description">{description}</p>

	<!-- Список преимуществ/фишек под карточкой -->
	{#if features.length > 0}
		<ul class="difference-card__features">
			{#each features as feature}
				<li class="difference-card__feature">
					<span class="check">✓</span>
					{feature}
				</li>
			{/each}
		</ul>
	{/if}

	<!-- Мягкое свечение при наведении -->
	<div class="difference-card__glow"></div>
</div>

<style lang="scss">
	.difference-card {
		padding: 2.5rem;
		background: linear-gradient(135deg, rgba(15, 8, 10, 0.9), rgba(35, 12, 22, 0.7));
		backdrop-filter: blur(12px);
		border: 1px solid rgba(233, 30, 99, 0.12);
		border-radius: 1.75rem;
		transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
		position: relative;
		overflow: hidden;
		height: 100%;
		display: flex;
		flex-direction: column;

		@media (max-width: 480px) {
			padding: 1.75rem;
			width: 100%; // Гарантируем полную ширину в сетке
		}

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			height: 2px;
			background: linear-gradient(to right, transparent, rgba(233, 30, 99, 0.5), transparent);
			opacity: 0;
			transition: opacity 0.4s;
		}

		&:hover {
			transform: translateY(-8px);
			border-color: rgba(233, 30, 99, 0.35);
			box-shadow: 0 25px 50px -15px rgba(0, 0, 0, 0.6);

			&::before {
				opacity: 1;
			}

			.difference-card__icon {
				transform: scale(1.1) rotate(-8deg);
				box-shadow: 0 0 25px rgba(233, 30, 99, 0.3);
			}

			.difference-card__glow {
				opacity: 1;
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
			margin-bottom: 1.75rem;
			box-shadow: 0 8px 20px rgba(233, 30, 99, 0.2);
			transition: all 0.4s;

			@media (max-width: 480px) {
				width: 3rem;
				height: 3rem;
				margin-bottom: 1.25rem;
			}

			:global(svg) {
				color: #fff;
			}
		}

		&__title {
			font-size: 1.5rem;
			font-weight: 800;
			color: #fff;
			margin-bottom: 1rem;
			line-height: 1.25;
			font-family: var(--font-unbounded);
			letter-spacing: -0.01em;

			@media (max-width: 480px) {
				font-size: 1.25rem;
			}
		}

		&__description {
			color: var(--muted-foreground);
			line-height: 1.6;
			margin-bottom: 2rem;
			opacity: 0.85;
			font-size: 0.95rem;
			word-wrap: break-word; // Предотвращаем выезд текста за границы
			overflow-wrap: break-word;
		}

		&__features {
			list-style: none;
			padding: 0;
			margin: 0;
			display: flex;
			flex-direction: column;
			gap: 0.75rem;
			margin-top: auto;
		}

		&__feature {
			display: flex;
			align-items: center;
			gap: 0.75rem;
			color: var(--muted-foreground);
			font-size: 0.875rem;
			font-weight: 500;

			.check {
				color: #e91e63;
				font-weight: 900;
				font-size: 1.1rem;
			}
		}

		&__glow {
			position: absolute;
			bottom: -30%;
			right: -30%;
			width: 80%;
			height: 80%;
			background: radial-gradient(circle, rgba(233, 30, 99, 0.1), transparent 70%);
			opacity: 0;
			transition: opacity 0.5s;
			pointer-events: none;
		}
	}
</style>
