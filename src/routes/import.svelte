<script>
	import Quote from '../components/Quote.svelte';
	import NavBar from '../components/NavBar.svelte';
	import { supabase } from '../supabaseClient';
	import Loading from '../assets/loading_circle.svg';

	let loading = false;

	export let data;

	function submit() {
		loading = true;
		supabase
			.from('quotes')
			.insert(data)
			.then(() => {
				alert(`Saved ${data.length} quotes`);
				window.location.href = '/';
			});
		loading = false;
	}
</script>

<div class="container">
	<NavBar selected={-1} />
	<div class="content">
		<h2>Import</h2>
		<div class="quotes">
			{#each data as quote, i}
				<Quote {quote} />
			{/each}
		</div>
		<div class="buttons">
			<a href="/">Cancel</a>
			<button
				disabled={loading}
				data-splitbee-event="Create Quote"
				on:click|preventDefault={submit}
			>
				{#if loading}
					<img src={Loading} alt="Loading..." class="loading" />
				{:else}
					Submit
				{/if}
			</button>
		</div>
	</div>
</div>

<style global>
	@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

	body {
		background: var(--backgroundColor);
	}

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: var(--default-font);
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
		--content-padding: 16px;
	}

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	.loading {
		margin: 0 auto;
		max-width: 100px;
		max-height: 100px;
	}

	.content {
		max-width: 60%;
		margin: 0 auto 4rem;
	}

	.quotes {
		padding: 0 4rem;
		max-width: 100%;
		overflow-y: auto;
		max-height: calc(100vh - 103px - 7rem);
		margin: 0 auto;
	}

	.quotes-container {
		column-count: 3;
		column-gap: 1.3rem;
	}
	@media screen and (min-width: 1920px) {
		.quotes {
			padding: 0 4rem;
		}
		.quotes-container {
			column-count: 4;
		}
	}
	@media screen and (max-width: 761px) {
		.quotes {
			padding: 0 2rem;
		}
		.quotes-container {
			column-count: 2;
		}
	}

	@media screen and (max-width: 600px) {
		.quotes {
			padding: 0 0.5rem;
		}
		.quotes-container {
			column-count: 1;
		}
	}

	.empty-state {
		width: 300px;
		height: 300px;
		max-width: 800px;
		max-height: 600px;
		margin: 0 auto;
	}

	.empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	h2 {
		font-size: 20px;
		font-weight: 400;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		width: 100%;
		margin-right: 12px;
		margin-bottom: 16px;
		padding-bottom: 8px;
		border-bottom: 1px solid var(--secondaryBorderColor);
		color: var(--grey1);
	}

	.buttons {
		display: flex;
		justify-content: center;
		margin-top: 16px;
	}

	.buttons button,
	.buttons a {
		text-decoration: none;
		background-color: var(--inputBackgroundColor);
		border: none;
		outline: none;
		height: 32px;
		line-height: 32px;
		padding: 0 12px;
		font-weight: 500;
		font-family: var(--default-font);
		color: var(--grey1);
		border-radius: 8px;
		font-size: var(--type-size);
		position: relative;
		display: flex;
		align-items: center;
		white-space: nowrap;
		cursor: pointer;
		margin: 0 8px;
	}
</style>
