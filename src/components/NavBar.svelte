<script>
	import Favicon from '../assets/favicon.png';
	import Sparkles from '../assets/sparkles.svg';
	import { goto } from '$app/navigation';
	import Create from '../assets/create.svg';
	import Quotes from '../assets/quotes.svg';

	export let selected = 0;
	export let search = '';
</script>

<nav class="navbar">
	<div class="brand">
		{#if selected == 3}
			<img class="brand-logo-icon" src={Quotes} alt="Quotes" />
		{:else if selected == 2}
			<img class="brand-logo-icon" src={Sparkles} alt="Sparkles" />
		{:else}
			<img src={Favicon} alt="Favicon" />
		{/if}
		<h1>QuoteHub</h1>
	</div>
	{#if selected == 1}
		<div class="inputWrap">
			<input bind:value={search} class="search" placeholder="Search..." />
		</div>
	{/if}
	<div class="tabs">
		<a class={`tab ${selected == 0 ? 'selected' : ''}`} id="createQuoteTab" href="/"> Create </a>
		<a class={`tab ${selected == 1 ? 'selected' : ''}`} id="viewQuotesTab" href="/quotes">View </a>
		<a class={`tab ${selected == 2 ? 'selected' : ''}`} id="styleQuoteTab" href="/style/n"
			>Style
		</a>
	</div>
	<div class="tabs-mobile">
		{#if selected == 1 || selected == 2}
			<button class="tab-mobile" id="createQuoteTab" on:click={() => goto('/', { noscroll: true })}>
				<span>Create</span>
				<img src={Create} alt="Create" />
			</button>
		{:else if selected == 0}
			<button
				class="tab-mobile"
				id="viewQuotesTab"
				on:click={() => goto('/quotes', { noscroll: true })}
			>
				<span>View </span>
				<img src={Quotes} alt="Quotes" />
			</button>
		{/if}
	</div>
</nav>

<style>
	.navbar {
		height: 50px;
		width: 100%;
		z-index: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: var(--backgroundColor);
		padding: 0 20px;
	}

	.brand {
		display: flex;
		align-items: center;
		cursor: pointer;
	}

	.brand img {
		height: 40px;
		width: 40px;
		margin-right: 10px;
	}

	.brand .brand-logo-icon {
		border-radius: 8px;
		background-color: var(--inputBackgroundActiveColor);
		padding: 8px;
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
		padding: 5px 4px;
		border-radius: 6px;
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
		text-decoration: none;
		font-size: 14px;
	}
	.tabs-mobile {
		display: none;
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
		margin: 0 6px;
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

	@media screen and (max-width: 600px) {
		.brand h1 {
			display: none;
		}

		.tabs {
			display: none;
		}

		.tabs-mobile {
			display: block;
			fill: white;
			height: 36px;
		}

		.tab-mobile {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 36px;
			border-radius: 8px;
			background: var(--grey5);
			color: white;
			cursor: pointer;
			border: none;
			outline: none;
			padding: 8px;
		}

		.tab-mobile img {
			height: 20px;
			width: 20px;
			margin-left: 4px;
		}

		.navbar {
			padding: 0 10px;
		}
	}
</style>
