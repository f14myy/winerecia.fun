<script>
	import { Users } from 'lucide-svelte';

	let { count = 0 } = $props();
</script>

<div class="online">
	<Users size={16} />
	<span class="online__label">Онлайн:</span>
	<span class="online__count">{count}</span>
</div>

<style lang="scss">
	.online {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background: rgba(233, 30, 99, 0.1);
		border-radius: 2rem;
		border: 1px solid rgba(233, 30, 99, 0.2);

		&__count {
			font-weight: 700;
			color: var(--accent);
		}
	}
</style>
