<script>
	import { User, Shield, Key, Disc, Image, Bell, Check, Save } from 'lucide-svelte';
	import { fly } from 'svelte/transition';

	let {
		user = {
			name: 'f14my',
			email: 'f14my@winerecia.fun',
			discord: 'f14my#0001',
			notifications: true
		}
	} = $props();

	let success = $state(false);

	function handleSave() {
		success = true;
		setTimeout(() => (success = false), 3000);
	}
</script>

<div class="settings-section">
	<div class="settings-section__header" in:fly={{ y: -10, duration: 600 }}>
		<h2 class="font-heading settings-section__title">Настройки аккаунта</h2>
		<p class="settings-section__subtitle">Управление личными данными и безопасностью</p>
	</div>

	<div class="settings-section__grid">
		<!-- Profile Settings -->
		<div class="settings-card" in:fly={{ y: 20, delay: 100, duration: 600 }}>
			<div class="settings-card__header">
				<User size={20} class="settings-card__icon" />
				<h3 class="settings-card__title">Профиль</h3>
			</div>
			<div class="settings-card__content">
				<div class="settings-form">
					<div class="settings-field">
						<label for="username">Имя пользователя</label>
						<input type="text" id="username" value={user.name} readonly />
						<span class="settings-field__hint">Имя пользователя нельзя изменить</span>
					</div>
					<div class="settings-field">
						<label for="email">Email</label>
						<input type="email" id="email" value={user.email} />
					</div>
					<div class="settings-field">
						<label for="discord">Discord ID</label>
						<div class="settings-field__input-group">
							<Disc size={18} />
							<input type="text" id="discord" value={user.discord} placeholder="username#0000" />
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Security Settings -->
		<div class="settings-card" in:fly={{ y: 20, delay: 200, duration: 600 }}>
			<div class="settings-card__header">
				<Shield size={20} class="settings-card__icon" />
				<h3 class="settings-card__title">Безопасность</h3>
			</div>
			<div class="settings-card__content">
				<div class="settings-form">
					<div class="settings-field">
						<label for="old-password">Текущий пароль</label>
						<div class="settings-field__input-group">
							<Key size={18} />
							<input type="password" id="old-password" placeholder="••••••••" />
						</div>
					</div>
					<div class="settings-field">
						<label for="new-password">Новый пароль</label>
						<div class="settings-field__input-group">
							<Key size={18} />
							<input type="password" id="new-password" placeholder="••••••••" />
						</div>
					</div>
					<button class="btn btn-ghost settings-card__btn">Сменить пароль</button>
				</div>
			</div>
		</div>

		<!-- Preferences -->
		<div class="settings-card" in:fly={{ y: 20, delay: 300, duration: 600 }}>
			<div class="settings-card__header">
				<Bell size={20} class="settings-card__icon" />
				<h3 class="settings-card__title">Уведомления</h3>
			</div>
			<div class="settings-card__content">
				<div class="settings-form">
					<label class="toggle-wrapper">
						<input type="checkbox" checked={user.notifications} />
						<span class="toggle-slider"></span>
						<span class="toggle-label">Уведомления в Telegram</span>
					</label>
					<label class="toggle-wrapper">
						<input type="checkbox" checked />
						<span class="toggle-slider"></span>
						<span class="toggle-label">Рассылка о новостях</span>
					</label>
				</div>
			</div>
		</div>

		<!-- Skin -->
		<div class="settings-card" in:fly={{ y: 20, delay: 400, duration: 600 }}>
			<div class="settings-card__header">
				<Image size={20} class="settings-card__icon" />
				<h3 class="settings-card__title">Скин и плащи</h3>
			</div>
			<div class="settings-card__content">
				<p class="settings-card__text">
					Загрузите новый скин или плащ, чтобы выделиться на сервере.
				</p>
				<div class="skin-actions">
					<button class="btn btn-primary btn-sm">Загрузить скин</button>
					<button class="btn btn-ghost btn-sm">Убрать плащ</button>
				</div>
			</div>
		</div>
	</div>

	<div class="settings-section__footer">
		<button class="btn btn-primary settings-save-btn" onclick={handleSave} disabled={success}>
			{#if success}
				<Check size={20} /> Сохранено
			{:else}
				<Save size={20} /> Сохранить изменения
			{/if}
		</button>
	</div>
</div>

<style lang="scss">
	.settings-section {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;

		&__header {
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
			color: var(--muted-foreground);
		}

		&__grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
			gap: 1rem;

			@media (max-width: 640px) {
				grid-template-columns: 1fr;
			}
		}

		&__footer {
			display: flex;
			justify-content: flex-end;
			margin-top: 1rem;
		}
	}

	.settings-card {
		background: rgba(255, 255, 255, 0.03);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 1rem;
		overflow: hidden;
		display: flex;
		flex-direction: column;

		&__header {
			padding: 1.25rem;
			display: flex;
			align-items: center;
			gap: 1rem;
			border-bottom: 1px solid rgba(255, 255, 255, 0.05);
		}

		&__title {
			font-size: 1rem;
			font-weight: 800;
			color: #fff;
		}

		&__content {
			padding: 1.25rem;
			flex: 1;
		}

		&__text {
			font-size: 0.9rem;
			color: var(--muted-foreground);
			line-height: 1.6;
			margin-bottom: 1.5rem;
		}

		&__btn {
			width: 100%;
			margin-top: 1rem;
		}
	}

	.settings-form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.settings-field {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;

		label {
			font-size: 0.75rem;
			font-weight: 800;
			color: rgba(255, 255, 255, 0.5);
			text-transform: uppercase;
			letter-spacing: 0.1em;
			padding-left: 0.25rem;
		}

		input {
			background: rgba(255, 255, 255, 0.03);
			border: 1px solid rgba(255, 255, 255, 0.08);
			border-radius: 1rem;
			padding: 0.875rem 1.25rem;
			color: #fff;
			font-size: 0.95rem;
			transition: all 0.3s;

			&:focus {
				outline: none;
				border-color: rgba(233, 30, 99, 0.3);
				background: rgba(233, 30, 99, 0.02);
			}

			&[readonly] {
				opacity: 0.6;
				cursor: not-allowed;
			}
		}

		&__input-group {
			position: relative;
			display: flex;
			align-items: center;

			:global(svg) {
				position: absolute;
				left: 1.25rem;
				color: rgba(255, 255, 255, 0.2);
				pointer-events: none;
			}

			input {
				width: 100%;
				padding-left: 3.25rem;
			}
		}

		&__hint {
			font-size: 0.75rem;
			color: rgba(255, 255, 255, 0.3);
			padding-left: 0.25rem;
		}
	}

	.toggle-wrapper {
		display: flex;
		align-items: center;
		gap: 1rem;
		cursor: pointer;

		input {
			display: none;

			&:checked + .toggle-slider {
				background: #ff4081;
				&::after {
					transform: translateX(20px);
				}
			}
		}

		.toggle-slider {
			width: 44px;
			height: 24px;
			background: rgba(255, 255, 255, 0.1);
			border-radius: 12px;
			position: relative;
			transition: all 0.3s;

			&::after {
				content: '';
				position: absolute;
				top: 4px;
				left: 4px;
				width: 16px;
				height: 16px;
				background: #fff;
				border-radius: 50%;
				transition: all 0.3s;
			}
		}

		.toggle-label {
			font-size: 0.95rem;
			color: #fff;
			font-weight: 600;
		}
	}

	.skin-actions {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.settings-save-btn {
		height: 3.5rem;
		padding: 0 2.5rem;
		font-size: 1.1rem;
		font-weight: 800;
		border-radius: 1.125rem;
		gap: 0.75rem;
	}
</style>
