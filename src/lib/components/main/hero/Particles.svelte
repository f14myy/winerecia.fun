<script>
	let { count = 50 } = $props();

	const particles = Array.from({ length: count }, (_, i) => ({
		id: i,
		left: Math.random() * 100,
		top: Math.random() * 100,
		duration: 3 + Math.random() * 2
	}));
</script>

<div class="particles">
	{#each particles as particle}
		<div
			class="particle"
			style="left: {particle.left}%; top: {particle.top}%; animation-duration: {particle.duration}s;"
		></div>
	{/each}
</div>

<style lang="scss">
	.particles {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
	}

	.particle {
		position: absolute;
		width: 3px;
		height: 3px;
		background: radial-gradient(circle, rgba(233, 30, 99, 0.8), rgba(255, 64, 129, 0.4));
		border-radius: 50%;
		animation: particle-float linear infinite;
		box-shadow:
			0 0 6px rgba(233, 30, 99, 0.9),
			0 0 12px rgba(233, 30, 99, 0.5);
	}

	@keyframes particle-float {
		0% {
			transform: translateY(0) translateX(0);
			opacity: 0;
		}
		10% {
			opacity: 1;
		}
		90% {
			opacity: 1;
		}
		100% {
			transform: translateY(-100vh) translateX(20px);
			opacity: 0;
		}
	}
</style>
