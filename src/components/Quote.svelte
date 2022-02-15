<script lang="ts">
	import Copy from '../assets/copy.svg';

	type Quote = {
		author: string;
		quote: string;
		created: string;
	};

	export let quote: Quote;

	$: formatted = () => {
		if (quote.quote.startsWith('"') && quote.quote.endsWith('"')) {
			return quote.quote;
		} else {
			return '"' + quote.quote + '"';
		}
	};
</script>

<div class="quote-container">
	<div class="quote">
		<h1>
			{formatted()}
		</h1>
		<div class="details">
			<cite>-{quote.author}</cite>
			<div class="details-footer">
				<span>{new Date(quote.created).toLocaleDateString()}</span>
				<button class="copy-quote" on:click={() => {
					navigator.clipboard.writeText(formatted() + "\n- " + quote.author);
					alert("Copied!");
				}}>
					<img src={Copy} alt="Copy Quote" />
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	.quote-container {
		display: inline-block;
		width: 100%;
	}

	.quote {
		background-color: var(--inputBackgroundColor);
		border-radius: 12px;
		border: 1px solid var(--primaryBorderColor);
		padding: 1em;
		margin: 0 0 1.5em;
	}

	.details {
		display: flex;
		flex-direction: column;
	}

	.details-footer {
		display: flex;
		justify-content: space-between;
	}

	h1,
	cite,
	span {
		font-family: var(--default-font);
		color: var(--grey2);
	}

	h1 {
		overflow-wrap: break-word;
		font-size: 20px;
		margin-bottom: 6px;
	}

	cite {
		color: var(--grey3);
		margin-bottom: 12px;
		font-size: 18px;
		font-weight: bold;
	}

	span {
		color: var(--grey3);
		font-size: 16px;
	}

	.copy-quote {
		width: 20px;
		height: 20px;
		outline: none;
		background: transparent;
		border: none;
		color: white;
		cursor: pointer;
	}

	@media screen and (max-width: 600px) {
		.quote {
			margin: 0 0 1em;
		}

		h1 {
			font-size: 18px;
		}

		cite {
			font-size: 16px;
		}

		span {
			font-size: 12px;
		}
	}
</style>
