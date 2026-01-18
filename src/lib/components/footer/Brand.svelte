<script>
	import { Wine } from 'lucide-svelte';

	const SERVER_IP = 'mc.winerecia.fun';
</script>

<div class="brand">
	<div class="brand__logo">
		<div class="brand__logo-icon">
			<Wine size={20} />
		</div>
		<span class="font-heading brand__logo-text">WINERECIA</span>
	</div>

	<p class="brand__description">
		Политический Minecraft сервер с живыми войнами и продуманной экономикой
	</p>

	<p class="brand__ip">
		IP: <code>{SERVER_IP}</code>
	</p>
</div>

<style lang="scss">
	.brand {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		&__logo {
			display: flex;
			align-items: center;
			gap: 0.75rem;
			cursor: pointer;
			transition: transform 0.3s;

			&:hover {
				transform: scale(1.05);

				.brand__logo-icon {
					transform: rotate(-10deg);
				}
			}
		}

		&__logo-icon {
			width: 2.5rem;
			height: 2.5rem;
			background: var(--gradient-primary);
			border-radius: 0.5rem;
			display: flex;
			align-items: center;
			justify-content: center;
			color: var(--primary-foreground);
			box-shadow: var(--shadow-glow);
			transition: all 0.3s;
		}

		&__logo-text {
			font-size: 1.5rem;
			font-weight: 800;
			background: var(--gradient-primary);
			-webkit-background-clip: text;
			background-clip: text;
			color: transparent;
		}

		&__description {
			color: var(--muted-foreground);
			line-height: 1.6;
			max-width: 280px;
		}

		&__ip {
			color: var(--muted-foreground);

			code {
				color: var(--accent);
				font-family: 'Courier New', monospace;
				background: rgba(233, 30, 99, 0.1);
				padding: 0.25rem 0.5rem;
				border-radius: 0.25rem;
				font-weight: 600;
				font-size: 0.9rem;
			}
		}
	}
</style>
