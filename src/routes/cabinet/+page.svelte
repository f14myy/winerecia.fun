<script>
	import DashboardSidebar from '$lib/components/cabinet/DashboardSidebar.svelte';
	import UserStats from '$lib/components/cabinet/UserStats.svelte';
	import TownySection from '$lib/components/cabinet/TownySection.svelte';
	import NationSection from '$lib/components/cabinet/NationSection.svelte';
	import RecentPurchases from '$lib/components/cabinet/RecentPurchases.svelte';
	import SettingsSection from '$lib/components/cabinet/SettingsSection.svelte';
	import { fly, fade } from 'svelte/transition';

	let { data } = $props();
	// Using a fallback object if data fetch fails, but preferably we handle nulls in components
	let userData = $derived(data?.userData || {});

	let activeSection = $state('overview');
</script>

<svelte:head>
	<title>Личный кабинет - Winerecia</title>
</svelte:head>

<section class="cabinet">
	<div class="cabinet__bg"></div>

	<div class="cabinet__layout">
		<DashboardSidebar bind:activeSection user={userData} />

		<main class="cabinet__content">
			<div class="cabinet__container">
				{#if activeSection === 'overview'}
					<div in:fly={{ y: 20, duration: 600 }}>
						<div class="cabinet__header">
							<h1 class="font-heading cabinet__title">Личный кабинет</h1>
							<p class="cabinet__subtitle">Управление вашим игровым профилем и активами</p>
						</div>

						<UserStats user={userData} />
					</div>
				{:else if activeSection === 'town'}
					<div in:fly={{ y: 20, duration: 600 }}>
						<TownySection town={userData?.town} />
					</div>
				{:else if activeSection === 'nation'}
					<div in:fly={{ y: 20, duration: 600 }}>
						<NationSection nation={userData?.nation} />
					</div>
				{:else if activeSection === 'purchases'}
					<div in:fly={{ y: 20, duration: 600 }}>
						<RecentPurchases />
					</div>
				{:else if activeSection === 'settings'}
					<div in:fly={{ y: 20, duration: 600 }}>
						<SettingsSection />
					</div>
				{:else}
					<div in:fade={{ duration: 400 }}>
						<div class="cabinet__header">
							<h1 class="font-heading cabinet__title">Раздел в разработке</h1>
						</div>
						<div class="cabinet__card cabinet__card--empty">
							<div class="cabinet__empty-icon">
								<div class="cabinet__empty-glow"></div>
							</div>
							<p>Этот раздел скоро появится!</p>
							<button class="btn btn-ghost btn-sm" onclick={() => (activeSection = 'overview')}
								>Вернуться назад</button
							>
						</div>
					</div>
				{/if}
			</div>
		</main>
	</div>
</section>

<style lang="scss">
	.cabinet {
		min-height: 100vh;
		background: #0b0407;
		position: relative;
		overflow: hidden;
		padding-top: 0; // Removing top padding as sidebar is full height

		&__bg {
			position: absolute;
			inset: 0;
			background: radial-gradient(circle at top right, rgba(233, 30, 99, 0.05), transparent 60%);
			pointer-events: none;
		}

		&__layout {
			display: flex;
			min-height: 100vh;
			position: relative;
			z-index: 10;

			@media (max-width: 1024px) {
				flex-direction: column;
			}
		}

		&__content {
			flex: 1;
			padding: 3rem;
			height: 100vh;
			overflow-y: auto;
			scrollbar-width: thin;
			scrollbar-color: rgba(233, 30, 99, 0.2) transparent;

			@media (max-width: 1024px) {
				height: auto;
				padding: 2rem 1.5rem 6rem; // Add bottom padding for mobile menu
			}
		}

		&__title {
			font-size: 2.5rem;
			font-weight: 900;
			color: #fff;
			margin-bottom: 0.5rem;
			letter-spacing: -0.02em;
		}

		&__subtitle {
			font-size: 1.125rem;
			color: var(--muted-foreground);
			margin-bottom: 3rem;
		}

		&__container {
			max-width: 1200px;
			margin: 0;
		}

		&__empty-icon {
			width: 60px;
			height: 60px;
			background: rgba(233, 30, 99, 0.1);
			border-radius: 1.5rem;
			margin-bottom: 2rem;
			position: relative;

			&::after {
				content: '⚙️';
				position: absolute;
				inset: 0;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 1.5rem;
			}
		}

		&__empty-glow {
			position: absolute;
			inset: -20px;
			background: radial-gradient(circle, rgba(233, 30, 99, 0.2), transparent 70%);
			pointer-events: none;
		}

		&__card {
			background: rgba(255, 255, 255, 0.03);
			backdrop-filter: blur(40px);
			border: 1px solid rgba(255, 255, 255, 0.08);
			border-radius: 2.5rem;
			padding: 3rem;

			&--empty {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				min-height: 400px;
				color: var(--muted-foreground);
				text-align: center;
				gap: 1rem;

				p {
					font-size: 1.1rem;
					margin-bottom: 1rem;
				}
			}
		}
	}
</style>
