<script>
	import { User, Lock, Mail, ArrowRight } from 'lucide-svelte';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	let username = $state('');
	let password = $state('');
	let rememberMe = $state(false);
	let visible = $state(false);

	onMount(() => {
		visible = true;
	});

	function handleSubmit() {
		if (!username || !password) {
			alert('Пожалуйста, заполните все поля');
			return;
		}

		console.log('Login:', { username, password, rememberMe });
		alert('Вход выполнен!');
	}
</script>

{#if visible}
	<div class="login-form" in:fly={{ y: 30, duration: 800, easing: cubicOut }}>
		<div class="login-form__glow"></div>

		<div class="login-form__header">
			<h1 class="login-form__title font-heading" in:fly={{ y: -10, delay: 200, duration: 600 }}>
				Вход
			</h1>
			<p class="login-form__subtitle" in:fade={{ delay: 300, duration: 600 }}>
				Используйте никнейм и пароль с сервера Minecraft
			</p>
		</div>

		<form
			class="login-form__form"
			onsubmit={(e) => {
				e.preventDefault();
				handleSubmit();
			}}
		>
			<div class="login-form__field" in:fly={{ x: -20, delay: 400, duration: 600 }}>
				<label class="login-form__label" for="username">Никнейм</label>
				<div class="login-form__input-wrapper">
					<User size={18} strokeWidth={2.5} />
					<input
						type="text"
						id="username"
						class="login-form__input"
						bind:value={username}
						placeholder="Ваш никнейм"
						required
					/>
				</div>
			</div>

			<div class="login-form__field" in:fly={{ x: -20, delay: 500, duration: 600 }}>
				<label class="login-form__label" for="password">Пароль</label>
				<div class="login-form__input-wrapper">
					<Lock size={18} strokeWidth={2.5} />
					<input
						type="password"
						id="password"
						class="login-form__input"
						bind:value={password}
						placeholder="••••••••"
						required
					/>
				</div>
			</div>

			<div class="login-form__options" in:fade={{ delay: 600, duration: 600 }}>
				<label class="login-form__checkbox">
					<input type="checkbox" bind:checked={rememberMe} />
					<span>Запомнить меня</span>
				</label>
			</div>

			<button
				type="submit"
				class="btn btn-primary login-form__submit"
				in:fly={{ y: 20, delay: 700, duration: 600 }}
			>
				<span>Войти</span>
				<ArrowRight size={18} />
			</button>
		</form>
	</div>
{/if}

<style lang="scss">
	.login-form {
		width: 100%;
		max-width: 480px;
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
			right: -10%;
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
			max-width: 300px;
			margin: 0 auto;
		}

		&__form {
			display: flex;
			flex-direction: column;
			gap: 1.75rem;
			position: relative;
			z-index: 1;
		}

		&__field {
			display: flex;
			flex-direction: column;
			gap: 0.75rem;
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
			border-radius: 1.25rem;
			transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

			&:focus-within {
				border-color: rgba(233, 30, 99, 0.5);
				background: rgba(233, 30, 99, 0.05);
				box-shadow: 0 0 20px rgba(233, 30, 99, 0.1);
				transform: translateY(-2px);

				:global(svg) {
					color: #ff4081;
				}
			}

			:global(svg) {
				color: rgba(255, 255, 255, 0.4);
				transition: color 0.3s;
			}
		}

		&__input {
			flex: 1;
			padding: 1.125rem 0;
			background: transparent;
			border: none;
			color: #fff;
			font-size: 1rem;
			font-weight: 500;

			&:focus {
				outline: none;
			}

			&::placeholder {
				color: rgba(255, 255, 255, 0.2);
			}
		}

		&__options {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: -0.5rem 0;
		}

		&__checkbox {
			display: flex;
			align-items: center;
			gap: 0.75rem;
			cursor: pointer;
			user-select: none;

			input[type='checkbox'] {
				width: 1.25rem;
				height: 1.25rem;
				cursor: pointer;
				opacity: 0.8;
				accent-color: #ff4081;
			}

			span {
				font-size: 0.9rem;
				font-weight: 500;
				color: var(--muted-foreground);
			}
		}

		&__link {
			color: var(--muted-foreground);
			text-decoration: none;
			font-size: 0.9rem;
			font-weight: 600;
			transition: all 0.3s;

			&:hover {
				color: #ff4081;
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

			&:hover {
				transform: translateY(-3px);
				box-shadow: 0 20px 40px -5px rgba(233, 30, 99, 0.5);
			}
		}

		&__footer {
			text-align: center;
			color: var(--muted-foreground);
			font-size: 0.95rem;
			font-weight: 500;
			margin-top: 0.5rem;
		}
	}
</style>
