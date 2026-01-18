<script>
	import Hero from '$lib/components/main/Hero.svelte';
	import WhyUs from '$lib/components/main/WhyUs.svelte';
	import Differenses from '$lib/components/main/Differenses.svelte';
	import PolitEngine from '$lib/components/main/PolitEngine.svelte';

	let { data } = $props();

	const players = data?.players || 0;
	const maxplayers = data?.maxplayers || 0;
</script>

<main>
	<Hero {players} {maxplayers} />
	<WhyUs />
	<Differenses {maxplayers} />
	<PolitEngine />
</main>

<style lang="scss">
	main {
		min-height: 100vh;
		background-color: var(--background);
	}
</style>
