<script>
	import { X, User, Mail, Tag, FileText, Crown, CheckCircle2, Terminal } from 'lucide-svelte';

	let { isOpen, product, amount, price, onClose, onConfirm } = $props();

	let nickname = $state('');
	let email = $state('');
	let promoCode = $state('');
	let agreedToTerms = $state(false);

	// Для товаров с вариантами (привилегии)
	let selectedVariant = $state(null);

	// Для валюты
	let currencyAmount = $state(0);

	// Вычисляемая цена
	const computedPrice = $derived(() => {
		if (!product) return 0;

		if (product.category === 'currency') {
			const pricePerUnit = product.pricePerUnit || 2;
			return currencyAmount * pricePerUnit;
		} else if (selectedVariant) {
			return selectedVariant.price;
		}
		return price;
	});

	// Инициализация при открытии модального окна
	$effect(() => {
		if (isOpen && product) {
			if (product.category === 'currency') {
				// Для валюты используем переданное количество или дефолтное
				currencyAmount = typeof amount === 'number' ? amount : product.defaultAmount || 100;
			} else if (product.variants) {
				// Для товаров с вариантами выбираем переданный вариант или первый доступный
				if (amount && amount.duration) {
					selectedVariant = amount;
				} else {
					selectedVariant = product.variants.find((v) => v.enabled) || product.variants[0];
				}
			}
		}
	});

	function handleSubmit() {
		if (!nickname || !email || !agreedToTerms) {
			alert('Пожалуйста, заполните все обязательные поля и согласитесь с офертой');
			return;
		}

		const finalAmount = product.category === 'currency' ? currencyAmount : selectedVariant;
		const finalPrice = computedPrice();

		onConfirm({
			nickname,
			email,
			promoCode,
			product,
			amount: finalAmount,
			price: finalPrice
		});
	}

	function handleCurrencyAmountChange(e) {
		const minAmount = product.minAmount || 1;
		const maxAmount = product.maxAmount || 10000;
		let value = parseInt(e.target.value) || minAmount;
		if (value < minAmount) value = minAmount;
		if (value > maxAmount) value = maxAmount;
		currencyAmount = value;
	}

	function handleClose() {
		nickname = '';
		email = '';
		promoCode = '';
		agreedToTerms = false;
		selectedVariant = null;
		currencyAmount = 0;
		onClose();
	}
</script>

