<script>
	export let createQuoteSelected = true;
</script>

<div class="navbar">
	<h1>QuoteHub</h1>
	{#if !createQuoteSelected}
		<div class="inputWrap">
			<input class="search" placeholder="Search..." />
		</div>
	{/if}
	<div class="tabs">
		<button
			class={`tab ${createQuoteSelected ? 'selected' : ''}`}
			id="createQuoteTab"
			on:click={() => (createQuoteSelected = true)}>Create</button
		>
		<button
			class={`tab ${!createQuoteSelected ? 'selected' : ''}`}
			id="viewQuotesTab"
			on:click={() => (createQuoteSelected = false)}>View</button
		>
	</div>
</div>

<style>
	.navbar {
		background-color: #f2f2f2;
		height: 50px;
		width: 100%;
		position: fixed;
		top: 10px;
		left: 0;
		z-index: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: transparent;
		padding: 0 20px;
	}

	h1 {
		font-family: var(--default-font);
		color: white;
	}

	.tabs {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: var(--grey5);
		padding: 5px 8px;
		border-radius: 15px;
	}

	.tab {
		font-family: var(--default-font);
		padding: 6px;
		border-radius: 5px;
		cursor: pointer;
		border: none;
		outline: none;
		background-color: transparent;
		color: white;
		margin: 0 4px;
	}

	.tab:hover {
		background-color: var(--grey4);
	}

	.selected {
		background-color: var(--grey4);
	}

    .inputWrap {
        position: relative;
		display: flex;
		flex-direction: row;
		height: 36px;
		background-color: var(--inputBackgroundColor);
		border-radius: 8px;
		align-items: center;
		padding: 0 12px;
    }

    input {
        width: 100%;
		height: 36px;
		font-family: var(--default-font);
		font-size: var(--type-size);
		line-height: 36px;
		border: none;
		outline: none;
		color: var(--grey1);
		background-color: transparent;
		transition: box-shadow 0.2s ease;
    }
</style>
