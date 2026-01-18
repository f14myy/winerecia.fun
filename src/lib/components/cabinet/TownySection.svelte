<script>
	import { Building2, Users, Receipt, MapPin, Plus, ArrowRight, Settings2 } from 'lucide-svelte';
	import { fly } from 'svelte/transition';

	let { town } = $props();

	const townName = $derived(town?.name);
	const mayor = $derived(town?.mayor || 'Неизвестно');
	const residentsCount = $derived(town?.residentsCount || 0);
	const balance = $derived(town?.balance || 0);
	const taxes = $derived(town?.taxes || 0);
	const chunks = $derived(town?.townBlocksCount || 0);
	const nationName = $derived(town?.nation || 'Нет нации');

	const hasTown = $derived(!!townName);
</script>

<div class="towny-section">
	{#if !hasTown}
		<div class="cabinet__card cabinet__card--empty" in:fade>
			<div class="cabinet__empty-icon">
				<div class="cabinet__empty-glow"></div>
			</div>
			<p>
				Вы еще не вступили в город. Присоединитесь к существующему или создайте свой собственный!
			</p>
			<a href="/map" class="btn btn-primary btn-sm">Карта городов</a>
		</div>
	{:else}
		<div class="towny-section__header" in:fly={{ y: -10, duration: 600 }}>
			<div class="towny-section__title-group">
				<h2 class="font-heading towny-section__title">{townName}</h2>
				{#if nationName !== 'Нет нации'}
					<span class="towny-section__badge">Столица {nationName}</span>
				{/if}
			</div>
			<div class="towny-section__actions">
				<button class="btn btn-ghost btn-sm"><Settings2 size={16} /> Настройки</button>
				<button class="btn btn-primary btn-sm"><Plus size={16} /> Пригласить</button>
			</div>
		</div>

		<div class="towny-section__grid">
			<!-- Main Info -->
			<div class="towny-card" in:fly={{ y: 20, delay: 100, duration: 600 }}>
				<div class="towny-card__header">
					<span class="towny-card__icon"><Receipt size={20} /></span>
					<h3 class="towny-card__title">Экономика</h3>
				</div>
				<div class="towny-card__content">
					<div class="towny-card__stat">
						<span class="towny-card__label">В банке</span>
						<span class="towny-card__value">{balance.toLocaleString()} ₽</span>
					</div>
					<div class="towny-card__stat">
						<span class="towny-card__label">Налог</span>
						<span class="towny-card__value">{taxes}%</span>
					</div>
				</div>
				<div class="towny-card__footer">
					<button class="towny-card__link">Пополнить банк <ArrowRight size={14} /></button>
				</div>
			</div>

			<!-- Population -->
			<div class="towny-card" in:fly={{ y: 20, delay: 200, duration: 600 }}>
				<div class="towny-card__header">
					<span class="towny-card__icon"><Users size={20} /></span>
					<h3 class="towny-card__title">Жители</h3>
				</div>
				<div class="towny-card__content">
					<div class="towny-card__stat">
						<span class="towny-card__label">Всего</span>
						<span class="towny-card__value">{residentsCount} чел.</span>
					</div>
					<div class="towny-card__stat">
						<span class="towny-card__label">Мэр</span>
						<span class="towny-card__value">{mayor}</span>
					</div>
				</div>
				<div class="towny-card__footer">
					<button class="towny-card__link">Список жителей <ArrowRight size={14} /></button>
				</div>
			</div>

			<!-- Territory -->
			<div class="towny-card" in:fly={{ y: 20, delay: 300, duration: 600 }}>
				<div class="towny-card__header">
					<span class="towny-card__icon"><MapPin size={20} /></span>
					<h3 class="towny-card__title">Территория</h3>
				</div>
				<div class="towny-card__content">
					<div class="towny-card__stat">
						<span class="towny-card__label">Чанков</span>
						<span class="towny-card__value">{chunks} шт.</span>
					</div>
					<div class="towny-card__stat">
						<span class="towny-card__label">Доступно</span>
						<span class="towny-card__value">{town?.maxTownBlocks || 0} шт.</span>
					</div>
				</div>
				<div class="towny-card__footer">
					<button class="towny-card__link">Карта чанков <ArrowRight size={14} /></button>
				</div>
			</div>
		</div>

		<!-- Recent Activity -->
		<div class="towny-activity" in:fly={{ y: 20, delay: 400, duration: 600 }}>
			<h3 class="font-heading towny-activity__title">Последние события</h3>
			<div class="towny-activity__list">
				<div class="activity-item">
					<div class="activity-item__dot activity-item__dot--success"></div>
					<p class="activity-item__text"><strong>Reater</strong> присоединился к городу</p>
					<span class="activity-item__time">2ч назад</span>
				</div>
				<div class="activity-item">
					<div class="activity-item__dot activity-item__dot--warning"></div>
					<p class="activity-item__text">Снято 450 ₽ на содержание города</p>
					<span class="activity-item__time">5ч назад</span>
				</div>
				<div class="activity-item">
					<div class="activity-item__dot activity-item__dot--info"></div>
					<p class="activity-item__text"><strong>Kendal</strong> изменил налог на 5%</p>
					<span class="activity-item__time">12ч назад</span>
				</div>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.towny-section {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;

		&__header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 2rem;

			@media (max-width: 640px) {
				flex-direction: column;
				align-items: flex-start;
			}
		}

		&__title-group {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}

		&__title {
			font-size: 1.75rem;
			font-weight: 900;
			color: #fff;
		}

		&__badge {
			font-size: 0.75rem;
			font-weight: 800;
			color: #ff4081;
			text-transform: uppercase;
			letter-spacing: 0.1em;
			background: rgba(233, 30, 99, 0.1);
			padding: 0.35rem 0.75rem;
			border-radius: 2rem;
			border: 1px solid rgba(233, 30, 99, 0.2);
		}

		&__actions {
			display: flex;
			gap: 1rem;
		}

		&__grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
			gap: 1rem;
		}
	}

	.towny-card {
		background: rgba(255, 255, 255, 0.03);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 1rem;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		transition: all 0.3s;

		&:hover {
			background: rgba(255, 255, 255, 0.05);
			border-color: rgba(255, 255, 255, 0.12);
			transform: translateY(-4px);
		}

		&__header {
			padding: 1.5rem;
			display: flex;
			align-items: center;
			gap: 1rem;
			border-bottom: 1px solid rgba(255, 255, 255, 0.05);
		}

		&__icon {
			color: #ff4081;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		&__title {
			font-size: 1.1rem;
			font-weight: 800;
			color: #fff;
		}

		&__content {
			padding: 1.5rem;
			display: flex;
			flex-direction: column;
			gap: 1.25rem;
		}

		&__stat {
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
		}

		&__label {
			font-size: 0.75rem;
			font-weight: 700;
			color: var(--muted-foreground);
			text-transform: uppercase;
			letter-spacing: 0.1em;
		}

		&__value {
			font-size: 1.25rem;
			font-weight: 900;
			color: #fff;
			font-family: var(--font-unbounded);
		}

		&__footer {
			padding: 1rem 1.5rem;
			background: rgba(255, 255, 255, 0.02);
			border-top: 1px solid rgba(255, 255, 255, 0.05);
		}

		&__link {
			background: transparent;
			border: none;
			color: rgba(255, 255, 255, 0.5);
			font-size: 0.85rem;
			font-weight: 700;
			display: flex;
			align-items: center;
			gap: 0.5rem;
			cursor: pointer;
			padding: 0;
			transition: color 0.3s;

			&:hover {
				color: #ff4081;
			}
		}
	}

	.towny-activity {
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 1.5rem;
		padding: 2rem;

		&__title {
			font-size: 1.5rem;
			font-weight: 800;
			color: #fff;
			margin-bottom: 1.5rem;
		}

		&__list {
			display: flex;
			flex-direction: column;
			gap: 1.25rem;
		}
	}

	.activity-item {
		display: flex;
		align-items: center;
		gap: 1.25rem;

		&__dot {
			width: 8px;
			height: 8px;
			border-radius: 50%;
			flex-shrink: 0;

			&--success {
				background: #4ade80;
				box-shadow: 0 0 10px #4ade80;
			}
			&--warning {
				background: #fbbf24;
				box-shadow: 0 0 10px #fbbf24;
			}
			&--info {
				background: #3b82f6;
				box-shadow: 0 0 10px #3b82f6;
			}
		}

		&__text {
			flex: 1;
			font-size: 0.95rem;
			color: rgba(255, 255, 255, 0.8);

			strong {
				color: #fff;
			}
		}

		&__time {
			font-size: 0.85rem;
			color: var(--muted-foreground);
		}
	}
</style>
