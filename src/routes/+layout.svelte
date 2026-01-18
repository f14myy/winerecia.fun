<script>
	import { onMount } from 'svelte';
	import '../app.scss';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { data, children } = $props();

	const players = data?.players || 0;

	// Для тупых онмаунт когда страница загрузилась чтобы на сервере это нахуй не выполнить скажите жиир
	onMount(() => {
		const styles = 'color: #e91e63; font-weight: bold; font-size: 14px; font-family: sans-serif;';
		console.log('%cВ Екатеринбурге траур и беда,', styles);
		console.log('%cИсчезла в точках всякая еда.', styles);
		console.log('%cКендал прошел, как жирный ураган,', styles);
		console.log('%cВсосав в себя весь местный ресторан.', styles);
		console.log('%c ', styles); // Ода павел твои ножки такие сочные ммм
		console.log('%cНи бургера, ни булки, ни котлет', styles);
		console.log('%c— На карте города фастфуда больше нет.', styles);
		console.log('%cТрещит асфальт под тяжестью пуза,', styles);
		console.log('%cТы для Земли — тяжелая обуза.', styles);
	});
</script>

<svelte:head>
	<title>Winerecia - Политический Minecraft Сервер | Войны, Экономика, PolitEngine</title>
	<meta
		name="description"
		content="Уникальный политический Minecraft сервер с живыми войнами, продуманной экономикой и системой PolitEngine. Создай свою нацию, веди войны, управляй экономикой!"
	/>
	<meta
		name="keywords"
		content="minecraft, политический сервер, войны, экономика, PolitEngine, нации, города"
	/>
	<meta property="og:title" content="Winerecia - Политический Minecraft Сервер" />
	<meta
		property="og:description"
		content="Демократия, диктатура или анархия – выбор за тобой! Создай свою нацию и выбери свой путь."
	/>
	<meta property="og:type" content="website" />
</svelte:head>

<Header {players} />
{@render children()}
<Footer />
