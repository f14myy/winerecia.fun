<script>
	import { Package, Star, Coins } from 'lucide-svelte';
	import { fly } from 'svelte/transition';

	let { selectedCategory, onCategoryChange } = $props();

	const filters = [
		{ id: 'all', label: 'Все товары', icon: Package },
		{ id: 'privilege', label: 'Привилегии', icon: Star },
		{ id: 'currency', label: 'Валюта', icon: Coins }
	];
</script>

<div class="shop-filters" in:fly={{ y: 20, duration: 800, delay: 400 }}>
	{#each filters as filter, i}
		<button
			class="shop-filters__item"
			class:shop-filters__item--active={selectedCategory === filter.id}
			onclick={() => onCategoryChange(filter.id)}
		>
			<div class="shop-filters__icon-wrapper">
				<svelte:component this={filter.icon} size={20} strokeWidth={2.5} />
			</div>
			<span>{filter.label}</span>
			{#if selectedCategory === filter.id}
				<div class="shop-filters__active-indicator" layout:id="active"></div>
			{/if}
		</button>
	{/each}
</div>

<style lang="scss">
	.shop-filters {
		display: flex;
		gap: 1rem;
		margin-bottom: 4rem;
		flex-wrap: wrap;
		position: relative;
		z-index: 5;

		&__item {
			display: flex;
			align-items: center;
			gap: 0.875rem;
			padding: 0.75rem 1.5rem;
			background: rgba(255, 255, 255, 0.03);
			backdrop-filter: blur(10px);
			border: 1px solid rgba(255, 255, 255, 0.08);
			border-radius: 1rem;
			color: rgba(255, 255, 255, 0.6);
			font-weight: 700;
			font-size: 0.9375rem;
			cursor: pointer;
			transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
			position: relative;
			overflow: hidden;

			&:hover {
				background: rgba(255, 255, 255, 0.06);
				color: #fff;
				border-color: rgba(255, 255, 255, 0.15);
				transform: translateY(-2px);

				.shop-filters__icon-wrapper {
					color: var(--accent);
					transform: scale(1.1);
				}
			}

			&--active {
				background: rgba(233, 30, 99, 0.1);
				border-color: rgba(233, 30, 99, 0.3);
				color: #fff;
				box-shadow: 0 10px 20px -10px rgba(233, 30, 99, 0.2);

				.shop-filters__icon-wrapper {
					color: #ff4081;
				}
			}
		}

		&__icon-wrapper {
			display: flex;
			align-items: center;
			justify-content: center;
			transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		}

		&__active-indicator {
			position: absolute;
			bottom: 0;
			left: 15%;
			right: 15%;
			height: 2px;
			background: var(--gradient-primary);
			border-radius: 2px 2px 0 0;
		}
	}
</style>
