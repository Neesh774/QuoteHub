<script context="module">
	import { supabase } from '../supabaseClient';
	import EmptyState from '../empty_state.svg';

	export async function load() {
		const quotes = await supabase.from('quotes').select('*');
		return { props: { quotes } };
	}
</script>

<script>
	import Quote from './Quote.svelte';

	export let quotes = [];
</script>

<div class="quotes">
	{#if quotes.length > 0}
		{#each quotes as quote, id}
			<Quote {quote} />
		{/each}
	{:else}
		<div class="empty">
			<img src={EmptyState} alt="empty state" class="empty-state" />
			<h3>Couldn't find any quotes :(</h3>
		</div>
	{/if}
</div>

<style>
	.quotes {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
		max-width: 800px;
	}

	.empty-state {
		width: 300px;
		height: 300px;
		max-width: 800px;
		max-height: 600px;
		margin: 0 auto;
	}

	h3 {
		text-align: center;
		color: white;
        font-family: var(--default-font);
        font-weight: 500;
	}
</style>
