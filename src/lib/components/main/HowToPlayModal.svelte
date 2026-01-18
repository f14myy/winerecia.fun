<script>
	import { createEventDispatcher } from 'svelte';
	import { scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	const dispatch = createEventDispatcher();
	let selectedTab = $state('experienced');

	function closeModal() {
		dispatch('close');
	}
</script>

<div
	class="how-to-play-modal"
	role="dialog"
	aria-modal="true"
	tabindex="0"
	onclick={(e) => e.stopPropagation()}
	onkeydown={(e) => e.key === 'Escape' && closeModal()}
	transition:scale={{ duration: 400, start: 0.9, easing: cubicOut }}
>
	<div class="modal-glow"></div>

	<div class="modal-header">
		<div class="modal-header__info">
			<h2 class="modal-title font-heading">Как начать играть</h2>
			<p class="modal-subtitle">Всего несколько шагов до приключения</p>
		</div>
		<button class="modal-close" onclick={closeModal} aria-label="Закрыть">
			<div class="close-icon"></div>
		</button>
	</div>

	<div class="modal-tabs">
		<button
			class="tab-btn"
			class:active={selectedTab === 'experienced'}
			onclick={() => (selectedTab = 'experienced')}
		>
			<span class="tab-btn__text">Я уже играл в Minecraft</span>
		</button>
		<button
			class="tab-btn"
			class:active={selectedTab === 'newbie'}
			onclick={() => (selectedTab = 'newbie')}
		>
			<span class="tab-btn__text">Я не играл в Minecraft</span>
		</button>
	</div>

	<div class="modal-content">
		{#if selectedTab === 'experienced'}
			<div class="tab-content">
				<div class="step-list">
					<div class="step">
						<div class="step-num-wrapper">
							<div class="step-number">01</div>
							<div class="step-line"></div>
						</div>
						<div class="step-content">
							<h4>Откройте Minecraft</h4>
							<p>Запустите игру через любой удобный лаунчер</p>
						</div>
					</div>

					<div class="step">
						<div class="step-num-wrapper">
							<div class="step-number">02</div>
							<div class="step-line"></div>
						</div>
						<div class="step-content">
							<h4>Мультиплеер</h4>
							<p>Выберите раздел «Сетевая игра» в главном меню</p>
						</div>
					</div>

					<div class="step">
						<div class="step-num-wrapper">
							<div class="step-number">03</div>
							<div class="step-line"></div>
						</div>
						<div class="step-content">
							<h4>Адрес сервера</h4>
							<div class="server-info-compact">
								<code class="ip-address">mc.winerecia.fun</code>
								<span class="hint">Версия 1.21.4</span>
							</div>
						</div>
					</div>

					<div class="step">
						<div class="step-num-wrapper">
							<div class="step-number">04</div>
						</div>
						<div class="step-content">
							<h4>Подключайтесь</h4>
							<p>Нажмите «Подключиться» или дважды кликните по логотипу</p>
						</div>
					</div>
				</div>
			</div>
		{:else}
			<div class="tab-content">
				<div class="step-list">
					<div class="step">
						<div class="step-num-wrapper">
							<div class="step-number">01</div>
							<div class="step-line"></div>
						</div>
						<div class="step-content">
							<h4>Скачайте лаунчер</h4>
							<p>Мы советуем <strong>Astralrinth</strong> для лучшего опыта</p>
							<a
								href="https://www.9minecraft.net/astralrinth-launcher/"
								target="_blank"
								class="action-btn"
							>
								Скачать лаунчер
							</a>
						</div>
					</div>

					<div class="step">
						<div class="step-num-wrapper">
							<div class="step-number">02</div>
							<div class="step-line"></div>
						</div>
						<div class="step-content">
							<h4>Установка и Вход</h4>
							<p>Установите программу и войдите под своим аккаунтом</p>
						</div>
					</div>

					<div class="step">
						<div class="step-num-wrapper">
							<div class="step-number">03</div>
							<div class="step-line"></div>
						</div>
						<div class="step-content">
							<h4>Версия 1.21.4</h4>
							<p>Скачайте и запустите последнюю стабильную версию 1.21.4</p>
						</div>
					</div>

					<div class="step">
						<div class="step-num-wrapper">
							<div class="step-number">04</div>
						</div>
						<div class="step-content">
							<h4>Добавьте сервер</h4>
							<p>Используйте адрес: <code class="ip-address">winerecia.fun</code></p>
						</div>
					</div>
				</div>

				<div class="help-box">
					<div class="help-box__info">
						<h5>Возникли сложности?</h5>
						<p>Заходи в Discord, мы поможем!</p>
					</div>
					<a href="https://discord.gg/winerecia" target="_blank" class="discord-btn"> Discord </a>
				</div>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.how-to-play-modal {
		background: rgba(14, 8, 11, 0.95);
		backdrop-filter: blur(40px);
		border: 1px solid rgba(233, 30, 99, 0.2);
		border-radius: 2.5rem;
		max-width: 600px;
		width: 100%;
		max-height: 90vh;
		padding: 3rem;
		position: relative;
		box-shadow:
			0 50px 100px -20px rgba(0, 0, 0, 0.8),
			0 0 50px rgba(233, 30, 99, 0.1);
		overflow: hidden;
		scrollbar-width: none;

		&::-webkit-scrollbar {
			display: none;
		}
	}

	.modal-glow {
		position: absolute;
		top: -20%;
		right: -10%;
		width: 300px;
		height: 300px;
		background: radial-gradient(circle, rgba(233, 30, 99, 0.15), transparent 70%);
		pointer-events: none;
		z-index: 0;
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 2.5rem;
		position: relative;
		z-index: 1;

		&__info {
			.modal-title {
				font-size: 2.25rem;
				font-weight: 900;
				margin-bottom: 0.5rem;
				background: linear-gradient(135deg, #fff, #ff4081);
				-webkit-background-clip: text;
				background-clip: text;
				color: transparent;
				letter-spacing: -0.02em;
			}
			.modal-subtitle {
				color: var(--muted-foreground);
				font-size: 1rem;
				opacity: 0.8;
			}
		}
	}

	.modal-close {
		width: 3rem;
		height: 3rem;
		border-radius: 1rem;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

		&:hover {
			background: rgba(233, 30, 99, 0.1);
			border-color: rgba(233, 30, 99, 0.3);
			transform: rotate(90deg);
		}

		.close-icon {
			position: relative;
			width: 20px;
			height: 2px;
			background: #fff;
			transform: rotate(45deg);
			&::after {
				content: '';
				position: absolute;
				inset: 0;
				background: #fff;
				transform: rotate(-90deg);
			}
		}
	}

	.modal-tabs {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.75rem;
		margin-bottom: 3rem;
		padding: 0.4rem;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 1.25rem;
		position: relative;
		z-index: 1;
	}

	.tab-btn {
		padding: 1rem;
		border: none;
		background: transparent;
		color: var(--muted-foreground);
		font-weight: 700;
		font-size: 0.95rem;
		cursor: pointer;
		border-radius: 1rem;
		transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

		&.active {
			background: var(--gradient-primary);
			color: #fff;
			box-shadow: 0 10px 20px -5px rgba(233, 30, 99, 0.4);
		}
	}

	.step-list {
		display: flex;
		flex-direction: column;
		position: relative;
		z-index: 1;
	}

	.step {
		display: flex;
		gap: 2rem;
		padding-bottom: 2rem;

		&:last-child {
			padding-bottom: 0;
		}
	}

	.step-num-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 2.5rem;
	}

	.step-number {
		width: 2.5rem;
		height: 2.5rem;
		background: rgba(233, 30, 99, 0.1);
		border: 1px solid rgba(233, 30, 99, 0.2);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #ff4081;
		font-weight: 800;
		font-size: 0.85rem;
		flex-shrink: 0;
		font-family: var(--font-unbounded);
	}

	.step-line {
		width: 2px;
		flex: 1;
		background: linear-gradient(to bottom, rgba(233, 30, 99, 0.3), transparent);
		margin: 0.5rem 0;
	}

	.step-content {
		padding-top: 0.4rem;
		h4 {
			font-size: 1.125rem;
			font-weight: 700;
			color: #fff;
			margin-bottom: 0.5rem;
		}
		p {
			color: var(--muted-foreground);
			line-height: 1.6;
			font-size: 0.95rem;
			opacity: 0.8;
		}
	}

	.ip-address {
		display: inline-block;
		padding: 0.5rem 1rem;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 0.75rem;
		color: #ff4081;
		font-family: var(--font-mono);
		font-weight: 700;
		font-size: 1rem;
		margin: 0.5rem 0;
	}

	.server-info-compact {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		.hint {
			font-size: 0.85rem;
			color: var(--muted-foreground);
			opacity: 0.6;
		}
	}

	.action-btn {
		display: inline-flex;
		padding: 0.75rem 1.5rem;
		background: rgba(233, 30, 99, 0.1);
		border: 1px solid rgba(233, 30, 99, 0.2);
		color: #ff4081;
		border-radius: 0.75rem;
		text-decoration: none;
		font-weight: 700;
		font-size: 0.9rem;
		margin-top: 0.75rem;
		transition: all 0.3s;

		&:hover {
			background: rgba(233, 30, 99, 0.2);
			transform: translateY(-2px);
		}
	}

	.help-box {
		margin-top: 3rem;
		padding: 1.5rem;
		background: linear-gradient(135deg, rgba(88, 101, 242, 0.1), rgba(88, 101, 242, 0.05));
		border: 1px solid rgba(88, 101, 242, 0.2);
		border-radius: 1.5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1.5rem;

		&__info {
			h5 {
				font-weight: 800;
				color: #fff;
				margin-bottom: 0.25rem;
			}
			p {
				font-size: 0.85rem;
				color: var(--muted-foreground);
				opacity: 0.8;
			}
		}
	}

	.discord-btn {
		padding: 0.75rem 1.5rem;
		background: #5865f2;
		color: #fff;
		border-radius: 1rem;
		font-weight: 800;
		text-decoration: none;
		font-size: 0.9rem;
		box-shadow: 0 10px 20px -5px rgba(88, 101, 242, 0.4);
		transition: all 0.3s;
		&:hover {
			transform: translateY(-2px);
		}
	}

	@media (max-width: 768px) {
		.how-to-play-modal {
			padding: 2.5rem 1.5rem;
			border-radius: 2rem;
			width: calc(100% - 2rem);
			margin: 1rem;
		}

		.modal-header__info .modal-title {
			font-size: 1.75rem;
		}

		.modal-close {
			width: 2.5rem;
			height: 2.5rem;
		}

		.modal-tabs {
			grid-template-columns: 1fr;
			margin-bottom: 2rem;
		}

		.step {
			gap: 1.25rem;
		}

		.help-box {
			flex-direction: column;
			text-align: center;
			.discord-btn {
				width: 100%;
			}
		}
	}
</style>
