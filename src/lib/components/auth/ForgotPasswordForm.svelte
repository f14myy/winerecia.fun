<script>
	import { Mail, ArrowRight, ArrowLeft } from 'lucide-svelte';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	let email = $state('');
	let visible = $state(false);
	let isSubmitted = $state(false);

	onMount(() => {
		visible = true;
	});

	function handleSubmit() {
		if (!email) {
			alert('Пожалуйста, введите ваш email');
			return;
		}

		console.log('Forgot Password:', { email });
		isSubmitted = true;
	}
</script>

{#if visible}
	<div class="forgot-password-form" in:fly={{ y: 30, duration: 800, easing: cubicOut }}>
		<div class="forgot-password-form__glow"></div>

		{#if !isSubmitted}
			<div class="forgot-password-form__header">
				<h1
					class="forgot-password-form__title font-heading"
					in:fly={{ y: -10, delay: 200, duration: 600 }}
				>
					Сброс пароля
				</h1>
				<p class="forgot-password-form__subtitle" in:fade={{ delay: 300, duration: 600 }}>
					Мы отправим инструкцию по восстановлению на вашу почту
				</p>
			</div>

			<form
				class="forgot-password-form__form"
				onsubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
			>
				<div class="forgot-password-form__field" in:fly={{ x: -20, delay: 400, duration: 600 }}>
					<label class="forgot-password-form__label" for="email">Электронная почта</label>
					<div class="forgot-password-form__input-wrapper">
						<Mail size={18} strokeWidth={2.5} />
						<input
							type="email"
							id="email"
							class="forgot-password-form__input"
							bind:value={email}
							placeholder="example@mail.com"
							required
						/>
					</div>
				</div>

				<button
					type="submit"
					class="btn btn-primary forgot-password-form__submit"
					in:fly={{ y: 20, delay: 500, duration: 600 }}
				>
					<span>Отправить инструкцию</span>
					<ArrowRight size={18} />
				</button>

				<div class="forgot-password-form__footer" in:fade={{ delay: 600, duration: 600 }}>
					<a href="/login" class="forgot-password-form__link-back">
						<ArrowLeft size={16} />
						<span>Вернуться к входу</span>
					</a>
				</div>
			</form>
		{:else}
			<div class="forgot-password-form__success" in:fade={{ duration: 600 }}>
				<div class="forgot-password-form__icon-success">
					<Mail size={48} strokeWidth={1.5} />
				</div>
				<h2 class="forgot-password-form__success-title font-heading">Проверьте почту</h2>
				<p class="forgot-password-form__success-text">
					Мы отправили письмо на <strong>{email}</strong> с инструкциями по сбросу пароля.
				</p>
				<button
					class="btn btn-primary forgot-password-form__submit"
					onclick={() => (isSubmitted = false)}
				>
					<span>Отправить еще раз</span>
				</button>
				<div class="forgot-password-form__footer">
					<a href="/login" class="forgot-password-form__link-back">
						<ArrowLeft size={16} />
						<span>Вернуться к входу</span>
					</a>
				</div>
			</div>
		{/if}
	</div>
{/if}

<style lang="scss">
	.forgot-password-form {
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
			line-height: 1.1;
		}

		&__subtitle {
			color: var(--muted-foreground);
			font-size: 1rem;
			opacity: 0.8;
			max-width: 320px;
			margin: 0 auto;
			line-height: 1.5;
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
				opacity: 0.5;
				cursor: not-allowed;
			}
		}

		&__footer {
			text-align: center;
			margin-top: 0.5rem;
		}

		&__link-back {
			display: inline-flex;
			align-items: center;
			gap: 0.5rem;
			color: var(--muted-foreground);
			text-decoration: none;
			font-size: 0.95rem;
			font-weight: 600;
			transition: all 0.3s;

			&:hover {
				color: #ff4081;
				transform: translateX(-4px);
			}
		}

		&__success {
			text-align: center;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 1.5rem;
			position: relative;
			z-index: 1;
		}

		&__icon-success {
			width: 80px;
			height: 80px;
			background: rgba(233, 30, 99, 0.1);
			border: 1px solid rgba(233, 30, 99, 0.2);
			border-radius: 2rem;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #ff4081;
			margin-bottom: 0.5rem;
		}

		&__success-title {
			font-size: 2rem;
			font-weight: 900;
			color: #fff;
		}

		&__success-text {
			color: var(--muted-foreground);
			line-height: 1.6;
			font-size: 1.05rem;

			strong {
				color: #fff;
			}
		}
	}
</style>
