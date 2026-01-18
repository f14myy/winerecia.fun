<script>
	import { Copy } from 'lucide-svelte';

	let { serverIP = 'mc.winerecia.fun' } = $props();

	let copied = $state(false);

	function copyToClipboard() {
		navigator.clipboard.writeText(serverIP);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<div class="ip-card card">
	<div class="ip-content">
		<div class="ip-label">IP сервера:</div>
		<code class="ip-code">{serverIP}</code>
		<button class="btn btn-ghost btn-sm copy-btn" onclick={copyToClipboard}>
			<Copy size={16} />
		</button>
	</div>
	{#if copied}
		<div class="copied">Скопировано!</div>
	{/if}
</div>

<style lang="scss">
	.ip-card {
		padding: 1.25rem 1.5rem;
		background: linear-gradient(135deg, rgba(11, 4, 7, 0.8), rgba(42, 15, 29, 0.6));
		backdrop-filter: blur(20px);
		border: 1px solid var(--border-light);
		box-shadow: var(--shadow-lg);
		transition: all 0.3s;
		position: relative;

		&:hover {
			border-color: var(--accent);
			box-shadow: 0 8px 32px rgba(233, 30, 99, 0.3);
			transform: translateY(-2px);
		}
	}

	.ip-content {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.ip-label {
		color: var(--muted-foreground);
		font-weight: 500;
	}

	.ip-code {
		color: var(--accent);
		font-family: 'Courier New', monospace;
		font-weight: 700;
		background: rgba(233, 30, 99, 0.1);
		padding: 0.25rem 0.75rem;
		border-radius: 0.375rem;
		font-size: 1.125rem;
	}

	.copy-btn {
		margin-left: auto;
	}

	.copied {
		position: absolute;
		top: -2rem;
		right: 1rem;
		background: var(--accent);
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		font-size: 0.875rem;
		font-weight: 600;
		animation: fade-in-out 2s ease-in-out;
	}

	@keyframes fade-in-out {
		0%,
		100% {
			opacity: 0;
			transform: translateY(5px);
		}
		10%,
		90% {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
