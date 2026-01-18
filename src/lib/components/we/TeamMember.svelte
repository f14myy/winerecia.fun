<script>
	import { Send, Github, Globe, MessageSquare } from 'lucide-svelte';
	import { fly, fade } from 'svelte/transition';

	let { avatar, name, role, description, socials = [] } = $props();

	const iconMap = {
		telegram: Send,
		discord: MessageSquare,
		github: Github,
		site: Globe
	};
</script>

<div class="team-member">
	<div class="team-member__inner">
		<div class="team-member__avatar-container">
			<img src={avatar} alt={name} class="team-member__avatar" />
			<div class="team-member__avatar-overlay"></div>
		</div>

		<div class="team-member__content">
			<div class="team-member__info">
				<h3 class="font-heading team-member__name">{name}</h3>
				<p class="team-member__role">{role}</p>
			</div>

			<p class="team-member__description">{description}</p>

			{#if socials && socials.length > 0}
				<div class="team-member__socials">
					{#each socials as social}
						<a
							href={social.url}
							target="_blank"
							rel="noopener noreferrer"
							class="team-member__social-link"
							aria-label={social.label}
							title={social.label}
						>
							<svelte:component
								this={iconMap[social.icon] || iconMap.site}
								size={18}
								strokeWidth={2.5}
							/>
						</a>
					{/each}
				</div>
			{/if}
		</div>
	</div>
	<div class="team-member__glow"></div>
</div>

<style lang="scss">
	.team-member {
		position: relative;
		height: 100%;

		&__inner {
			height: 100%;
			background: rgba(14, 8, 11, 0.7);
			backdrop-filter: blur(40px);
			border: 1px solid rgba(255, 255, 255, 0.08);
			border-radius: 2rem;
			overflow: hidden;
			display: flex;
			flex-direction: column;
			transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
			position: relative;
			z-index: 1;

			&:hover {
				transform: translateY(-8px);
				border-color: rgba(233, 30, 99, 0.3);
				background: rgba(14, 8, 11, 0.82);
				box-shadow: 0 30px 60px -10px rgba(0, 0, 0, 0.5);

				.team-member__avatar {
					transform: scale(1.08);
				}

				.team-member__avatar-overlay {
					opacity: 0.25;
				}

				.team-member__glow {
					opacity: 0.6;
				}
			}
		}

		&__avatar-container {
			width: 100%;
			aspect-ratio: 1.1;
			position: relative;
			overflow: hidden;
			background: rgba(255, 255, 255, 0.02);
		}

		&__avatar {
			width: 100%;
			height: 100%;
			object-fit: cover;
			transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
		}

		&__avatar-overlay {
			position: absolute;
			inset: 0;
			background: linear-gradient(to bottom, transparent 40%, rgba(14, 8, 11, 0.9));
			opacity: 0.2;
			transition: opacity 0.5s;
		}

		&__content {
			padding: 1.5rem;
			display: flex;
			flex-direction: column;
			gap: 1.25rem;
			flex: 1;
		}

		&__info {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}

		&__name {
			font-size: 1.25rem;
			font-weight: 900;
			color: #fff;
			line-height: 1.2;
			letter-spacing: -0.01em;
		}

		&__role {
			font-size: 0.75rem;
			font-weight: 800;
			color: #ff4081;
			text-transform: uppercase;
			letter-spacing: 0.1em;
			margin: 0;
			opacity: 0.9;
		}

		&__description {
			font-size: 0.9375rem;
			color: var(--muted-foreground);
			line-height: 1.6;
			margin: 0;
			opacity: 0.8;
			flex-grow: 1;
		}

		&__socials {
			display: flex;
			gap: 0.75rem;
			margin-top: auto;
		}

		&__social-link {
			width: 2.5rem;
			height: 2.5rem;
			display: flex;
			align-items: center;
			justify-content: center;
			background: rgba(255, 255, 255, 0.03);
			border: 1px solid rgba(255, 255, 255, 0.08);
			border-radius: 0.75rem;
			color: rgba(255, 255, 255, 0.4);
			transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

			&:hover {
				background: rgba(233, 30, 99, 0.1);
				border-color: rgba(233, 30, 99, 0.3);
				color: #ff4081;
				transform: translateY(-4px) scale(1.05);
			}

			:global(svg) {
				transition: transform 0.3s;
			}
		}

		&__glow {
			position: absolute;
			top: 20%;
			right: -10%;
			width: 200px;
			height: 200px;
			background: radial-gradient(circle, rgba(233, 30, 99, 0.1), transparent 70%);
			opacity: 0;
			transition: opacity 0.5s;
			pointer-events: none;
			z-index: 0;
		}
	}
</style>
