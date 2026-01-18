<script>
	/**
	 * Компонент статистики в херо-секции.
	 * Отображает важные данные сервера: дату вайпа, онлайн и версию.
	 */
	import { Calendar, Users, TrendingUp } from 'lucide-svelte';

	let { players = 0, maxplayers = 0 } = $props();

	// Данные для карточек статистики
	const stats = [
		{
			icon: Calendar,
			label: 'Таймер вайпа',
			value: '27.12.2025',
			description: 'Новый сезон уже скоро'
		},
		{
			icon: Users,
			label: 'Игроков в сети',
			value: `${players}/${maxplayers}`,
			description: 'Активное сообщество'
		},
		{
			icon: TrendingUp,
			label: 'Версия игры',
			value: '1.21.4',
			description: '+ Bedrock поддержка'
		}
	];
</script>

<div class="stats">
	{#each stats as stat}
		{@const Icon = stat.icon}
		<!-- Карточка отдельного показателя -->
		<div class="stat-card card">
			<div class="stat-header">
				<Icon size={18} strokeWidth={2.5} />
				<span>{stat.label}</span>
			</div>
			<div class="stat-value">{stat.value}</div>
			<div class="stat-label">{stat.description}</div>
		</div>
	{/each}
</div>

<style lang="scss">
	.stats {
		display: grid;
		/* Улучшенная сетка для адаптивности: на мобилках 1 колонка, на планшетах и выше 3 */
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
		margin-top: 3rem;

		@media (max-width: 900px) {
			grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
			gap: 1rem;
		}

		@media (max-width: 480px) {
			grid-template-columns: repeat(2, 1fr); // Используем 2 колонки для нижнего ряда
			gap: 0.75rem;

			// Первая карточка (вайп) занимает всю ширину
			.stat-card:first-child {
				grid-column: span 2;
			}
		}
	}

	.stat-card {
		padding: 1.5rem;
		background: linear-gradient(135deg, rgba(11, 4, 7, 0.7), rgba(42, 15, 29, 0.5));
		backdrop-filter: blur(16px);
		border: 1px solid rgba(233, 30, 99, 0.15);
		border-radius: 1.25rem;
		transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
		position: relative;
		overflow: hidden;

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: radial-gradient(circle at top right, rgba(233, 30, 99, 0.1), transparent);
			opacity: 0;
			transition: opacity 0.4s ease;
		}

		&:hover {
			border-color: rgba(233, 30, 99, 0.4);
			transform: translateY(-5px) scale(1.02);
			box-shadow:
				0 12px 40px rgba(0, 0, 0, 0.3),
				0 0 20px rgba(233, 30, 99, 0.1);

			&::before {
				opacity: 1;
			}

			.stat-header :global(svg) {
				transform: rotate(10deg) scale(1.1);
			}
		}
	}

	.stat-header {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		color: var(--muted-foreground);
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-weight: 600;
		margin-bottom: 1rem;

		:global(svg) {
			color: #e91e63;
			transition: transform 0.3s ease;
		}
	}

	.stat-value {
		font-size: 1.75rem;
		font-weight: 800;
		background: linear-gradient(to right, #fff, #ff4081);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		margin-bottom: 0.4rem;
		font-family: var(--font-unbounded);
		letter-spacing: -0.02em;
	}

	.stat-label {
		color: var(--muted-foreground);
		font-size: 0.875rem;
		opacity: 0.8;
	}
</style>
