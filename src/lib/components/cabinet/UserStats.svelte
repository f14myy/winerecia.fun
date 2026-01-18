<script>
	import {
		Wallet,
		Trophy,
		Clock,
		Shield,
		Map as MapIcon,
		Users,
		Zap,
		TrendingUp,
		History,
		Star
	} from 'lucide-svelte';
	import { fly } from 'svelte/transition';

	let { user = {} } = $props();

	// Helper to format playtime from hours/milliseconds if needed.
	// Assuming API returns hours for now based on JSON structure `playTimeHours`.
	const playTime = $derived(user.playTimeHours ? `${user.playTimeHours}ч` : '0ч');

	const townName = $derived(user.town?.name || 'Нет города');
	const nationName = $derived(user.nation?.name || 'Нет нации');

	// Default mocks for fields missing in simple API response
	const level = $derived(user.level || 1);
	const xp = $derived(user.exp || 0);
	const boosters = $derived(user.boosters || []);
	const recentActivity = $derived(user.recentActivity || []);

	const skinSrc = $derived(
		user.name ? `https://minotar.net/armor/body/${user.name}/100.png` : '/shop/pavel.png'
	);
</script>

<div class="user-stats">
	<!-- Skin & Rank (Compact) -->
	<div class="user-stats__card skin-card" in:fly={{ x: -20, duration: 800 }}>
		<div class="skin-card__viewer">
			<img src={skinSrc} alt="User Skin" class="skin-card__image" />
		</div>
		<div class="skin-card__info">
			<div class="skin-card__header">
				<h3 class="skin-card__title">{user.name || 'Игрок'}</h3>
				<span class="badge badge--online" class:badge--offline={!user.isOnline}>
					{user.isOnline ? 'В сети' : 'Офлайн'}
				</span>
			</div>
			<div class="skin-card__progress">
				<div class="progress-info">
					<span>Уровень {level}</span>
					<span>{xp}%</span>
				</div>
				<div class="progress-bar">
					<div class="progress-bar__fill" style="width: {xp}%"></div>
				</div>
			</div>
			<div class="skin-card__actions">
				<button class="btn btn-primary btn-sm">Скин</button>
				<button class="btn btn-ghost btn-sm">Детали</button>
			</div>
		</div>
	</div>

	<div class="user-stats__main">
		<!-- Compact Stats Grid -->
		<div class="stats-grid">
			<div class="mini-card" in:fly={{ y: 20, delay: 100, duration: 600 }}>
				<div class="mini-card__icon"><Wallet size={18} /></div>
				<div class="mini-card__data">
					<span class="mini-card__label">Баланс</span>
					<span class="mini-card__value">{(user.balance || 0).toLocaleString()} ₽</span>
				</div>
			</div>
			<div class="mini-card" in:fly={{ y: 20, delay: 150, duration: 600 }}>
				<div class="mini-card__icon"><Clock size={18} /></div>
				<div class="mini-card__data">
					<span class="mini-card__label">В игре</span>
					<span class="mini-card__value">{playTime}</span>
				</div>
			</div>
			<div class="mini-card" in:fly={{ y: 20, delay: 200, duration: 600 }}>
				<div class="mini-card__icon"><MapIcon size={18} /></div>
				<div class="mini-card__data">
					<span class="mini-card__label">Город</span>
					<span class="mini-card__value">{townName}</span>
				</div>
			</div>
			<div class="mini-card" in:fly={{ y: 20, delay: 250, duration: 600 }}>
				<div class="mini-card__icon"><Shield size={18} /></div>
				<div class="mini-card__data">
					<span class="mini-card__label">Нация</span>
					<span class="mini-card__value">{nationName}</span>
				</div>
			</div>
		</div>

		<!-- Secondary Info Blocks -->
		<div class="info-blocks">
			<!-- Boosters -->
			<div class="info-card" in:fly={{ y: 20, delay: 300, duration: 600 }}>
				<div class="info-card__header">
					<Zap size={16} />
					<h4>Активные бустеры</h4>
				</div>
				<div class="info-card__list">
					{#if boosters.length > 0}
						{#each boosters as booster}
							{@const Icon = booster.icon}
							<div class="booster-item">
								<Icon size={14} />
								<span class="booster-item__name">{booster.name}</span>
								<span class="booster-item__time">{booster.time}</span>
							</div>
						{/each}
					{:else}
						<div class="empty-state">Нет активных бустеров</div>
					{/if}
				</div>
			</div>

			<!-- Recent Activity -->
			<div class="info-card" in:fly={{ y: 20, delay: 350, duration: 600 }}>
				<div class="info-card__header">
					<History size={16} />
					<h4>События</h4>
				</div>
				<div class="info-card__list">
					{#if recentActivity.length > 0}
						{#each recentActivity as activity}
							<div class="activity-item">
								<span class="activity-item__text">{activity.text}</span>
								<span class="activity-item__time">{activity.time}</span>
							</div>
						{/each}
					{:else}
						<div class="empty-state">Нет недавней активности</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.user-stats {
		display: flex;
		gap: 1.5rem;
		margin-bottom: 2rem;

		@media (max-width: 1200px) {
			flex-direction: column;
		}
	}

	.skin-card {
		width: 240px;
		flex-shrink: 0;
		background: rgba(255, 255, 255, 0.03);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 1.5rem;
		overflow: hidden;
		display: flex;
		flex-direction: column;

		@media (max-width: 1200px) {
			width: 100%;
			flex-direction: row;
			align-items: center;
			padding: 1rem;
		}

		@media (max-width: 640px) {
			flex-direction: column;
		}

		&__viewer {
			aspect-ratio: 0.9;
			background: radial-gradient(circle at center, rgba(233, 30, 99, 0.1), transparent 70%);
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 1rem;

			@media (max-width: 1200px) {
				width: 90px;
				aspect-ratio: 1;
				padding: 0;
			}
		}

		&__image {
			width: 100%;
			height: 100%;
			object-fit: contain;
			filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.5));
		}

		&__info {
			padding: 1.5rem;
			display: flex;
			flex-direction: column;
			gap: 1.25rem;
			flex: 1;

			@media (max-width: 1200px) {
				padding: 0 1.5rem;
			}
		}

		&__header {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		&__title {
			font-size: 1.25rem;
			font-weight: 900;
			color: #fff;
		}

		&__progress {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;

			.progress-info {
				display: flex;
				justify-content: space-between;
				font-size: 0.75rem;
				font-weight: 700;
				color: rgba(255, 255, 255, 0.5);
				text-transform: uppercase;
			}

			.progress-bar {
				height: 6px;
				background: rgba(255, 255, 255, 0.05);
				border-radius: 3px;
				overflow: hidden;

				&__fill {
					height: 100%;
					background: linear-gradient(90deg, #ff4081, #e91e63);
					box-shadow: 0 0 10px #ff4081;
				}
			}
		}

		&__actions {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 0.75rem;
		}
	}

	.user-stats__main {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
	}

	.mini-card {
		background: rgba(255, 255, 255, 0.03);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 1.25rem;
		padding: 1.25rem;
		display: flex;
		align-items: center;
		gap: 1rem;
		transition: all 0.3s;

		&:hover {
			background: rgba(255, 255, 255, 0.05);
			border-color: rgba(255, 255, 255, 0.15);
			transform: translateY(-2px);
		}

		&__icon {
			width: 2.75rem;
			height: 2.75rem;
			background: rgba(255, 255, 255, 0.05);
			border-radius: 0.75rem;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #ff4081;
		}

		&__data {
			display: flex;
			flex-direction: column;
			gap: 0.15rem;
		}

		&__label {
			font-size: 0.7rem;
			font-weight: 700;
			color: rgba(255, 255, 255, 0.4);
			text-transform: uppercase;
			letter-spacing: 0.05em;
		}

		&__value {
			font-size: 1rem;
			font-weight: 800;
			color: #fff;
		}
	}

	.info-blocks {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;

		@media (max-width: 768px) {
			grid-template-columns: 1fr;
		}
	}

	.info-card {
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 1.25rem;
		padding: 1.25rem;

		&__header {
			display: flex;
			align-items: center;
			gap: 0.75rem;
			margin-bottom: 1.25rem;
			color: #ff4081;

			h4 {
				font-size: 0.85rem;
				font-weight: 800;
				color: #fff;
				text-transform: uppercase;
				letter-spacing: 0.05em;
			}
		}

		&__list {
			display: flex;
			flex-direction: column;
			gap: 0.75rem;
		}
	}

	.booster-item,
	.activity-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem;
		background: rgba(255, 255, 255, 0.02);
		border-radius: 0.75rem;
		font-size: 0.85rem;
	}

	.booster-item {
		color: #4ade80;
		&__name {
			flex: 1;
			color: #fff;
			font-weight: 600;
		}
		&__time {
			font-family: monospace;
			opacity: 0.6;
		}
	}

	.activity-item {
		&__text {
			flex: 1;
			color: rgba(255, 255, 255, 0.7);
		}
		&__time {
			font-size: 0.75rem;
			opacity: 0.4;
		}
	}

	.badge {
		padding: 0.25rem 0.6rem;
		border-radius: 2rem;
		font-size: 0.65rem;
		font-weight: 800;
		text-transform: uppercase;

		&--online {
			background: rgba(74, 222, 128, 0.1);
			color: #4ade80;
			border: 1px solid rgba(74, 222, 128, 0.2);
		}

		&--offline {
			background: rgba(148, 163, 184, 0.1);
			color: #94a3b8;
			border: 1px solid rgba(148, 163, 184, 0.2);
		}
	}

	.empty-state {
		font-size: 0.85rem;
		color: rgba(255, 255, 255, 0.4);
		font-style: italic;
		padding: 0.5rem;
	}
</style>
