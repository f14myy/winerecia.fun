<script>
	import { User, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-svelte';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	let username = $state('');
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let agreedToTerms = $state(false);
	let visible = $state(false);

	onMount(() => {
		visible = true;
	});

	function handleSubmit() {
		if (!username || !email || !password || !confirmPassword) {
			alert('Пожалуйста, заполните все поля');
			return;
		}

		if (password !== confirmPassword) {
			alert('Пароли не совпадают');
			return;
		}

		if (!agreedToTerms) {
			alert('Необходимо согласиться с политикой обработки данных');
			return;
		}

		console.log('Register:', { username, email, password });
		alert('Регистрация успешна!');
	}
</script>

{#if visible}
	<div class="register-form" in:fly={{ y: 30, duration: 800, easing: cubicOut }}>
		<div class="register-form__glow"></div>

		<div class="register-form__header">
			<h1 class="register-form__title font-heading" in:fly={{ y: -10, delay: 100, duration: 600 }}>
				Регистрация
			</h1>
			<p class="register-form__subtitle" in:fade={{ delay: 200, duration: 600 }}>
				Начните свой путь в мире Winerecia
			</p>
		</div>

		<form
			class="register-form__form"
			onsubmit={(e) => {
				e.preventDefault();
				handleSubmit();
			}}
		>
			<div class="register-form__grid">
				<div class="register-form__field" in:fly={{ x: -20, delay: 300, duration: 600 }}>
					<label class="register-form__label" for="username">Игровой ник</label>
					<div class="register-form__input-wrapper">
						<User size={18} strokeWidth={2.5} />
						<input
							type="text"
							id="username"
							class="register-form__input"
							bind:value={username}
							placeholder="Ваш ник"
							required
						/>
					</div>
				</div>

				<div class="register-form__field" in:fly={{ x: -20, delay: 400, duration: 600 }}>
					<label class="register-form__label" for="email">E-mail адрес</label>
					<div class="register-form__input-wrapper">
						<Mail size={18} strokeWidth={2.5} />
						<input
							type="email"
							id="email"
							class="register-form__input"
							bind:value={email}
							placeholder="a@a.a"
							required
						/>
					</div>
				</div>

				<div class="register-form__field" in:fly={{ x: -20, delay: 500, duration: 600 }}>
					<label class="register-form__label" for="password">Пароль</label>
					<div class="register-form__input-wrapper">
						<Lock size={18} strokeWidth={2.5} />
						<input
							type="password"
							id="password"
							class="register-form__input"
							bind:value={password}
							placeholder="••••••••"
							required
						/>
					</div>
				</div>

				<div class="register-form__field" in:fly={{ x: -20, delay: 600, duration: 600 }}>
					<label class="register-form__label" for="confirm-password">Повтор пароля</label>
					<div class="register-form__input-wrapper">
						<ShieldCheck size={18} strokeWidth={2.5} />
						<input
							type="password"
							id="confirm-password"
							class="register-form__input"
							bind:value={confirmPassword}
							placeholder="••••••••"
							required
						/>
					</div>
				</div>
			</div>

			<label class="register-form__checkbox" in:fade={{ delay: 700, duration: 600 }}>
				<div class="checkbox-wrapper">
					<input type="checkbox" id="terms" bind:checked={agreedToTerms} required />
					<div class="checkbox-custom"></div>
				</div>
				<span>
					Я принимаю <a href="/polit.pdf" target="_blank">политику конфиденциальности</a> и
					<a href="/rules" target="_blank">правила сервера</a>
				</span>
			</label>

			<button
				type="submit"
				class="btn btn-primary register-form__submit"
				disabled={!agreedToTerms}
				in:fly={{ y: 20, delay: 800, duration: 600 }}
			>
				<span>Создать персонажа</span>
				<ArrowRight size={18} />
			</button>

			<div class="register-form__footer" in:fade={{ delay: 900, duration: 600 }}>
				Уже есть аккаунт? <a href="/login" class="register-form__link-alt">Войти</a>
			</div>
		</form>
	</div>
{/if}

<style lang="scss">
	.register-form {
		width: 100%;
		max-width: 520px;
		margin: 0 auto;
		padding: 3.5rem;
		background: rgba(14, 8, 11, 0.85);
		backdrop-filter: blur(40px);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 2.5rem;
		position: relative;
		overflow: hidden;
		box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.6);

		@media (max-width: 640px) {
			padding: 2.5rem 1.5rem;
			border-radius: 2rem;
		}

		&__glow {
			position: absolute;
			top: -20%;
			left: -10%;
			width: 250px;
			height: 250px;
			background: radial-gradient(circle, rgba(233, 30, 99, 0.12), transparent 70%);
			pointer-events: none;
		}

		&__header {
			text-align: center;
			margin-bottom: 3rem;
			position: relative;
			z-index: 1;
		}

		&__title {
			font-size: 2.5rem;
			font-weight: 900;
			background: linear-gradient(135deg, #fff 0%, #ff4081 100%);
			-webkit-background-clip: text;
			background-clip: text;
			color: transparent;
			margin-bottom: 0.75rem;
			letter-spacing: -0.02em;
		}

		&__subtitle {
			color: var(--muted-foreground);
			font-size: 1rem;
			opacity: 0.8;
		}

		&__form {
			display: flex;
			flex-direction: column;
			gap: 1.75rem;
			position: relative;
			z-index: 1;
		}

		&__grid {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 1.5rem;
			width: 100%;

			@media (max-width: 480px) {
				grid-template-columns: 1fr;
				gap: 1.25rem;
			}
		}

		&__field {
			display: flex;
			flex-direction: column;
			gap: 0.75rem;
			min-width: 0; // CRITICAL: allows grid items to shrink below their content size
		}

		&__label {
			font-size: 0.85rem;
			font-weight: 700;
			color: rgba(255, 255, 255, 0.9);
			text-transform: uppercase;
			letter-spacing: 0.08em;
			padding-left: 0.25rem;
		}

		&__input-wrapper {
			display: flex;
			align-items: center;
			gap: 1rem;
			padding: 0 1.25rem;
			background: rgba(255, 255, 255, 0.03);
			border: 1px solid rgba(255, 255, 255, 0.08);
			border-radius: 1.125rem;
			transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

			&:focus-within {
				border-color: rgba(233, 30, 99, 0.5);
				background: rgba(233, 30, 99, 0.05);
				box-shadow: 0 0 20px rgba(233, 30, 99, 0.1);
				transform: translateY(-2px);

				:global(svg) {
					color: #ff4081;
					opacity: 1;
				}
			}

			:global(svg) {
				color: rgba(255, 255, 255, 0.5); // Increased from 0.3
				transition: all 0.3s;
				flex-shrink: 0;
			}
		}

		&__input {
			flex: 1;
			padding: 1rem 0;
			background: transparent;
			border: none;
			color: #fff;
			font-size: 0.95rem;
			font-weight: 500;

			&:focus {
				outline: none;
			}

			&::placeholder {
				color: rgba(255, 255, 255, 0.15);
			}
		}

		&__checkbox {
			display: flex;
			align-items: flex-start;
			gap: 1rem;
			cursor: pointer;
			user-select: none;
			margin: 0.5rem 0;

			.checkbox-wrapper {
				position: relative;
				width: 1.25rem;
				height: 1.25rem;
				flex-shrink: 0;
				margin-top: 0.125rem;

				input {
					position: absolute;
					opacity: 0;
					cursor: pointer;
					height: 0;
					width: 0;

					&:checked ~ .checkbox-custom {
						background: #ff4081;
						border-color: #ff4081;
						&::after {
							display: block;
						}
					}
				}

				.checkbox-custom {
					position: absolute;
					top: 0;
					left: 0;
					height: 1.25rem;
					width: 1.25rem;
					background: rgba(255, 255, 255, 0.05);
					border: 1px solid rgba(255, 255, 255, 0.1);
					border-radius: 6px;
					transition: all 0.3s;

					&::after {
						content: '';
						position: absolute;
						display: none;
						left: 6px;
						top: 2px;
						width: 5px;
						height: 10px;
						border: solid white;
						border-width: 0 2.5px 2.5px 0;
						transform: rotate(45deg);
					}
				}
			}

			span {
				font-size: 0.85rem;
				color: var(--muted-foreground);
				line-height: 1.6;

				a {
					color: #ff4081;
					text-decoration: none;
					font-weight: 700;
					&:hover {
						text-decoration: underline;
					}
				}
			}
		}

		&__link-alt {
			color: #ff4081;
			text-decoration: none;
			font-weight: 700;
			transition: all 0.3s;
			&:hover {
				text-decoration: underline;
			}
		}

		&__submit {
			width: 100%;
			height: 3.75rem;
			font-size: 1.1rem;
			font-weight: 800;
			border-radius: 1.25rem;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 0.75rem;
			box-shadow: 0 15px 30px -5px rgba(233, 30, 99, 0.4);
			margin-top: 1rem;
			transition: all 0.3s;

			&:hover:not(:disabled) {
				transform: translateY(-3px);
				box-shadow: 0 20px 40px -5px rgba(233, 30, 99, 0.5);
			}

			&:disabled {
				opacity: 0.4;
				cursor: not-allowed;
				box-shadow: none;
			}
		}

		&__footer {
			text-align: center;
			color: var(--muted-foreground);
			font-size: 0.95rem;
			font-weight: 500;
		}
	}
</style>
