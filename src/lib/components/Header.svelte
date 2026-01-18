<script>
	/**
	 * Главный компонент шапки сайта.
	 * Управляет навигацией, логикой скролла и мобильным меню.
	 */
	import { Menu, X } from 'lucide-svelte';
	import { onMount } from 'svelte';

	import Logo from './header/Logo.svelte';
	import Navigation from './header/Navigation.svelte';
	import OnlineCounter from './header/OnlineCounter.svelte';
	import MobileMenu from './header/MobileMenu.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let { players = 0 } = $props();

	const isCabinetPage = $derived($page.url.pathname === '/cabinet');

	// Состояния для управления UI
	let isMenuOpen = $state(false); // Открыто ли мобильное меню
	let scrolled = $state(false); // Прокручена ли страница вниз

	// Обработка прокрутки для изменения стиля шапки
	onMount(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 40;
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	const toggleMenu = () => (isMenuOpen = !isMenuOpen);
</script>

{#if !isCabinetPage}
	<header class="header" class:header--scrolled={scrolled}>
		<div class="container header__container">
			<div class="header__content">
				<!-- Логотип сервера -->
				<Logo />

				<!-- Десктопная навигация -->
				<nav class="desktop-nav">
					<Navigation />
				</nav>

				<!-- Правая часть: онлайн и кнопки -->
				<div class="header__actions desktop-nav">
					<OnlineCounter count={players} />
					<div class="header__auth-group">
						{#if players > 0 && false}
							<!-- Placeholder for auth state -->
							<button
								class="btn btn-ghost btn-sm header__cabinet-btn"
								onclick={() => goto('/cabinet')}>Кабинет</button
							>
						{:else}
							<button
								class="btn btn-primary btn-sm header__login-btn"
								onclick={() => goto('/login')}>Войти</button
							>
						{/if}
					</div>
				</div>

				<!-- Кнопка мобильного меню (гамбургер) -->
				<button
					class="btn btn-ghost btn-sm mobile-menu-btn"
					onclick={toggleMenu}
					aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
				>
					{#if isMenuOpen}
						<X size={24} />
					{:else}
						<Menu size={24} />
					{/if}
				</button>
			</div>

			<!-- Выпадающее мобильное меню -->
			{#if isMenuOpen}
				<div class="mobile-menu-wrapper">
					<MobileMenu {players} />
				</div>
			{/if}
		</div>
	</header>
{/if}

<style lang="scss">
	.header {
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 100;
		background: transparent;
		transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
		border-bottom: 1px solid transparent;

		&--scrolled {
			background: rgba(10, 5, 8, 0.85);
			backdrop-filter: blur(20px);
			border-bottom-color: rgba(233, 30, 99, 0.15);
			box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

			.header__container {
				padding-top: 0.75rem;
				padding-bottom: 0.75rem;
			}
		}

		&__container {
			padding-top: 1rem; // Уменьшил стандартный отступ
			padding-bottom: 1rem;
			transition: padding 0.4s ease;

			@media (max-width: 768px) {
				padding-top: 0.75rem;
				padding-bottom: 0.75rem;
			}
		}

		&__content {
			display: flex;
			align-items: center; // Центрируем все элементы по вертикали
			justify-content: space-between;
			gap: 1rem;
		}

		&__actions {
			display: none;
			align-items: center;
			gap: 2rem;
		}

		&__auth-group {
			display: flex;
			align-items: center;
			gap: 1rem;
		}

		&__cabinet-btn {
			color: rgba(255, 255, 255, 0.7);
			font-weight: 700;

			&:hover {
				color: #ff4081;
				background: rgba(233, 30, 99, 0.1);
			}
		}

		&__login-btn {
			padding-left: 1.5rem;
			padding-right: 1.5rem;
			font-weight: 700;
			border-radius: 0.75rem;
		}
	}

	.desktop-nav {
		display: none;

		@media (min-width: 1024px) {
			display: flex;
		}
	}

	.mobile-menu-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		padding: 0.5rem;
		width: 44px; // Фиксированный размер для стабильности
		height: 44px;
		border-radius: 0.75rem;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);

		@media (min-width: 1024px) {
			display: none;
		}

		&:active {
			transform: scale(0.95);
			background: rgba(233, 30, 99, 0.1);
		}
	}

	.mobile-menu-wrapper {
		position: absolute;
		top: 100%;
		left: 0;
		width: 100%;
		background: rgba(15, 8, 11, 0.98);
		backdrop-filter: blur(20px);
		border-bottom: 1px solid rgba(233, 30, 99, 0.2);
		animation: slide-down 0.3s ease;
	}

	@keyframes slide-down {
		from {
			transform: translateY(-10px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}
</style>
