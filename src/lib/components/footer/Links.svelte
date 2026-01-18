<script>
	import { MessageCircle, Users } from 'lucide-svelte';

	const socialLinks = [
		{ href: 'https://discord.gg/tpnJMDmVJr', icon: MessageCircle, label: 'Discord' },
		{ href: 'https://vk.com/winerecia', icon: Users, label: 'VK' }
	];
</script>

<div class="social">
	<h4 class="social__title">Социальные сети</h4>
	<div class="social__links">
		{#each socialLinks as link}
			<a
				href={link.href}
				class="social__link"
				target="_blank"
				rel="noopener noreferrer"
				aria-label={link.label}
			>
				<svelte:component this={link.icon} size={20} />
			</a>
		{/each}
	</div>
</div>

<style lang="scss">
	.social {
		&__title {
			font-weight: 700;
			font-size: 1.125rem;
			color: var(--foreground);
			margin-bottom: 1rem;
			position: relative;
			padding-bottom: 0.5rem;

			&::after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 0;
				width: 2rem;
				height: 2px;
				background: var(--gradient-primary);
			}
		}

		&__links {
			display: flex;
			gap: 0.75rem;
		}

		&__link {
			width: 2.5rem;
			height: 2.5rem;
			display: flex;
			align-items: center;
			justify-content: center;
			background: rgba(233, 30, 99, 0.1);
			border: 1px solid rgba(233, 30, 99, 0.2);
			border-radius: 0.5rem;
			color: var(--foreground);
			transition: all 0.3s;

			&:hover {
				background: var(--gradient-primary);
				border-color: transparent;
				transform: translateY(-3px) rotate(5deg);
				box-shadow: var(--shadow-md);
				color: var(--primary-foreground);
			}
		}
	}
</style>
