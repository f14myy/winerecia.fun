<script>
	import { Landmark, Globe, Sword, Heart, ArrowRight, ShieldAlert } from 'lucide-svelte';
	import { fly } from 'svelte/transition';

	let { nation } = $props();

	const nationName = $derived(nation?.name);
	const capital = $derived(nation?.capital || 'Неизвестно');
	const leader = $derived(nation?.king || 'Неизвестно'); // Assuming 'king' for leader based on common Towny plugins
	const townsCount = $derived(nation?.towns?.length || 0); // Assuming towns list
	const residentsCount = $derived(nation?.residentsCount || 0);
	const treasury = $derived(nation?.balance || 0);
	const allies = $derived(nation?.allies || []);
	const enemies = $derived(nation?.enemies || []);

	const hasNation = $derived(!!nationName);
</script>

<div class="nation-section">
	{#if !hasNation}
		<div class="cabinet__card cabinet__card--empty" in:fade>
			<div class="cabinet__empty-icon">
				<div class="cabinet__empty-glow"></div>
			</div>
			<p>Вы еще не состоите в нации. Создайте свою или присоединитесь к существующей!</p>
			<a href="/map" class="btn btn-primary btn-sm">Посмотреть на карте</a>
		</div>
	{:else}
		<div class="nation-section__header" in:fly={{ y: -10, duration: 600 }}>
			<div class="nation-section__title-group">
				<h2 class="font-heading nation-section__title">{nationName}</h2>
				<p class="nation-section__subtitle">Великая империя под руководством {leader}</p>
			</div>
			<div class="nation-section__stats">
				<div class="n-stat">
					<span class="n-stat__label">Казна</span>
					<span class="n-stat__value">{treasury.toLocaleString()} ₽</span>
				</div>
			</div>
		</div>

		<div class="nation-section__grid">
			<!-- Diplomacy -->
			<div class="nation-card diplomacy-card" in:fly={{ y: 20, delay: 100, duration: 600 }}>
				<div class="nation-card__header">
					<span class="nation-card__icon"><Globe size={20} /></span>
					<h3 class="nation-card__title">Дипломатия</h3>
				</div>
				<div class="nation-card__content">
					<div class="diplomacy-group">
						<span class="diplomacy-group__label"><Heart size={14} /> Союзники</span>
						<div class="diplomacy-group__list">
							{#each nation.allies as ally}
								<span class="diplomacy-tag diplomacy-tag--ally">{ally}</span>
							{/each}
						</div>
					</div>
					<div class="diplomacy-group">
						<span class="diplomacy-group__label"><Sword size={14} /> Враги</span>
						<div class="diplomacy-group__list">
							{#each enemies as enemy}
								<span class="diplomacy-tag diplomacy-tag--enemy">{enemy}</span>
							{/each}
						</div>
					</div>
				</div>
				<div class="nation-card__footer">
					<button class="nation-card__link">Управление союзами <ArrowRight size={14} /></button>
				</div>
			</div>

			<!-- Nation Structure -->
			<div class="nation-card" in:fly={{ y: 20, delay: 200, duration: 600 }}>
				<div class="nation-card__header">
					<span class="nation-card__icon"><Landmark size={20} /></span>
					<h3 class="nation-card__title">Структура</h3>
				</div>
				<div class="nation-card__content">
					<div class="nation-card__stat">
						<span class="nation-card__label">Городов в составе</span>
						<span class="nation-card__value">{townsCount} городов</span>
					</div>
					<div class="nation-card__stat">
						<span class="nation-card__label">Общее население</span>
						<span class="nation-card__value">{residentsCount} чел.</span>
					</div>
				</div>
				<div class="nation-card__footer">
					<button class="nation-card__link">Список городов <ArrowRight size={14} /></button>
				</div>
			</div>

			<!-- War & Peace -->
			<div class="nation-card" in:fly={{ y: 20, delay: 300, duration: 600 }}>
				<div class="nation-card__header">
					<span class="nation-card__icon"><ShieldAlert size={20} /></span>
					<h3 class="nation-card__title">Конфликты</h3>
				</div>
				<div class="nation-card__content">
					<div class="war-status">
						<div class="war-status__indicator"></div>
						<div class="war-status__info">
							<span class="war-status__label">Статус</span>
							<span class="war-status__value">Мирное время</span>
						</div>
					</div>
					<p class="nation-card__description">
						Нет активных войн или угроз. Ваша нация находится в безопасности.
					</p>
				</div>
				<div class="nation-card__footer">
					<button class="nation-card__link">История войн <ArrowRight size={14} /></button>
				</div>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.nation-section {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;

		&__header {
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
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

		&__subtitle {
			font-size: 1rem;
			color: var(--muted-foreground);
		}

		&__grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
			gap: 1rem;
		}
	}

	.n-stat {
		text-align: right;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;

		@media (max-width: 640px) {
			text-align: left;
		}

		&__label {
			font-size: 0.8rem;
			font-weight: 700;
			color: var(--muted-foreground);
			text-transform: uppercase;
			letter-spacing: 0.1em;
		}

		&__value {
			font-size: 1.5rem;
			font-weight: 900;
			color: #ff4081;
			font-family: var(--font-unbounded);
		}
	}

	.nation-card {
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
			gap: 1.5rem;
			flex: 1;
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
		}

		&__description {
			font-size: 0.9rem;
			color: var(--muted-foreground);
			line-height: 1.6;
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

	.diplomacy-group {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;

		&__label {
			font-size: 0.75rem;
			font-weight: 800;
			color: rgba(255, 255, 255, 0.4);
			text-transform: uppercase;
			letter-spacing: 0.1em;
			display: flex;
			align-items: center;
			gap: 0.5rem;
		}

		&__list {
			display: flex;
			flex-wrap: wrap;
			gap: 0.5rem;
		}
	}

	.diplomacy-tag {
		padding: 0.35rem 0.75rem;
		border-radius: 0.75rem;
		font-size: 0.75rem;
		font-weight: 800;

		&--ally {
			background: rgba(74, 222, 128, 0.1);
			color: #4ade80;
			border: 1px solid rgba(74, 222, 128, 0.2);
		}

		&--enemy {
			background: rgba(239, 68, 68, 0.1);
			color: #ef4444;
			border: 1px solid rgba(239, 68, 68, 0.2);
		}
	}

	.war-status {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 0.5rem;

		&__indicator {
			width: 12px;
			height: 12px;
			background: #4ade80;
			border-radius: 50%;
			box-shadow: 0 0 15px #4ade80;
		}

		&__info {
			display: flex;
			flex-direction: column;
		}

		&__label {
			font-size: 0.65rem;
			font-weight: 800;
			color: var(--muted-foreground);
			text-transform: uppercase;
		}

		&__value {
			font-size: 1rem;
			font-weight: 900;
			color: #fff;
		}
	}
</style>
