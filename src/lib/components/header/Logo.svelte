<script>
	/**
	 * Компонент логотипа.
	 * При клике перенаправляет на главную страницу.
	 */
	import { goto } from '$app/navigation';
	import { Wine } from 'lucide-svelte';

	function handleClick() {
		goto('/');
	}
</script>

<div
	class="logo"
	onclick={handleClick}
	role="button"
	tabindex="0"
	onkeydown={(e) => e.key === 'Enter' && handleClick()}
>
	<!-- Иконка бокала/вин - символ сервера -->
	<div class="logo__icon">
		<Wine size={20} strokeWidth={2.5} />
	</div>
	<!-- Текстовое название -->
	<span class="font-heading logo__text">WINERECIA</span>
</div>

<style lang="scss">
	.logo {
		display: flex;
		align-items: center;
		gap: 0.875rem;
		cursor: pointer;
		transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		outline: none;

		&:hover {
			transform: scale(1.05);

			.logo__icon {
				transform: rotate(-12deg) scale(1.1);
				box-shadow: 0 0 20px rgba(233, 30, 99, 0.4);
			}

			.logo__text {
				filter: brightness(1.2);
			}
		}

		&__icon {
			width: 2.75rem;
			height: 2.75rem;
			background: linear-gradient(135deg, #e91e63, #c2185b);
			border-radius: 0.875rem;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
			box-shadow: 0 4px 12px rgba(233, 30, 99, 0.2);
			transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
			position: relative; // Ensure relative positioning for absolute children
		}

		&__text {
			font-size: 1.35rem;
			font-weight: 900;
			background: linear-gradient(to right, #fff, #ffb2cc);
			-webkit-background-clip: text;
			background-clip: text;
			color: transparent;
			letter-spacing: -0.02em;
			font-family: var(--font-unbounded);
			transition: filter 0.3s ease;
		}
	}
</style>
