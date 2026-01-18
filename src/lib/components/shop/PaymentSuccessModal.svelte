<script>
	import { CheckCircle2, ArrowRight, X } from 'lucide-svelte';
	import { fly, fade } from 'svelte/transition';

	let { isOpen, onClose } = $props();

	function handleClose() {
		onClose();
	}
</script>

{#if isOpen}
	<div
		class="modal-overlay"
		onclick={handleClose}
		role="button"
		tabindex="0"
		onkeydown={(e) => e.key === 'Escape' && handleClose()}
	>
		<div
			class="modal"
			onclick={(e) => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
			tabindex="-1"
		>
			<button class="modal__close" onclick={handleClose}>
				<X size={20} />
			</button>

			<div class="modal__content">
				<div class="modal__icon-wrapper">
					<CheckCircle2 size={64} strokeWidth={1.5} />
				</div>

				<h2 class="modal__title">Оплата прошла успешно!</h2>
				<p class="modal__text">
					Спасибо за покупку. Ваши товары или привилегии будут начислены в течение нескольких минут.
				</p>

				<button class="modal__button" onclick={handleClose}>
					<span>Отлично</span>
					<ArrowRight size={18} />
				</button>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.modal-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.8);
		backdrop-filter: blur(8px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: 1rem;
		animation: fadeIn 0.2s ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.modal {
		background: rgba(14, 8, 11, 0.9);
		backdrop-filter: blur(40px);
		border: 1px solid rgba(74, 222, 128, 0.2);
		border-radius: 2rem;
		max-width: 400px;
		width: 100%;
		padding: 2.5rem;
		position: relative;
		box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.6);
		animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;

		&__close {
			position: absolute;
			top: 1rem;
			right: 1rem;
			width: 2rem;
			height: 2rem;
			background: rgba(255, 255, 255, 0.03);
			border: 1px solid rgba(255, 255, 255, 0.08);
			color: rgba(255, 255, 255, 0.4);
			cursor: pointer;
			border-radius: 0.5rem;
			display: flex;
			align-items: center;
			justify-content: center;
			transition: all 0.2s;

			&:hover {
				color: #fff;
				background: rgba(255, 255, 255, 0.1);
			}
		}

		&__content {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 1.5rem;
		}

		&__icon-wrapper {
			width: 80px;
			height: 80px;
			border-radius: 50%;
			background: rgba(74, 222, 128, 0.1);
			display: flex;
			align-items: center;
			justify-content: center;
			color: #4ade80;
			box-shadow: 0 0 40px rgba(74, 222, 128, 0.2);
			margin-bottom: 0.5rem;
		}

		&__title {
			font-size: 1.5rem;
			font-weight: 800;
			color: #fff;
			margin: 0;
			line-height: 1.2;
		}

		&__text {
			font-size: 0.95rem;
			color: var(--muted-foreground);
			line-height: 1.5;
			margin: 0;
		}

		&__button {
			margin-top: 1rem;
			width: 100%;
			height: 3.5rem;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 0.75rem;
			background: #4ade80;
			border: none;
			border-radius: 1rem;
			color: #000;
			font-weight: 700;
			font-size: 1rem;
			cursor: pointer;
			transition: all 0.3s;
			box-shadow: 0 10px 20px -5px rgba(74, 222, 128, 0.4);

			&:hover {
				transform: translateY(-2px);
				box-shadow: 0 15px 30px -5px rgba(74, 222, 128, 0.5);
			}

			&:active {
				transform: translateY(0);
			}
		}
	}
</style>
