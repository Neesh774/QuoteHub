<script context="module">
	import { supabase } from '../supabaseClient';

	export async function load() {
		const { data, error } = await supabase.from('quotes').select('*');
		if (error) {
			return { props: { quotes: [] } };
		}
		return { props: { quotes: data } };
	}
</script>

<script>
	import Quote from '../components/Quote.svelte';
	import EmptyState from '../assets/empty_state.svg';
	import NavBar from '../components/NavBar.svelte';
	import { filter } from 'fuzzaldrin';

	export let quotes = [];
	let search = '';

	$: filtered = (search) => {
		const filteredQuotes = filter(quotes, search, { key: 'quote' });
		const filteredAuthors = filter(quotes, search, { key: 'author' });
		return [...new Set(filteredQuotes.concat(filteredAuthors))].reverse();
	};
</script>

<NavBar selected={1} bind:search />
<div class="container">
	<div class="quotes">
		{#if quotes.length > 0}
			<div class="quotes-container">
				{#if filtered(search).length > 0}
					{#each filtered(search) as quote}
						<Quote {quote} />
					{/each}
				{:else}
					{#each quotes as quote, id}
						<Quote {quote} />
					{/each}
				{/if}
			</div>
		{:else}
			<div class="empty">
				<img src={EmptyState} alt="empty state" class="empty-state" />
				<h3>Couldn't find any quotes :(</h3>
			</div>
		{/if}
	</div>
</div>

<style global>
	@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

	body {
		background: var(--backgroundColor);
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

	.container {
		overflow-y: hidden;
	}

	.quotes {
		padding: 0 4rem;
		max-width: 100%;
		overflow-y: auto;
		height: calc(100vh - 70px);
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

	h3 {
		text-align: center;
		color: white;
		font-family: var(--default-font);
		font-weight: 500;
	}
</style>
