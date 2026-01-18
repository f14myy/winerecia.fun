<script>
	/**
	 * MobileMenu - мобильное меню
	 */
	import { Map, DollarSign, HelpCircle, User } from 'lucide-svelte';
	import OnlineCounter from './OnlineCounter.svelte';

	let { players = 0 } = $props();

	const links = [
		{ href: '/cabinet', label: 'Кабинет', icon: User },
		{ href: 'https://map.winerecia.fun', label: 'Карта', icon: Map },
		{ href: '/shop', label: 'Магазин', icon: DollarSign },
		{ href: '/faq', label: 'FAQ', icon: HelpCircle }
	];
</script>

<div class="mobile-menu">
	<div class="mobile-menu__overlay"></div>
	<div class="mobile-menu__content">
		<nav class="mobile-menu__nav">
			{#each links as link}
				{@const Icon = link.icon}
				<a
					href={link.href}
					class="mobile-menu__link"
					target={link.href.startsWith('http') ? '_blank' : undefined}
					rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
				>
					<div class="mobile-menu__link-icon">
						<Icon size={20} strokeWidth={2.5} />
					</div>
					<span class="mobile-menu__link-text">{link.label}</span>
				</a>
			{/each}
		</nav>

		<div class="mobile-menu__footer">
			<OnlineCounter count={players} />
			<button class="btn btn-primary btn-md mobile-menu__cta">Начать играть</button>
		</div>
	</div>
</div>

<style lang="scss">
	.mobile-menu {
		position: relative;
		padding: 1.5rem;
		overflow: hidden;

		&__overlay {
			position: absolute;
			inset: 0;
			background: radial-gradient(circle at top right, rgba(233, 30, 99, 0.1), transparent 70%);
			pointer-events: none;
		}

		&__content {
			position: relative;
			z-index: 1;
		}

		&__nav {
			display: flex;
			flex-direction: column;
			gap: 0.75rem;
		}

		&__link {
			display: flex;
			align-items: center;
			gap: 1rem;
			padding: 1rem;
			color: #fff;
			text-decoration: none;
			background: rgba(255, 255, 255, 0.03);
			border: 1px solid rgba(255, 255, 255, 0.05);
			border-radius: 1.25rem;
			transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);

			&:active {
				background: rgba(233, 30, 99, 0.1);
				border-color: rgba(233, 30, 99, 0.3);
				transform: scale(0.98);
			}

			&-icon {
				width: 2.5rem;
				height: 2.5rem;
				display: flex;
				align-items: center;
				justify-content: center;
				background: rgba(233, 30, 99, 0.1);
				border-radius: 0.75rem;
				color: #ff4081;
			}

			&-text {
				font-weight: 700;
				font-size: 1.1rem;
				letter-spacing: -0.01em;
			}
		}

		&__footer {
			display: flex;
			flex-direction: column;
			gap: 1.5rem;
			padding-top: 2rem;
			margin-top: 1.5rem;
			border-top: 1px solid rgba(255, 255, 255, 0.06);
		}

		&__cta {
			width: 100%;
			height: 3.5rem;
			font-size: 1.1rem;
			font-weight: 800;
			border-radius: 1.25rem;
			box-shadow: 0 10px 25px -5px rgba(233, 30, 99, 0.4);
		}
	}
</style>
