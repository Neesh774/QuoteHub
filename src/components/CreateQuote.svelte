<script>
	import { supabase } from '../supabaseClient';

	let date = new Date().toLocaleDateString('en-CA');
	let author = '';
	let quote = '';

	async function submit() {
		const formatted = new Date(date).getMilliseconds;
		const newQuote = {
			date: formatted,
			author: author.trim(),
			quote: quote.trim()
		};
		if (date.length < 1 || author.length < 1 || quote.length < 1) {
			alert('Please fill out all fields');
			return;
		}
		const { data, error } = await supabase.from('quotes').insert(newQuote);
		alert('Success!');
	}
</script>

<div class="createQuote">
	<form>
		<div class="input">
			<div class="label">
				<label for="textarea">Quote</label>
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
					<label for=".calendar">Date</label>
				</div>
				<div class="calendar">
					<input type="date" bind:value={date} />
				</div>
			</div>
			<div class="input">
				<div class="label">
					<label for=".author">Quotee</label>
				</div>
				<div class="inputWrap author">
					<input maxlength={30} bind:value={author} placeholder="Michael Scott" />
				</div>
			</div>
		</div>
		<div class="submit">
			<button on:click|preventDefault={submit}>Submit</button>
		</div>
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
		width: 500px;
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

	@media screen and (max-width: 768px) {
		.textAreaWrap {
			width: 100%;
		}
		.details {
			flex-direction: column;
		}
		.calendar {
			margin-top: 12px;
		}
		.inputWrap {
			margin-top: 12px;
		}
		.submit {
			margin-top: 12px;
		}
	}
</style>
