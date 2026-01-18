<script>
	import ForgotPasswordForm from '$lib/components/auth/ForgotPasswordForm.svelte';
</script>

<svelte:head>
	<title>Сброс пароля - Winerecia</title>
</svelte:head>

<section class="auth-page">
	<div class="auth-page__bg"></div>
	<div class="auth-page__glow"></div>

	<div class="container auth-page__container">
		<ForgotPasswordForm />
	</div>
</section>

<style lang="scss">
	.auth-page {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 8rem 1rem 4rem;
		position: relative;
		overflow: hidden;

		&__bg {
			position: absolute;
			inset: 0;
			background: linear-gradient(
				to bottom,
				var(--background),
				rgba(233, 30, 99, 0.05),
				var(--background)
			);
			z-index: 0;
		}

		&__glow {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 800px;
			height: 800px;
			background: radial-gradient(
				circle,
				rgba(233, 30, 99, 0.15),
				rgba(255, 64, 129, 0.08),
				transparent
			);
			border-radius: 50%;
			filter: blur(100px);
			animation: glow-pulse 10s ease-in-out infinite;
			z-index: 0;
		}

		&__container {
			position: relative;
			z-index: 10;
			width: 100%;
		}
	}

	@keyframes glow-pulse {
		0%,
		100% {
			opacity: 0.6;
			transform: translate(-50%, -50%) scale(1);
		}
		50% {
			opacity: 0.8;
			transform: translate(-50%, -50%) scale(1.1);
		}
	}
</style>
