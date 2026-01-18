<!-- Главный заголовок Hero-секции -->
<div class="title-wrapper">
	<h1 class="font-heading title">WINERECIA</h1>
	<div class="line"></div>

	<div class="subtitle">
		Построй свою <span class="subtitle__accent">империю</span> в мире без границ
	</div>
</div>

<style lang="scss">
	.title-wrapper {
		margin-bottom: 2rem;
	}

	.title {
		/* Адаптивный размер шрифта: на больших экранах до 6rem, на маленьких от 2.5rem */
		font-size: clamp(2.5rem, 10vw, 6rem);
		font-weight: 900;
		background: linear-gradient(135deg, #e91e63 0%, #ff4081 50%, #f06292 100%);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		text-shadow: 0 0 80px rgba(233, 30, 99, 0.4);
		animation: title-glow 4s ease-in-out infinite;
		letter-spacing: -0.02em;
		line-height: 1;
		padding-top: 8rem; /* На десктопе отступ сверху */

		@media (max-width: 768px) {
			padding-top: 30vh; // Значительно увеличил, чтобы заголовок упал к центру экрана на мобилках
			font-size: clamp(2rem, 10vw, 4rem);
		}

		@media (max-width: 480px) {
			padding-top: 25vh;
			font-size: 2.75rem;
		}
	}

	.line {
		/* Декоративная линия под заголовком */
		height: 1px;
		width: 60%; /* Уменьшил ширину для изящности */
		max-width: 600px;
		margin: 1.5rem auto 10rem; /* Отредактировал отступы */
		background: linear-gradient(90deg, transparent, rgba(233, 30, 99, 0.5), transparent);

		@media (max-width: 768px) {
			margin-bottom: 4rem;
			width: 80%;
		}
	}

	.subtitle {
		font-size: clamp(1.1rem, 3vw, 1.5rem);
		color: var(--muted-foreground);
		font-weight: 500;
		line-height: 1.4;
		opacity: 0.9;

		&__accent {
			background: linear-gradient(to right, #fff, var(--accent));
			-webkit-background-clip: text;
			background-clip: text;
			color: transparent;
			font-weight: 700;
		}
	}

	@keyframes title-glow {
		0%,
		100% {
			text-shadow: 0 0 60px rgba(233, 30, 99, 0.2);
			transform: scale(1);
		}
		50% {
			text-shadow:
				0 0 100px rgba(233, 30, 99, 0.4),
				0 0 20px rgba(255, 64, 129, 0.2);
			transform: scale(1.01);
		}
	}
</style>
