<script>
	/**
	 * Секция "Почему мы?"
	 * Рассказывает об основных преимуществах сервера и уникальных механиках.
	 */
	import { Shield, Brain, Zap, Star } from 'lucide-svelte';

	// Подкомпоненты
	import SectionTitle from './SectionTitle.svelte';
	import FeatureCard from '$lib/components/main/whyus/FeatureCard.svelte';

	// Список основных преимуществ
	const features = [
		{
			icon: Shield,
			title: 'Реальная политика',
			description:
				'На сервере поддерживаются красивые границы и политика. Вместо привычного Towny используется наш форк PolitEngine.'
		},
		{
			icon: Zap,
			title: 'Огнестрельное оружие',
			description:
				'Уникальная система оружия с заводами. Производи Танки, Самолёты и боевое снаряжение для захватывающих сражений.'
		},
		{
			icon: Brain,
			title: 'На грани возможного',
			description:
				'Над сервером работают опытные разработчики, что гарантирует наличие уникальных и стабильных плагинов.'
		},
		{
			icon: Star,
			title: 'Дружелюбные игроки',
			description:
				'Мы поддерживаем позитивную атмосферу. Соперничество и войны не мешают игрокам оставаться людьми!'
		}
	];
</script>

<section class="why-us">
	<!-- Фоновые градиенты для глубины -->
	<div class="why-us__bg"></div>

	<div class="container why-us__container">
		<!-- Заголовок секции с использованием общего компонента -->
		<SectionTitle
			title1="Почему"
			title2="мы"
			title3="?"
			subtitle="Мы создаем не просто сервер, а целую экосистему для комфортной игры и реализации твоих амбиций."
		/>

		<!-- Основная сетка преимуществ -->
		<div class="why-us__grid">
			{#each features as feature, index (feature.title)}
				<div class="animate-slide-up" style="animation-delay: {index * 0.15}s;">
					<FeatureCard
						icon={feature.icon}
						title={feature.title}
						description={feature.description}
					/>
				</div>
			{/each}
		</div>

		<!-- Дополнительные мелкие карточки с механиками -->
		<div class="why-us__extras">
			<h3 class="why-us__extras-title">Уникальные механики и фишки</h3>
			<div class="why-us__extras-grid">
				<!-- Карточка 1 -->
				<div class="card why-us__extra-card">
					<h4 class="why-us__extra-title">Обновляемый ад</h4>
					<p class="why-us__extra-text">
						Постоянно обновляемое измерение с новыми структурами и опасными мобами.
					</p>
				</div>
				<!-- Карточка 2 -->
				<div class="card why-us__extra-card">
					<h4 class="why-us__extra-title">Кастомные чары</h4>
					<p class="why-us__extra-text">
						Уникальные зачарования вроде "Бульдозера", которые меняют подход к выживанию.
					</p>
				</div>
				<!-- Карточка 3 -->
				<div class="card why-us__extra-card">
					<h4 class="why-us__extra-title">Игровые события</h4>
					<p class="why-us__extra-text">
						Регулярные ивенты от администрации: от турниров до глобальных войн.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	.why-us {
		padding: 5rem 1rem; // Уменьшил
		position: relative;
		overflow: hidden;

		@media (max-width: 768px) {
			padding: 3rem 1rem; // Еще меньше на мобилках
		}

		&__bg {
			position: absolute;
			inset: 0;
			background: radial-gradient(circle at 50% 50%, rgba(233, 30, 99, 0.05), transparent 80%);
			pointer-events: none;

			&::before {
				content: '';
				position: absolute;
				top: 20%;
				left: 5%;
				width: 600px;
				height: 600px;
				background: radial-gradient(circle, rgba(233, 30, 99, 0.08), transparent 70%);
				border-radius: 50%;
				filter: blur(80px);
			}
		}

		&__container {
			position: relative;
			z-index: 10;
		}

		&__grid {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 2rem; // Уменьшил gap
			max-width: 1100px;
			margin: 0 auto;

			@media (max-width: 900px) {
				gap: 1.25rem;
			}

			@media (max-width: 768px) {
				grid-template-columns: 1fr;
			}
		}

		&__extras {
			margin-top: 4rem; // Уменьшил
			border-top: 1px solid rgba(233, 30, 99, 0.1);
			padding-top: 3rem;

			@media (max-width: 768px) {
				margin-top: 3rem;
				padding-top: 2rem;
			}
		}

		&__extras-title {
			font-size: 2.25rem;
			font-weight: 800;
			text-align: center;
			margin-bottom: 3.5rem;
			background: linear-gradient(to right, #fff, #ff4081);
			-webkit-background-clip: text;
			background-clip: text;
			color: transparent;
			letter-spacing: -0.01em;
			font-family: var(--font-unbounded);

			@media (max-width: 768px) {
				font-size: 1.75rem;
				margin-bottom: 2.5rem;
			}
		}

		&__extras-grid {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 1.5rem;

			@media (max-width: 900px) {
				grid-template-columns: repeat(2, 1fr);
			}

			@media (max-width: 600px) {
				grid-template-columns: 1fr;
			}
		}

		&__extra-card {
			padding: 2rem;
			background: rgba(255, 255, 255, 0.02);
			border: 1px solid rgba(255, 255, 255, 0.05);
			border-radius: 1.5rem;
			transition: all 0.4s ease;
			position: relative;
			overflow: hidden;

			&::after {
				content: '';
				position: absolute;
				inset: 0;
				background: linear-gradient(135deg, rgba(233, 30, 99, 0.1), transparent);
				opacity: 0;
				transition: opacity 0.4s ease;
			}

			&:hover {
				border-color: rgba(233, 30, 99, 0.3);
				background: rgba(233, 30, 99, 0.03);
				transform: translateY(-5px);
				box-shadow: 0 15px 35px -10px rgba(0, 0, 0, 0.5);

				&::after {
					opacity: 1;
				}

				.why-us__extra-title {
					color: #ff4081;
				}
			}
		}

		&__extra-title {
			font-weight: 800;
			font-size: 1.25rem;
			color: #fff;
			margin-bottom: 1rem;
			transition: color 0.3s;
			position: relative;
			z-index: 1;
			font-family: var(--font-unbounded);
		}

		&__extra-text {
			font-size: 0.95rem;
			color: var(--muted-foreground);
			line-height: 1.6;
			position: relative;
			z-index: 1;
			opacity: 0.8;
		}
	}
</style>
