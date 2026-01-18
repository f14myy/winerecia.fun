<script>
	/**
	 * Секция "Чем мы отличаемся?"
	 * Демонстрирует уникальные фичи сервера, такие как экономика, артефакты и кроссплатформенность.
	 */
	import { Coins, Gem, Globe, Smartphone } from 'lucide-svelte';

	// Подкомпоненты
	import SectionTitle from './SectionTitle.svelte';
	import DifferenceCard from './differense/DifferenceCard.svelte';

	let { maxplayers = 0 } = $props();

	// Список отличий с ключевыми особенностями
	const differences = [
		{
			icon: Coins,
			title: 'Продуманная экономика',
			description:
				'Растения растут в зависимости от биома и климата. Уникальная система налогообложения наций.',
			features: ['Зависимость от климата', 'Биржа ресурсов', 'Система налогов']
		},
		{
			icon: Gem,
			title: 'Мистические артефакты',
			description:
				'Специальные предметы, улучшающие ПВП-характеристики или упрощающие повседневную рутину развития поселений.',
			features: ['ПВП-бусты', 'Упрощение рутины']
		},
		{
			icon: Globe,
			title: 'Версия 1.21.4+',
			description:
				'Самая свежая и стабильная версия Minecraft со всеми новейшими возможностями и механиками.',
			features: ['Высокая стабильность', 'Новейший контент', 'Оптимизация']
		},
		{
			icon: Smartphone,
			title: 'Кроссплатформенность',
			description:
				'Полная поддержка Bedrock Edition позволяет играть с телефонов, консолей и ПК в одном мире.',
			features: ['Bedrock поддержка', 'Мобильный гейминг', 'Единый мир']
		}
	];
</script>

<section class="differences">
	<div class="container">
		<!-- Общий заголовок секции -->
		<SectionTitle
			title1="Чем"
			title2="мы отличаемся"
			title3="от других?"
			subtitle="Наши уникальные механики создают неповторимый опыт политической игры, которого вы не найдете на других серверах."
		/>

		<!-- Сетка карточек с отличиями -->
		<div class="differences__grid">
			{#each differences as diff, index}
				<div class="animate-slide-up" style="animation-delay: {index * 0.15}s;">
					<DifferenceCard
						icon={diff.icon}
						title={diff.title}
						description={diff.description}
						features={diff.features}
					/>
				</div>
			{/each}
		</div>

		<!-- Числовые показатели сервера -->
		<div class="differences__stats">
			<div class="differences__stat">
				<div class="differences__stat-value">6000²</div>
				<div class="differences__stat-label">Площадь карты</div>
			</div>
			<div class="differences__stat differences__stat--accent">
				<div class="differences__stat-value">1.21.4</div>
				<div class="differences__stat-label">Версия сервера</div>
			</div>
			<div class="differences__stat">
				<div class="differences__stat-value">24/7</div>
				<div class="differences__stat-label">Uptime сервера</div>
			</div>
			<div class="differences__stat differences__stat--accent">
				<div class="differences__stat-value">{maxplayers}</div>
				<div class="differences__stat-label">Слотов онлайн</div>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	.differences {
		padding: 6rem 1rem; // Уменьшил паддинг секции
		background: radial-gradient(circle at 50% 50%, rgba(233, 30, 99, 0.03), transparent 70%);
		position: relative;
		overflow: hidden;

		@media (max-width: 768px) {
			padding: 4rem 0; // Убираем боковой паддинг у секции, пусть работает контейнер
		}

		&::before {
			content: '';
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 1000px;
			height: 1000px;
			background: radial-gradient(circle, rgba(233, 30, 99, 0.05), transparent 70%);
			pointer-events: none;
		}

		&__grid {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 2.5rem;
			max-width: 1100px;
			margin: 0 auto;
			position: relative;
			z-index: 1;
			width: 100%;
			box-sizing: border-box;

			@media (max-width: 900px) {
				grid-template-columns: 1fr;
				gap: 1.5rem;
				padding: 0; // Чистим лишние паддинги
			}
		}

		&__stats {
			margin-top: 4rem; // Еще уменьшил отступ до статистики
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			gap: 1.5rem;
			max-width: 1100px;
			margin-left: auto;
			margin-right: auto;
			position: relative;
			z-index: 1;

			@media (max-width: 1000px) {
				grid-template-columns: repeat(2, 1fr);
			}

			@media (max-width: 480px) {
				grid-template-columns: 1fr;
				margin-top: 4rem;
			}
		}

		&__stat {
			text-align: center;
			padding: 2rem 1rem;
			background: rgba(255, 255, 255, 0.02);
			border-radius: 1.5rem;
			border: 1px solid rgba(255, 255, 255, 0.05);
			backdrop-filter: blur(8px);
			transition: all 0.4s ease;
			position: relative;
			overflow: hidden;

			&:hover {
				transform: translateY(-5px);
				border-color: rgba(233, 30, 99, 0.3);
				background: rgba(233, 30, 99, 0.03);
				box-shadow: 0 15px 35px -10px rgba(0, 0, 0, 0.4);

				.differences__stat-value {
					transform: scale(1.05);
					color: #fff;
				}
			}
		}

		&__stat-value {
			font-size: 2.25rem;
			font-weight: 800;
			color: rgba(255, 255, 255, 0.9);
			margin-bottom: 0.5rem;
			transition: all 0.3s ease;
			font-family: var(--font-unbounded);
			letter-spacing: -0.02em;
		}

		&__stat--accent &__stat-value {
			background: linear-gradient(135deg, #fff 0%, #ff4081 100%);
			-webkit-background-clip: text;
			background-clip: text;
			color: transparent;
		}

		&__stat-label {
			font-size: 0.875rem;
			color: var(--muted-foreground);
			font-weight: 500;
			text-transform: uppercase;
			letter-spacing: 0.05em;
			opacity: 0.7;
		}
	}
</style>
