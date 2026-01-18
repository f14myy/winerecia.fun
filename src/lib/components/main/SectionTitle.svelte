<script>
	let { title1, title2, title3, subtitle = '' } = $props();
</script>

<div class="section-title">
	<h2 class="section-title__main">
		<span class="section-title__white">{title1}</span>
		<span class="section-title">{title2}</span>
		<span class="section-title__white">{title3}</span>
		<span class="section-title__icon">❄️</span>
	</h2>
	{#if subtitle}
		<p class="section-title__subtitle">{subtitle}</p>
	{/if}
</div>

<style lang="scss">
	.section-title {
		text-align: center;
		margin-bottom: 3rem;
		overflow-x: hidden; // Предотвращаем горизонтальный скролл от широких заголовков
		width: 100%;

		@media (max-width: 768px) {
			margin-bottom: 2rem;
		}

		&__main {
			font-size: clamp(2rem, 5vw, 3.5rem);
			font-weight: 800;
			background: var(--gradient-primary);
			-webkit-background-clip: text;
			background-clip: text;
			color: transparent;
			margin-bottom: 1rem;
			font-family: var(--font-unbounded);
			letter-spacing: -0.02em;
		}

		&__white {
			color: white;
		}

		&__icon {
			font-size: 0.8em;
			vertical-align: middle;
			margin-left: 0.5rem;
			display: inline-block;
			animation: spin-slow 10s linear infinite;
		}

		@keyframes spin-slow {
			from {
				transform: rotate(0deg);
			}
			to {
				transform: rotate(360deg);
			}
		}

		&__subtitle {
			font-size: clamp(1rem, 2vw, 1.25rem);
			color: var(--muted-foreground);
			max-width: 600px;
			margin: 0 auto;
			line-height: 1.6;
		}
	}
</style>
