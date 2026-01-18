<script>
	/**
	 * Главная секция (Hero) главной страницы.
	 * Отвечает за первое впечатление, содержит призыв к действию и основную информацию.
	 */
	import Particles from './hero/Particles.svelte';
	import Title from './hero/Title.svelte';
	import Features from './hero/Features.svelte';
	import ServerIP from './hero/SerserIP.svelte';
	import Stats from './hero/Stats.svelte';
	import HowToPlayModal from './HowToPlayModal.svelte';

	let { players = 0, maxplayers = 0 } = $props();

	const serverIP = 'mc.winerecia.fun';
	let showModal = $state(false);

	// Управление модальным окном "Как начать играть"
	function openModal() {
		showModal = true;
	}

	function closeModal() {
		showModal = false;
	}
</script>

<section class="hero">
	<!-- Фоновые эффекты: частицы и мягкое свечение -->
	<div class="hero__bg"></div>
	<div class="hero__glow"></div>

	<Particles count={40} />

	<div class="container hero__container">
		<div class="hero__content">
			<!-- Анимированный заголовок -->
			<Title />

			<p class="hero__description">
				<strong>Добро пожаловать на Winerecia!</strong> Уникальный политический сервер, где ты создаёшь
				историю. Строй города, веди дипломатию и развивай свою нацию — здесь возможно всё!
			</p>

			<!-- Короткие фичи сервера -->
			<Features />

			<div class="hero__actions">
				<!-- Основная кнопка с пульсирующим эффектом -->
				<button class="btn btn-primary btn-lg animate-pulse-wine hero__cta" onclick={openModal}
					>Начать игру</button
				>
				<!-- Виджет копирования IP -->
				<ServerIP {serverIP} />
			</div>

			<!-- Карточки статистики (Вайп, Онлайн, Версия) -->
			<Stats {players} {maxplayers} />
		</div>
	</div>
</section>

{#if showModal}
	<div
		class="modal-overlay"
		role="dialog"
		aria-modal="true"
		tabindex="0"
		onclick={closeModal}
		onkeydown={(e) => e.key === 'Escape' && closeModal()}
	>
		<!-- Останавливаем всплытие клика, чтобы окно не закрывалось при клике на контент -->
		<div onclick={(e) => e.stopPropagation()} role="presentation">
			<HowToPlayModal on:close={closeModal} />
		</div>
	</div>
{/if}

<style lang="scss">
	.hero {
		padding: 8rem 1rem 5rem;
		position: relative;
		overflow: hidden;
		min-height: 100vh;
		display: flex;
		align-items: center;
		background: radial-gradient(circle at 50% -20%, rgba(233, 30, 99, 0.15), transparent 70%);

		@media (max-width: 768px) {
			padding: 6rem 1.5rem 4rem;
			min-height: auto;
		}

		&__container {
			position: relative;
			z-index: 10;
		}

		&__content {
			max-width: 1000px;
			margin: 0 auto;
			text-align: center;
			/* Плавное появление всего контента */
			animation: content-fade-in 1.2s cubic-bezier(0.16, 1, 0.3, 1);
		}

		@keyframes content-fade-in {
			from {
				opacity: 0;
				transform: translateY(20px);
			}
			to {
				opacity: 1;
				transform: translateY(0);
			}
		}

		&__description {
			font-size: clamp(1rem, 2vw, 1.125rem);
			color: var(--muted-foreground);
			max-width: 800px;
			margin: 0 auto 3.5rem;
			line-height: 1.8;
			font-weight: 400;
			opacity: 0.9;
		}

		&__actions {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			gap: 2rem;
			margin-bottom: 4rem;
			flex-wrap: wrap;

			@media (max-width: 768px) {
				flex-direction: column;
				gap: 1.25rem;
			}
		}

		&__cta {
			min-width: 240px;
			height: 60px;
			font-weight: 700;
			font-size: 1.1rem;
			letter-spacing: 0.02em;
			border-radius: 1rem;
			box-shadow: 0 10px 30px -10px rgba(233, 30, 99, 0.5);
			transition:
				transform 0.3s ease,
				box-shadow 0.3s ease;

			&:hover {
				transform: translateY(-2px);
				box-shadow: 0 15px 40px -10px rgba(233, 30, 99, 0.6);
			}

			@media (max-width: 480px) {
				width: 100%;
				min-width: unset;
			}
		}
	}

	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.85);
		backdrop-filter: blur(10px);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
		padding: 1.5rem;
		animation: modal-fade 0.3s ease;
	}

	@keyframes modal-fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
