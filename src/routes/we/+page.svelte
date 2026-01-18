<script>
	import TeamMember from '$lib/components/we/TeamMember.svelte';
	import { fly, fade } from 'svelte/transition';

	const team = [
		{
			avatar: '/we/kendal.png',
			name: 'Kendal',
			role: 'Основатель & Разработчик',
			description: 'Распределяет задачи.',
			socials: [
				{ url: 'https://t.me/username', icon: 'telegram', label: 'Telegram' },
				{ url: 'https://github.com/username', icon: 'github', label: 'GitHub' }
			]
		},
		{
			avatar: '/shop/pavel.png',
			name: 'f14my / павел',
			role: 'Главный разработчик',
			description:
				'Напишет все что можно написать. Любит милых мальчиков. А еще у него сочные ножки.',
			socials: [
				{ url: 'https://t.me/username2', icon: 'telegram', label: 'Telegram' },
				{ url: 'https://github.com/username', icon: 'github', label: 'GitHub' }
			]
		},
		{
			avatar: '/we/reater.png',
			name: 'Reater',
			role: 'Не умеет копировать ошибки',
			description: 'I use arch btw.',
			socials: [
				{ url: 'https://t.me/username2', icon: 'telegram', label: 'Telegram' },
				{ url: 'https://github.com/username', icon: 'github', label: 'GitHub' }
			]
		},
		{
			avatar: '/we/nyx.png',
			name: 'Нуксарик',
			role: 'разработчик',
			description: 'еще один фембой (неполноценный).',
			socials: [
				{ url: 'https://t.me/username2', icon: 'telegram', label: 'Telegram' },
				{ url: 'https://github.com/username', icon: 'github', label: 'GitHub' }
			]
		}
	];
</script>

<svelte:head>
	<title>Наша команда - Winerecia</title>
	<meta name="description" content="Познакомьтесь с командой проекта Winerecia" />
</svelte:head>

<div class="we-page">
	<div class="we-page__bg"></div>
	<div class="we-page__glow"></div>

	<div class="container relative z-10">
		<header class="we-page__header" in:fly={{ y: -20, duration: 800 }}>
			<h1 class="font-heading we-page__title">Наша команда</h1>
			<p class="we-page__subtitle">
				Личности, стоящие за развитием Winerecia. Мы создаем пространство для ваших историй.
			</p>
		</header>

		<div class="we-page__grid">
			{#each team as member, i}
				<div in:fly={{ y: 30, delay: 200 + i * 150, duration: 800 }}>
					<TeamMember {...member} />
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.we-page {
		min-height: 100vh;
		padding: 10rem 0 6rem;
		background: var(--background);
		position: relative;
		overflow: hidden;

		&__bg {
			position: absolute;
			inset: 0;
			background: linear-gradient(to bottom, transparent, rgba(233, 30, 99, 0.03), transparent);
			z-index: 1;
		}

		&__glow {
			position: absolute;
			top: 20%;
			left: 50%;
			transform: translateX(-50%);
			width: 1000px;
			height: 600px;
			background: radial-gradient(circle, rgba(233, 30, 99, 0.1), transparent 70%);
			z-index: 1;
			pointer-events: none;
		}

		&__header {
			text-align: center;
			margin-bottom: 5rem;
		}

		&__title {
			font-size: clamp(2.5rem, 8vw, 4rem);
			font-weight: 900;
			background: linear-gradient(135deg, #fff 0%, #ff4081 100%);
			-webkit-background-clip: text;
			background-clip: text;
			color: transparent;
			margin-bottom: 1.5rem;
			line-height: 1.1;
			letter-spacing: -0.02em;
		}

		&__subtitle {
			font-size: clamp(1rem, 2vw, 1.25rem);
			color: var(--muted-foreground);
			max-width: 600px;
			margin: 0 auto;
			line-height: 1.6;
			opacity: 0.8;
		}

		&__grid {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 2rem;
			max-width: 1100px;
			margin: 0 auto;

			@media (max-width: 1024px) {
				grid-template-columns: repeat(2, 1fr);
			}

			@media (max-width: 640px) {
				grid-template-columns: 1fr;
				gap: 1.5rem;
			}
		}
	}

	.relative {
		position: relative;
	}
	.z-10 {
		z-index: 10;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
	}
</style>
