<script>
	import Quote from '../components/Quote.svelte';
	import NavBar from '../components/NavBar.svelte';
	import { supabase } from '../supabaseClient';
	import Loading from '../assets/loading_circle.svg';
	import JSONFilePicker from '../components/JSONFilePicker.svelte';
	import JSONTextArea from '../components/JSONTextArea.svelte';

	let loading = false;

	let data;
	$: parsed = data
		? data.map((q) => ({
				quote: q.text,
				author: q.author,
				created: q.editedTimestamp ?? q.createdTimestamp
		  }))
		: [];

	function submit() {
		loading = true;
		supabase
			.from('quotes')
			.insert(parsed)
			.then(() => {
				alert(`Saved ${parsed.length} quotes`);
				window.location.href = '/';
			});
		loading = false;
	}

	let selectedInputForm = 0;
</script>

<div class="container">
	<NavBar selected={-1} />
	<div class="content">
		<section>
			<h2>Import</h2>
			<div class="tabWrapper">
				<div class="import-tabs">
					<button
						on:click={() => (selectedInputForm = 0)}
						class={`import-tab ${selectedInputForm == 0 ? 'selected' : ''}`}
					>
						Upload
					</button>
					<button
						on:click={() => (selectedInputForm = 1)}
						class={`import-tab ${selectedInputForm == 1 ? 'selected' : ''}`}
					>
						Paste
					</button>
				</div>
			</div>
			<div class="tabContent">
				{#if selectedInputForm == 0}
					<JSONFilePicker bind:json={data} />
				{:else if selectedInputForm == 1}
					<JSONTextArea bind:json={data} />
				{/if}
			</div>
		</section>
		{#if data && data.length > 0}
			<section>
				<h2>Preview</h2>
				<div class="quotes">
					{#each parsed as quote, i}
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
			</section>
		{/if}
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

	.container {
		flex-direction: column;
	}

	@media screen and (max-width: 768px) {
		.content {
			max-width: 90%;
		}
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

	.tabWrapper {
		display: flex;
		justify-content: center;
		margin-top: 16px;
	}
	.import-tabs {
		margin: auto;
		background: var(--grey5);
		padding: 5px 4px;
		border-radius: 6px;
	}

	.import-tab {
		font-family: var(--default-font);
		padding: 6px;
		border-radius: 5px;
		cursor: pointer;
		border: none;
		outline: none;
		background-color: transparent;
		color: white;
		margin: 0 4px;
		text-decoration: none;
		font-size: 14px;
	}

	.tabContent {
		display: flex;
		margin: auto;
		justify-content: center;
		align-items: center;
		min-height: calc(4rem);
	}

	.tab:hover {
		background-color: var(--grey4);
	}

	.selected {
		background-color: var(--grey4);
	}
</style>
