<script>
	let { title, links } = $props();
</script>

<div class="nav-section">
	<h4 class="nav-section__title">{title}</h4>
	<div class="nav-section__links">
		{#each links as link}
			<a
				href={link.href}
				class="nav-section__link"
				target={link.href.startsWith('http') ? '_blank' : undefined}
				rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
			>
				{link.label}
			</a>
		{/each}
	</div>
</div>

<style lang="scss">
	.nav-section {
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
			flex-direction: column;
			gap: 0.75rem;
		}

		&__link {
			color: var(--muted-foreground);
			text-decoration: none;
			transition: all 0.3s;
			display: inline-block;
			position: relative;
			padding-left: 0; // Убрал отступ, чтобы было по сетке

			&::before {
				content: '';
				position: absolute;
				left: -1rem; // Индикатор слева от ссылки
				top: 50%;
				transform: translateY(-50%) scaleX(0);
				width: 4px;
				height: 4px;
				border-radius: 50%;
				background: var(--accent);
				transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
				opacity: 0;
			}

			&:hover {
				color: var(--accent);
				transform: translateX(4px); // Тонкий сдвиг вместо паддинга

				&::before {
					opacity: 1;
					transform: translateY(-50%) scaleX(1);
				}
			}
		}
	}
</style>
