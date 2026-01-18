<script>
	/**
	 * Компонент "Сделано кем" в футере.
	 * Отображает логотип f14my и информацию о разработчике.
	 */
</script>

<a href="https://f14my.ru" class="made-by" target="_blank" rel="noopener noreferrer">
	<!-- Логотип из папки static -->
	<img src="/f14my.png" alt="f14my logo" class="made-by__img" />
	<span class="made-by__text">Создано Павлом ( Femboy Squad )</span>
</a>

<style lang="scss">
	.made-by {
		margin-top: 1.5rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1rem;
		color: white;
		text-decoration: none;
		opacity: 0.8;
		transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
		padding: 0.5rem 1rem;
		background: rgba(255, 255, 255, 0.03);
		border-radius: 1rem;
		border: 1px solid rgba(255, 255, 255, 0.05);

		&:hover {
			opacity: 1;
			transform: translateY(-2px);
			background: rgba(255, 255, 255, 0.06);
			border-color: rgba(233, 30, 99, 0.3);
			box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.3);
		}

		&__img {
			height: 32px; // Оптимальная высота для логотипа в футере
			width: auto;
			object-fit: contain;
			filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.2));
		}

		&__text {
			font-size: 0.875rem;
			font-weight: 500;
			color: var(--muted-foreground);
			white-space: nowrap; // Чтобы текст не перепрыгивал на новую строку

			@media (max-width: 480px) {
				font-size: 0.75rem;
			}
		}
	}
</style>
