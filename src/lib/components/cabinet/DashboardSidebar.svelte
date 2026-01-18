<script>
	import {
		User,
		LayoutDashboard,
		Building2,
		Landmark,
		History,
		Settings,
		ExternalLink
	} from 'lucide-svelte';

	let { activeSection = $bindable('overview'), user = {} } = $props();

	const avatarSrc = $derived(
		user.name ? `https://minotar.net/helm/${user.name}/100.png` : '/shop/pavel.png'
	);
	const username = $derived(user.name || 'Гость');
	const isOnline = $derived(user.isOnline);

	const menuItems = [
		{ id: 'overview', label: 'Обзор', icon: LayoutDashboard },
		{ id: 'town', label: 'Город (Towny)', icon: Building2 },
		{ id: 'nation', label: 'Нация', icon: Landmark },
		{ id: 'purchases', label: 'Покупки', icon: History },
		{ id: 'settings', label: 'Настройки', icon: Settings }
	];
</script>

<aside class="dashboard-sidebar">
	<div class="dashboard-sidebar__header">
		<div class="dashboard-sidebar__user">
			<div class="dashboard-sidebar__avatar">
				<img src={avatarSrc} alt="User Avatar" />
			</div>
			<div class="dashboard-sidebar__user-info">
				<span class="dashboard-sidebar__username">{username}</span>
				<span
					class="dashboard-sidebar__status"
					class:dashboard-sidebar__status--offline={!isOnline}
				>
					{isOnline ? 'Онлайн' : 'Офлайн'}
				</span>
			</div>
		</div>
	</div>

	<nav class="dashboard-sidebar__nav">
		{#each menuItems as item}
			{@const Icon = item.icon}
			<button
				class="dashboard-sidebar__item"
				class:dashboard-sidebar__item--active={activeSection === item.id}
				onclick={() => (activeSection = item.id)}
			>
				<Icon size={20} />
				<span>{item.label}</span>
			</button>
		{/each}
	</nav>

	<div class="dashboard-sidebar__footer">
		<a href="/shop" class="dashboard-sidebar__promo">
			<div class="dashboard-sidebar__promo-content">
				<span class="dashboard-sidebar__promo-title">Поддержать проект</span>
				<span class="dashboard-sidebar__promo-text">Получите уникальные бонусы</span>
			</div>
			<ExternalLink size={16} />
		</a>
	</div>
</aside>

<style lang="scss">
	.dashboard-sidebar {
		width: 280px;
		background: rgba(14, 8, 11, 0.4);
		backdrop-filter: blur(20px);
		border-right: 1px solid rgba(255, 255, 255, 0.05);
		display: flex;
		flex-direction: column;
		height: 100vh;
		position: sticky;
		top: 0;
		z-index: 100;
		transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

		@media (max-width: 1024px) {
			width: 100%;
			height: 70px;
			position: fixed;
			top: auto;
			bottom: 0;
			flex-direction: row;
			border-right: none;
			border-top: 1px solid rgba(255, 255, 255, 0.1);
			background: rgba(15, 8, 11, 0.95);
			backdrop-filter: blur(30px);
			padding: 0;
		}

		&__header {
			padding: 2.5rem 1.5rem;
			border-bottom: 1px solid rgba(255, 255, 255, 0.05);

			@media (max-width: 1024px) {
				display: none;
			}
		}

		&__user {
			display: flex;
			align-items: center;
			gap: 1rem;
		}

		&__avatar {
			width: 44px;
			height: 44px;
			border-radius: 12px;
			overflow: hidden;
			border: 2px solid rgba(233, 30, 99, 0.3);
			background: rgba(255, 255, 255, 0.05);

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		&__user-info {
			display: flex;
			flex-direction: column;
		}

		&__username {
			font-size: 1rem;
			font-weight: 800;
			color: #fff;
		}

		&__status {
			font-size: 0.75rem;
			font-weight: 700;
			color: #4ade80;
			display: flex;
			align-items: center;
			gap: 0.25rem;

			&::before {
				content: '';
				width: 6px;
				height: 6px;
				background: #4ade80;
				border-radius: 50%;
				box-shadow: 0 0 10px #4ade80;
			}

			&--offline {
				color: #94a3b8;
				&::before {
					background: #94a3b8;
					box-shadow: none;
				}
			}
		}

		&__nav {
			flex: 1;
			padding: 1.5rem 1rem;
			display: flex;
			flex-direction: column;
			gap: 0.5rem;

			@media (max-width: 1024px) {
				flex-direction: row;
				padding: 0 1rem;
				gap: 0.25rem;
				justify-content: space-around;
				align-items: center;
				width: 100%;
			}
		}

		&__item {
			display: flex;
			align-items: center;
			gap: 1rem;
			padding: 0.875rem 1rem;
			background: transparent;
			border: none;
			border-radius: 1rem;
			color: rgba(255, 255, 255, 0.5);
			font-size: 0.95rem;
			font-weight: 600;
			cursor: pointer;
			transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

			@media (max-width: 1024px) {
				flex-direction: column;
				gap: 0.25rem;
				padding: 0.5rem;
				flex: 1;
				font-size: 0.7rem;
				border-radius: 0.75rem;

				span {
					display: block;
				}
			}

			&:hover {
				background: rgba(255, 255, 255, 0.03);
				color: #fff;
			}

			&--active {
				background: rgba(233, 30, 99, 0.1);
				border: 1px solid rgba(233, 30, 99, 0.2);
				color: #ff4081;

				@media (max-width: 1024px) {
					background: transparent;
					border-color: transparent;
					color: #ff4081;
				}

				:global(svg) {
					color: #ff4081;
				}
			}

			:global(svg) {
				transition: color 0.3s;
				@media (max-width: 1024px) {
					width: 20px;
					height: 20px;
				}
			}
		}

		&__footer {
			padding: 1.5rem 1rem;
			border-top: 1px solid rgba(255, 255, 255, 0.05);

			@media (max-width: 1024px) {
				display: none;
			}
		}

		&__promo {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 1rem;
			padding: 1.25rem;
			background: linear-gradient(135deg, rgba(233, 30, 99, 0.1), rgba(233, 30, 99, 0.05));
			border: 1px solid rgba(233, 30, 99, 0.2);
			border-radius: 1.25rem;
			text-decoration: none;
			transition: all 0.3s;

			&:hover {
				transform: translateY(-2px);
				background: rgba(233, 30, 99, 0.15);
				border-color: rgba(233, 30, 99, 0.4);
			}

			&-content {
				display: flex;
				flex-direction: column;
				gap: 0.25rem;
			}

			&-title {
				font-size: 0.85rem;
				font-weight: 800;
				color: #fff;
			}

			&-text {
				font-size: 0.75rem;
				color: rgba(255, 255, 255, 0.5);
				font-weight: 500;
			}

			:global(svg) {
				color: #ff4081;
			}
		}
	}
</style>
