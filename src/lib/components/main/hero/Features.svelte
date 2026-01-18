<script>
	import { Sword, TrendingUp, Users } from 'lucide-svelte';

	const features = [
		{ icon: Sword, label: 'Эпические битвы' },
		{ icon: TrendingUp, label: 'Живая экономика' },
		{ icon: Users, label: 'Живое сообщество' }
	];
</script>

<div class="features">
	{#each features as feature}
		<div class="feature">
			<svelte:component this={feature.icon} size={24} />
			<span>{feature.label}</span>
		</div>
	{/each}
</div>

<style lang="scss">
	.features {
		display: flex;
		gap: 1.5rem;
		justify-content: center;
		flex-wrap: wrap;
		margin-bottom: 2.5rem;
	}

	.feature {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		background: rgba(233, 30, 99, 0.1);
		border: 1px solid rgba(233, 30, 99, 0.2);
		border-radius: 2rem;
		color: var(--foreground);
		font-weight: 600;
		transition: all 0.3s;

		&:hover {
			background: rgba(233, 30, 99, 0.15);
			border-color: var(--accent);
			transform: translateY(-2px);
			box-shadow: 0 4px 12px rgba(233, 30, 99, 0.2);
		}

		:global(svg) {
			color: var(--accent);
		}
	}
</style>
