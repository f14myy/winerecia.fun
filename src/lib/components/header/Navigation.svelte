<script>
	import { Map, DollarSign, HelpCircle } from 'lucide-svelte';

	const links = [
		{ href: 'https://map.winerecia.fun', label: 'Карта', icon: Map },
		{ href: '/shop', label: 'Донат', icon: DollarSign },
		{ href: '#faq', label: 'FAQ', icon: HelpCircle }
	];
</script>

<nav class="nav">
	{#each links as link}
		<a
			href={link.href}
			class="nav__link"
			target={link.href.startsWith('http') ? '_blank' : undefined}
			rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
		>
			<svelte:component this={link.icon} size={16} />
			<span>{link.label}</span>
		</a>
	{/each}
</nav>

<style lang="scss">
	.nav {
		display: flex;
		gap: 2rem;

		&__link {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			color: var(--foreground);
			text-decoration: none;
			font-weight: 500;
			transition: all 0.3s;
			position: relative;

			&::after {
				content: '';
				position: absolute;
				bottom: -4px;
				left: 0;
				width: 0;
				height: 2px;
				background: var(--gradient-primary);
				transition: width 0.3s;
			}

			&:hover {
				color: var(--accent);
				&::after {
					width: 100%;
				}
			}
		}
	}
</style>
