<script>
	import { supabase } from '../supabaseClient';
	import Loading from '../assets/loading_circle.svg';
	import StyleQuoteButton from './StyleQuoteButton.svelte';

	export let dateString = new Date().toLocaleDateString('en-CA');
	$: date = new Date(dateString);
	export let author = '';
	export let quote = '';
	let loading = false;
	export let showButtons = true;

	async function submit() {
		loading = true;
		const formatted = new Date(date).toString();
		const newQuote = {
			created: formatted,
			author: author.trim(),
			quote: quote.trim()
		};
		if (formatted.length < 1 || author.length < 1 || quote.length < 1) {
			alert('Please fill out all fields');
			loading = false;
			return;
		}
		const { data, error } = await supabase.from('quotes').insert(newQuote);
		if (error) {
			alert('There was an error. Please try again later.');
			console.log(error);
		} else {
			alert('Success!');
			author = '';
			quote = '';
			date = new Date();
		}
		loading = false;
	}
</script>

<div class="createQuote">
	<form>
		<div class="input">
			<div class="label">
				<label for="Quote">Quote</label>
			</div>
			<div class="textAreaWrap quote">
				<textarea
					maxlength={200}
					bind:value={quote}
					placeholder="I'm not superstitious, but I'm a little stitious"
				/>
			</div>
		</div>
		<div class="details">
			<div class="input">
				<div class="label">
					<label for="Date">Date</label>
				</div>
				<div class="calendar">
					<input type="date" bind:value={dateString} />
				</div>
			</div>
			<div class="input">
				<div class="label">
					<label for="author">Quotee</label>
				</div>
				<div class="inputWrap author">
					<input maxlength={30} bind:value={author} placeholder="Michael Scott" />
				</div>
			</div>
		</div>
		{#if showButtons}
			<div class="submit">
				<StyleQuoteButton id={'n'} />
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
		{/if}
	</form>
</div>

<style>
	.details {
		display: flex;
		justify-content: space-between;
		margin-top: 12px;
	}

	.textAreaWrap {
		padding: 7px 0;
		border-radius: 8px;
		background-color: var(--inputBackgroundColor);
		min-height: 104px;
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

	.label {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		margin-bottom: 2px;
		font-family: var(--default-font);
	}

	.loading {
		width: 20px;
	}

	label {
		font-size: var(--secondary-type-size);
		color: var(--grey2);
		display: block;
	}

	.calendar {
		position: relative;
		background-color: var(--inputBackgroundColor);
		border-radius: 8px;
		padding: 0 12px;
	}

	textarea {
		width: 100%;
		min-height: 104px;
		font-family: var(--default-font);
		line-height: var(--line-height);
		font-size: var(--type-size);
		border: none;
		outline: none;
		color: var(--grey1);
		resize: none;
		opacity: 1;
		background-color: transparent;
		padding: 0 12px;
		overflow-wrap: anywhere;
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

	input[type='date']::-webkit-calendar-picker-indicator {
		display: none;
	}
	input[type='date'] {
		cursor: pointer;
	}

	.submit {
		display: flex;
		justify-content: flex-end;
		margin-top: 12px;
	}

	.submit button {
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
	}

	.submit button:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	@media screen and (max-width: 768px) {
		.createQuote {
			width: 100%;
			margin: 0 auto;
			padding: 0 12px;
		}
		.textAreaWrap {
			width: 100%;
		}
		.details {
			flex-direction: column;
		}
		.calendar {
			margin-bottom: 12px;
		}
		.submit {
			margin-top: 12px;
		}
	}
</style>