{#if isOpen && product}
	<div
		class="modal-overlay"
		onclick={handleClose}
		role="button"
		tabindex="0"
		onkeydown={(e) => e.key === 'Escape' && handleClose()}
	>
		<div
			class="modal"
			onclick={(e) => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
			tabindex="-1"
		>
			<button class="modal__close" onclick={handleClose}>
				<X size={20} />
			</button>

			<div class="modal__content">
				<!-- Левая колонка: форма оплаты -->
				<div class="modal__left">
					<div class="modal__header">
						<img
							src={product.image}
							alt={product.name}
							class="modal__product-image"
							onerror={(e) => (e.currentTarget.src = '/shop/coin.png')}
						/>
						<div class="modal__product-info">
							<div class="modal__product-header-row">
								<h3 class="modal__product-name">{product.name}</h3>
								{#if product.variants?.some((v) => v.badge)}
									<div class="modal__premium-tag">
										<Crown size={12} fill="currentColor" />
										<span>Premium</span>
									</div>
								{/if}
							</div>
							<div class="modal__product-details">
								{#if product.category === 'currency'}
									<span class="modal__product-badge">{currencyAmount.toLocaleString()} шт.</span>
								{:else if selectedVariant}
									<span class="modal__product-badge">{selectedVariant.label}</span>
								{/if}
								<p class="modal__product-price">{computedPrice().toFixed(0)} ₽</p>
							</div>
						</div>
					</div>

					<div class="modal__divider"></div>

					{#if product.category === 'currency'}
						<!-- Выбор количества для валюты -->
						<div class="modal__variant-section">
							<h2 class="modal__section-title">Количество</h2>
							<div class="modal__currency-amount">
								<input
									class="modal__currency-input"
									value={currencyAmount}
									oninput={handleCurrencyAmountChange}
									min={product.minAmount || 1}
									max={product.maxAmount || 10000}
									placeholder="Кол-во"
									type="number"
								/>
								<span class="modal__currency-hint">
									{(product.minAmount || 1).toLocaleString()}-{(
										product.maxAmount || 10000
									).toLocaleString()} шт.
								</span>
							</div>
						</div>
						<div class="modal__divider"></div>
					{:else if product.variants}
						<!-- Выбор варианта для привилегий -->
						<div class="modal__variant-section">
							<h2 class="modal__section-title">Выберите срок</h2>
							<div class="modal__variants">
								{#each product.variants as variant}
									<button
										class="modal__variant"
										class:modal__variant--active={selectedVariant?.duration === variant.duration}
										class:modal__variant--disabled={!variant.enabled}
										onclick={() => variant.enabled && (selectedVariant = variant)}
										disabled={!variant.enabled}
										type="button"
									>
										{#if variant.badge}
											<span class="modal__variant-badge">{variant.badge}</span>
										{/if}
										<span class="modal__variant-label">{variant.label}</span>
										<span class="modal__variant-price">{variant.price.toFixed(0)} ₽</span>
										{#if variant.discount}
											<span class="modal__variant-discount">{variant.discount}</span>
										{/if}
									</button>
								{/each}
							</div>
						</div>
						<div class="modal__divider"></div>
					{/if}

					<h2 class="modal__section-title">Данные для покупки</h2>

					<form
						class="modal__form"
						onsubmit={(e) => {
							e.preventDefault();
							handleSubmit();
						}}
					>
						<div class="modal__field">
							<label class="modal__label" for="nickname">
								Игровой ник <span class="modal__required">*</span>
							</label>
							<div class="modal__input-wrapper">
								<User size={18} />
								<input
									type="text"
									id="nickname"
									class="modal__input"
									bind:value={nickname}
									placeholder="Введите ваш ник"
									required
								/>
							</div>
						</div>

						<div class="modal__field">
							<label class="modal__label" for="email">
								EMAIL <span class="modal__required">*</span>
							</label>
							<div class="modal__input-wrapper">
								<Mail size={18} />
								<input
									type="email"
									id="email"
									class="modal__input"
									bind:value={email}
									placeholder="example@mail.com"
									required
								/>
							</div>
						</div>

						<div class="modal__field">
							<label class="modal__label" for="promo"> ПРОМОКОД </label>
							<div class="modal__input-wrapper">
								<Tag size={18} />
								<input
									type="text"
									id="promo"
									class="modal__input"
									bind:value={promoCode}
									placeholder="Введите промокод (необязательно)"
								/>
							</div>
						</div>

						<label class="modal__checkbox">
							<div class="checkbox-wrapper">
								<input type="checkbox" id="terms" bind:checked={agreedToTerms} required />
								<div class="checkbox-custom"></div>
							</div>
							<span>
								Я согласен с <a href="/oferta.pdf" target="_blank">договором оферты</a>
							</span>
						</label>

						<button
							type="submit"
							class="modal__submit"
							disabled={!agreedToTerms || !nickname || !email}
						>
							Оплатить {computedPrice().toFixed(0)} р
						</button>
					</form>
				</div>

				<!-- Правая колонка: описание -->
				<div class="modal__right">
					<h2 class="modal__description-title">Описание</h2>
					{#if product.description}
						<p class="modal__description-text">{product.description}</p>
					{/if}

					{#if product.features}
						<h3 class="modal__features-title">Возможности</h3>
						<ul class="modal__features-list">
							{#each product.features as feature}
								<li>
									<CheckCircle2 size={16} />
									<span>{feature}</span>
								</li>
							{/each}
						</ul>
					{/if}

					{#if product.commands}
						<h3 class="modal__commands-title">Команды</h3>
						<ul class="modal__commands-list">
							{#each product.commands as command}
								<li>
									<Terminal size={16} />
									<code>{command}</code>
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.modal-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.8);
		backdrop-filter: blur(8px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: 1rem;
		animation: fadeIn 0.2s ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.modal {
		background: rgba(14, 8, 11, 0.85);
		backdrop-filter: blur(40px);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 2.5rem;
		max-width: 1000px;
		width: 100%;
		max-height: 90vh;
		overflow: hidden;
		position: relative;
		box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.6);
		animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
		display: flex;
		flex-direction: column;

		&__close {
			position: absolute;
			top: 1.5rem;
			right: 1.5rem;
			width: 2.5rem;
			height: 2.5rem;
			background: rgba(255, 255, 255, 0.03);
			border: 1px solid rgba(255, 255, 255, 0.08);
			color: rgba(255, 255, 255, 0.4);
			cursor: pointer;
			transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
			border-radius: 0.75rem;
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 10;

			&:hover {
				color: #fff;
				background: rgba(233, 30, 99, 0.1);
				border-color: rgba(233, 30, 99, 0.3);
				transform: rotate(90deg) scale(1.1);
			}
		}

		&__content {
			display: grid;
			grid-template-columns: 1.1fr 0.9fr;
			gap: 0;
			flex: 1;
			overflow: hidden;

			@media (max-width: 968px) {
				grid-template-columns: 1fr;
				overflow-y: auto;
			}
		}

		&__left {
			padding: 3rem;
			border-right: 1px solid rgba(255, 255, 255, 0.05);
			overflow-y: auto;

			@media (max-width: 968px) {
				padding: 2rem;
				border-right: none;
				border-bottom: 1px solid rgba(255, 255, 255, 0.05);
			}
		}

		&__right {
			padding: 3rem;
			background: rgba(233, 30, 99, 0.02);
			overflow-y: auto;

			@media (max-width: 968px) {
				padding: 2rem;
			}
		}

		&__header {
			display: flex;
			gap: 1.25rem;
			align-items: flex-start;
			margin-bottom: 1.5rem;
		}

		&__product-image {
			width: 90px;
			height: 90px;
			object-fit: cover;
			border-radius: 1.25rem;
			border: 1px solid rgba(255, 255, 255, 0.1);
			flex-shrink: 0;
			box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
		}

		&__product-info {
			flex: 1;
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}

		&__product-header-row {
			display: flex;
			align-items: center;
			gap: 1rem;
			flex-wrap: wrap;
		}

		&__premium-tag {
			padding: 0.4rem 0.75rem;
			background: rgba(233, 30, 99, 0.1);
			backdrop-filter: blur(10px);
			border: 1px solid rgba(233, 30, 99, 0.2);
			border-radius: 2rem;
			display: flex;
			align-items: center;
			gap: 0.4rem;
			color: #ff4081;
			font-size: 0.7rem;
			font-weight: 800;
			text-transform: uppercase;
			letter-spacing: 0.05em;
		}

		&__product-name {
			font-size: 1.5rem;
			font-weight: 900;
			color: #fff;
			line-height: 1.2;
			margin: 0;
			font-family: var(--font-unbounded);
		}

		&__product-details {
			display: flex;
			align-items: center;
			gap: 1rem;
		}

		&__product-badge {
			display: inline-block;
			padding: 0.5rem 1rem;
			background: rgba(255, 255, 255, 0.05);
			border: 1px solid rgba(255, 255, 255, 0.1);
			border-radius: 2rem;
			font-size: 0.8125rem;
			font-weight: 800;
			color: rgba(255, 255, 255, 0.9);
			text-transform: uppercase;
			letter-spacing: 0.05em;
			white-space: nowrap;
		}

		&__product-price {
			font-size: 1.75rem;
			font-weight: 900;
			background: linear-gradient(135deg, #fff 0%, #ff4081 100%);
			-webkit-background-clip: text;
			background-clip: text;
			color: transparent;
			margin: 0;
			line-height: 1;
			font-family: var(--font-unbounded);
		}

		&__divider {
			height: 1px;
			background: rgba(255, 255, 255, 0.1);
			margin: 1.5rem 0;
		}

		&__section-title {
			font-size: 0.85rem;
			font-weight: 800;
			color: rgba(255, 255, 255, 0.5);
			margin-bottom: 1.25rem;
			text-transform: uppercase;
			letter-spacing: 0.1em;
			display: flex;
			align-items: center;
			gap: 0.75rem;

			&::after {
				content: '';
				flex: 1;
				height: 1px;
				background: rgba(255, 255, 255, 0.05);
			}
		}

		&__form {
			display: flex;
			flex-direction: column;
			gap: 1.5rem;
		}

		&__field {
			display: flex;
			flex-direction: column;
			gap: 0.75rem;
		}

		&__label {
			font-size: 0.85rem;
			font-weight: 700;
			color: rgba(255, 255, 255, 0.9);
			text-transform: uppercase;
			letter-spacing: 0.08em;
			padding-left: 0.25rem;
		}

		&__required {
			color: var(--accent);
		}

		&__input-wrapper {
			display: flex;
			align-items: center;
			gap: 1rem;
			padding: 0 1.25rem;
			background: rgba(255, 255, 255, 0.03);
			border: 1px solid rgba(255, 255, 255, 0.08);
			border-radius: 1.125rem;
			transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

			&:focus-within {
				border-color: rgba(233, 30, 99, 0.5);
				background: rgba(233, 30, 99, 0.05);
				box-shadow: 0 0 20px rgba(233, 30, 99, 0.1);
				transform: translateY(-2px);

				:global(svg) {
					color: #ff4081;
					opacity: 1;
				}
			}

			:global(svg) {
				color: rgba(255, 255, 255, 0.5);
				transition: all 0.3s;
				flex-shrink: 0;
			}
		}

		&__input {
			flex: 1;
			padding: 1rem 0;
			background: transparent;
			border: none;
			color: #fff;
			font-size: 0.95rem;
			font-weight: 500;

			&:focus {
				outline: none;
			}

			&::placeholder {
				color: rgba(255, 255, 255, 0.15);
			}
		}

		&__checkbox {
			display: flex;
			align-items: flex-start;
			gap: 1rem;
			cursor: pointer;
			user-select: none;
			margin: 0.5rem 0;

			.checkbox-wrapper {
				position: relative;
				width: 1.25rem;
				height: 1.25rem;
				flex-shrink: 0;
				margin-top: 0.125rem;

				input {
					position: absolute;
					opacity: 0;
					cursor: pointer;
					height: 0;
					width: 0;

					&:checked ~ .checkbox-custom {
						background: #ff4081;
						border-color: #ff4081;
						&::after {
							display: block;
						}
					}
				}

				.checkbox-custom {
					position: absolute;
					top: 0;
					left: 0;
					height: 1.25rem;
					width: 1.25rem;
					background: rgba(255, 255, 255, 0.05);
					border: 1px solid rgba(255, 255, 255, 0.1);
					border-radius: 6px;
					transition: all 0.3s;

					&::after {
						content: '';
						position: absolute;
						display: none;
						left: 6px;
						top: 2px;
						width: 5px;
						height: 10px;
						border: solid white;
						border-width: 0 2.5px 2.5px 0;
						transform: rotate(45deg);
					}
				}
			}

			span {
				font-size: 0.85rem;
				color: var(--muted-foreground);
				line-height: 1.6;

				a {
					color: #ff4081;
					text-decoration: none;
					font-weight: 700;

					&:hover {
						text-decoration: underline;
					}
				}
			}
		}

		&__submit {
			width: 100%;
			height: 4rem;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 0.75rem;
			background: var(--gradient-primary);
			border: none;
			border-radius: 1.25rem;
			color: #fff;
			font-weight: 800;
			font-size: 1.1rem;
			cursor: pointer;
			transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
			margin-top: 1rem;
			box-shadow: 0 15px 30px -5px rgba(233, 30, 99, 0.4);

			&:hover:not(:disabled) {
				transform: translateY(-3px) scale(1.02);
				box-shadow: 0 20px 40px -5px rgba(233, 30, 99, 0.5);
			}

			&:active:not(:disabled) {
				transform: translateY(0) scale(0.98);
			}

			&:disabled {
				opacity: 0.4;
				cursor: not-allowed;
				box-shadow: none;
			}
		}

		&__variant-section {
			margin-bottom: 0.5rem;
		}

		&__variants {
			display: flex;
			flex-direction: row;
			gap: 0.75rem;
			flex-wrap: wrap;
		}

		&__variant {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 0.25rem;
			padding: 0.75rem 0.5rem;
			background: rgba(255, 255, 255, 0.02);
			border: 1px solid rgba(255, 255, 255, 0.05);
			border-radius: 1.125rem;
			cursor: pointer;
			transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
			position: relative;
			flex: 1;
			min-width: 90px;

			&:hover:not(&--disabled) {
				background: rgba(255, 255, 255, 0.05);
				border-color: rgba(255, 255, 255, 0.1);
				transform: translateY(-2px);
			}

			&--active {
				background: rgba(233, 30, 99, 0.1);
				border-color: rgba(233, 30, 99, 0.4);
				box-shadow: 0 10px 20px rgba(233, 30, 99, 0.1);

				.modal__variant-label {
					color: #fff;
				}
			}

			&--disabled {
				opacity: 0.2;
				cursor: not-allowed;
			}
		}

		&__variant-badge {
			position: absolute;
			top: -8px;
			right: -8px;
			background: linear-gradient(135deg, #e91e63, #ff6090);
			color: white;
			font-size: 0.625rem;
			font-weight: 800;
			padding: 0.25rem 0.5rem;
			border-radius: 6px;
			text-transform: uppercase;
			letter-spacing: 0.5px;
			box-shadow: 0 2px 8px rgba(233, 30, 99, 0.4);
			z-index: 2;
			white-space: nowrap;
		}

		&__variant-label {
			font-size: 0.9375rem;
			font-weight: 700;
			color: var(--foreground);
			position: relative;
			z-index: 1;
		}

		&__variant-price {
			font-size: 1rem;
			font-weight: 800;
			color: #fff;
			position: relative;
			z-index: 1;
		}

		&__variant-discount {
			font-size: 0.75rem;
			font-weight: 700;
			color: #4ade80;
			background: rgba(74, 222, 128, 0.1);
			padding: 0.125rem 0.375rem;
			border-radius: 4px;
			position: relative;
			z-index: 1;
		}

		&__currency-amount {
			display: flex;
			align-items: center;
			gap: 1rem;
		}

		&__currency-input {
			width: 120px;
			padding: 1rem;
			background: rgba(255, 255, 255, 0.03);
			border: 1px solid rgba(255, 255, 255, 0.08);
			border-radius: 1.125rem;
			color: #fff;
			font-size: 1.125rem;
			font-weight: 700;
			text-align: center;
			transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

			&:focus {
				outline: none;
				border-color: rgba(233, 30, 99, 0.5);
				background: rgba(233, 30, 99, 0.05);
				box-shadow: 0 0 20px rgba(233, 30, 99, 0.1);
				transform: translateY(-2px);
			}

			&::-webkit-inner-spin-button,
			&::-webkit-outer-spin-button {
				opacity: 0.5;
				filter: invert(1);
			}
		}

		&__currency-hint {
			font-size: 0.875rem;
			color: var(--muted-foreground);
			font-weight: 500;
		}

		// Правая панель с описанием
		&__description-title {
			font-size: 1.75rem;
			font-weight: 900;
			color: #fff;
			margin: 0 0 1.5rem;
			padding-bottom: 1rem;
			border-bottom: 1px solid rgba(255, 255, 255, 0.1);
			font-family: var(--font-unbounded);
			letter-spacing: -0.02em;
		}

		&__description-text {
			font-size: 1rem;
			color: var(--muted-foreground);
			line-height: 1.6;
			margin: 0 0 2rem;
		}

		&__features-title,
		&__commands-title {
			font-size: 1rem;
			font-weight: 800;
			color: #fff;
			margin: 2rem 0 1.25rem;
			display: flex;
			align-items: center;
			gap: 0.75rem;
			font-family: var(--font-unbounded);

			&::before {
				content: '';
				width: 3px;
				height: 1rem;
				background: var(--gradient-primary);
				border-radius: 2px;
			}
		}

		&__features-list,
		&__commands-list {
			list-style: none;
			padding: 0;
			margin: 0;
			display: flex;
			flex-direction: column;
			gap: 1rem;

			li {
				display: flex;
				align-items: flex-start;
				gap: 0.75rem;
				color: rgba(255, 255, 255, 0.7);
				line-height: 1.5;
				font-size: 0.95rem;

				:global(svg) {
					color: #ff4081;
					flex-shrink: 0;
					margin-top: 0.1rem;
					opacity: 0.8;
				}

				code {
					background: rgba(233, 30, 99, 0.08);
					border: 1px solid rgba(233, 30, 99, 0.15);
					padding: 0.2rem 0.5rem;
					border-radius: 0.5rem;
					font-family: var(--font-mono, monospace);
					font-size: 0.85rem;
					color: #ff4081;
				}
			}
		}
	}
</style>
