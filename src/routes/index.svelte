<script>
	import CreateQuote from '../components/CreateQuote.svelte';
	import NavBar from '../components/NavBar.svelte';
	import { navigating } from '$app/stores';
	import Loading from '../assets/loading.svg';
	import splitbee from '@splitbee/web';

	splitbee.init();
	splitbee.track("Create Quote");
	splitbee.track("Copy Quote");
</script>

<NavBar createQuoteSelected={true} />
<div class="container">
	{#if $navigating}
		<img src={Loading} class="loading" alt="loading" />
	{:else}
		<CreateQuote />
	{/if}
</div>

<style global>
	@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

	html,
	body {
		height: 100vh;
		width: 100%;
		margin: 0;
		padding: 0;
		display: flex;
		flex: 1 1 auto;
	}

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:root {
		--type-size: 14px;
		--secondary-type-size: 12px;
		--line-height: 1.6;
		--emoji-font: 'color-emoji';
		--default-font: 'Inter', sans-serif;
		--backgroundColor: #222;
		--inputBackgroundColor: #333;
		--inputBackgroundActiveColor: #444;
		--primaryBorderColor: #333;
		--secondaryBorderColor: #333;
		--backdrop: rgb(0 0 0/0.5);
		--transparentBorder: rgb(255 255 255/0.1);
		--grey1: #eee;
		--grey2: #aaa;
		--grey3: #777;
		--grey4: #444;
		--grey5: #333;
		--selectionColor: rgb(109 175 255/0.5);
	}

	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		background: var(--backgroundColor);
		flex: 1 1 auto;
	}

	.loading {
		margin: 0 auto;
		max-width: 100px;
		max-height: 100px;
	}
</style>
