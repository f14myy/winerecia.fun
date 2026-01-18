<script>
	import {
		History,
		ShoppingBag,
		CreditCard,
		ExternalLink,
		CheckCircle2,
		Clock
	} from 'lucide-svelte';
	import { fly, fade } from 'svelte/transition';

	let {
		purchases = [
			{ id: '1', item: 'Статус: VIP', date: '12.12.2025', price: 450, status: 'active' },
			{ id: '2', item: '10,000 Валюты', date: '05.12.2025', price: 100, status: 'completed' },
			{ id: '3', item: 'Кейс: Оружие x5', date: '01.12.2025', price: 750, status: 'completed' }
		]
	} = $props();
</script>

<div class="purchases-section">
	<div class="purchases-section__header" in:fly={{ y: -10, duration: 600 }}>
		<h2 class="font-heading purchases-section__title">История покупок</h2>
		<p class="purchases-section__subtitle">Управление вашими заказами и активными услугами</p>
	</div>

	<div class="purchases-section__grid">
		<div class="purchases-list" in:fly={{ y: 20, delay: 100, duration: 600 }}>
			{#each purchases as purchase}
				<div class="purchase-item">
					<div class="purchase-item__icon">
						{#if purchase.status === 'active'}
							<ShoppingBag size={20} />
						{:else}
							<CheckCircle2 size={20} />
						{/if}
					</div>
					<div class="purchase-item__info">
						<span class="purchase-item__name">{purchase.item}</span>
						<span class="purchase-item__date">{purchase.date}</span>
					</div>
					<div
						class="purchase-item__status"
						class:purchase-item__status--active={purchase.status === 'active'}
					>
						{purchase.status === 'active' ? 'Активно' : 'Выполнено'}
					</div>
					<div class="purchase-item__price">{purchase.price} ₽</div>
				</div>
			{/each}
		</div>

		<div class="cabinet-card promo-card" in:fly={{ x: 20, delay: 200, duration: 600 }}>
			<div class="promo-card__content">
				<span class="promo-card__icon"><CreditCard size={32} /></span>
				<h3 class="promo-card__title">Пополнить баланс</h3>
				<p class="promo-card__text">
					Получайте бонусы за каждое пополнение. Поддержите проект и развивайтесь быстрее!
				</p>
				<a href="/shop" class="btn btn-primary promo-card__btn"
					>В магазин <ExternalLink size={16} /></a
				>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.purchases-section {
		display: flex;
		flex-direction: column;
		gap: 2rem;

		&__header {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}

		&__title {
			font-size: 1.75rem;
			font-weight: 900;
			color: #fff;
		}

		&__subtitle {
			color: var(--muted-foreground);
		}

		&__grid {
			display: grid;
			grid-template-columns: 1fr 300px;
			gap: 1.5rem;

			@media (max-width: 1024px) {
				grid-template-columns: 1fr;
			}
		}
	}

	.purchases-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.purchase-item {
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 1rem;
		padding: 1rem 1.25rem;
		display: flex;
		align-items: center;
		gap: 1.25rem;
		transition: all 0.3s;

		@media (max-width: 640px) {
			flex-wrap: wrap;
			gap: 0.75rem 1rem;
			padding: 1.25rem;
		}

		&:hover {
			background: rgba(255, 255, 255, 0.05);
			transform: translateX(4px);
			border-color: rgba(233, 30, 99, 0.2);
		}

		&__icon {
			width: 2.5rem;
			height: 2.5rem;
			background: rgba(255, 255, 255, 0.03);
			border-radius: 0.75rem;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #ff4081;
			flex-shrink: 0;
		}

		&__info {
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
			flex: 1;
		}

		&__name {
			font-size: 1rem;
			font-weight: 800;
			color: #fff;
		}

		&__date {
			font-size: 0.85rem;
			color: var(--muted-foreground);
		}

		&__status {
			font-size: 0.75rem;
			font-weight: 800;
			padding: 0.35rem 0.75rem;
			background: rgba(255, 255, 255, 0.05);
			border-radius: 2rem;
			color: rgba(255, 255, 255, 0.5);

			&--active {
				background: rgba(74, 222, 128, 0.1);
				color: #4ade80;
				border: 1px solid rgba(74, 222, 128, 0.2);
			}

			@media (max-width: 640px) {
				order: 3;
				margin-left: 3.5rem;
			}
		}

		&__price {
			font-size: 1rem;
			font-weight: 900;
			color: #fff;
			font-family: var(--font-unbounded);
			min-width: 70px;
			text-align: right;

			@media (max-width: 640px) {
				flex: 1;
				text-align: right;
				font-size: 1.1rem;
			}
		}
	}

	.promo-card {
		background: linear-gradient(135deg, rgba(233, 30, 99, 0.1), rgba(233, 30, 99, 0.02));
		border: 1px solid rgba(233, 30, 99, 0.2);
		border-radius: 1.5rem;
		padding: 1.5rem;
		height: fit-content;

		&__content {
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
			gap: 1.25rem;
		}

		&__icon {
			color: #ff4081;
			margin-bottom: 0.5rem;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		&__title {
			font-size: 1.5rem;
			font-weight: 900;
			color: #fff;
		}

		&__text {
			color: var(--muted-foreground);
			line-height: 1.6;
			font-size: 0.95rem;
		}

		&__btn {
			width: 100%;
			height: 3.5rem;
			border-radius: 1.125rem;
			margin-top: 0.5rem;
			gap: 0.75rem;
		}
	}
</style>
