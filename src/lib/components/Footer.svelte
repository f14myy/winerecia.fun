<script>
	import Brand from './footer/Brand.svelte';
	import NavSection from './footer/NavSection.svelte';
	import Links from './footer/Links.svelte';
	import MadeBy from './footer/MadeBy.svelte';

	const navLinks = [
		{ href: '/shop', label: 'Магазин' },
		{ href: '/we', label: 'Наша команда' },
		{ href: 'https://wiki.winerecia.fun', label: 'Вики' },
		{ href: 'https://map.winerecia.fun', label: 'Онлайн карта' },
		{ href: '#support', label: 'Тех. поддержка' }
	];

	const docLinks = [
		{ href: '/polit.pdf', label: 'Политика конфиденциальности' },
		{ href: '/oferta.pdf', label: 'Договор оферты' },
		{ href: '/rules', label: 'Правила сервера' }
	];

	const currentYear = new Date().getFullYear();
</script>

<footer class="footer">
	<div class="container">
		<div class="footer__grid">
			<Brand />

			<NavSection title="Навигация" links={navLinks} />

			<NavSection title="Документы" links={docLinks} />

			<Links />
		</div>

		<div class="footer__bottom">
			<div class="footer__copyright">
				© 2021-{currentYear} Winerecia. Все права защищены. НПД Савосик Назар Николаевич | ИНН: 110119992947
			</div>
			<div class="footer__legal"></div>
		</div>
	</div>
</footer>

<style lang="scss">
	.footer {
		padding: 5rem 1rem 3rem;
		background: linear-gradient(
			to top,
			rgba(233, 30, 99, 0.12),
			rgba(194, 24, 91, 0.05),
			var(--background)
		);
		border-top: 2px solid var(--border-light);
		position: relative;
		overflow: hidden;

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			height: 2px;
			background: var(--gradient-primary);
			opacity: 0.5;
		}

		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
			width: 600px;
			height: 600px;
			background: radial-gradient(circle, rgba(233, 30, 99, 0.08), transparent);
			border-radius: 50%;
			filter: blur(80px);
			pointer-events: none;
		}

		&__grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
			gap: 3rem;
			margin-bottom: 3rem;
			position: relative;
			z-index: 1;

			@media (min-width: 768px) {
				grid-template-columns: 1.5fr 1fr 1fr 1fr;
			}

			@media (max-width: 480px) {
				grid-template-columns: 1fr;
				gap: 2rem;
			}
		}

		&__bottom {
			padding-top: 2rem;
			border-top: 1px solid var(--border-light);
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 1rem;
			position: relative;
			z-index: 1;

			@media (min-width: 768px) {
				flex-direction: row;
				justify-content: space-between;
			}
		}

		&__copyright {
			font-size: 0.875rem;
			color: var(--muted-foreground);
			font-weight: 500;
		}

		&__legal {
			font-size: 0.875rem;
			color: var(--muted-foreground);
			font-weight: 500;
		}
	}
</style>
