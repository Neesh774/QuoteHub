<script context="module">
	import { supabase } from '../../supabaseClient';

	export async function load({ params }) {
		if (params.id == 'n')
			return {
				props: {
					quoteObj: {
						quote: '',
						author: '',
						created: new Date()
					}
				}
			};
		const { data, error } = await supabase.from('quotes').select('*').eq('id', params.id).single();

		if (error)
			return {
				props: {
					quoteObj: {
						quote: '',
						author: '',
						created: new Date()
					}
				}
			};

		return {
			props: {
				quoteObj: { quote: data.quote, author: data.author, created: new Date(data.created) }
			}
		};
	}
</script>

<script lang="ts">
	import NavBar from '../../components/NavBar.svelte';
	import CreateQuote from '../../components/CreateQuote.svelte';
	import ColorPicker from '../../components/ColorPicker.svelte';
	import FontPicker from '../../components/FontPicker.svelte';
	import SizePicker from '../../components/SizePicker.svelte';
	import PreviewQuote from '../../components/PreviewQuote.svelte';

	type Quote = {
		quote: string;
		author: string;
		created: Date;
		id: string;
	};

	export let quoteObj: Quote;
	let author = quoteObj.author;
	let quoteString = quoteObj.quote;
	let dateString = quoteObj.created.toLocaleDateString('en-CA');
	$: dateObj = new Date(dateString);

	let pTextColorIndex = 0;
	let sTextColorIndex = 1;
	let backgroundColorIndex = 1;

	let selectedFont = 'Inter';

	let width = 400;
	let height = 200;

	let canvasContext: CanvasRenderingContext2D;

	$: exportQuote = () => {
		// export canvasContext as image
		let dataURL = canvasContext.canvas.toDataURL();
		let a = document.createElement('a');
		a.href = dataURL;
		a.download = 'quote.png';
		a.click();
	}
</script>

<NavBar selected={2} />
<div class="styleContainer">
	<div class="wrapper">
		<section class="quote">
			<h2>Quote</h2>
			<CreateQuote bind:author bind:dateString bind:quote={quoteString} showButtons={false} />
		</section>
		<section class="style">
			<h2>Styling Options</h2>
			<div class="options">
				<div class="colors">
					<ColorPicker title="Primary Text Color" bind:colorIndex={pTextColorIndex} />
					<ColorPicker title="Secondary Text Color" bind:colorIndex={sTextColorIndex} />
					<ColorPicker title="Background Color" bind:colorIndex={backgroundColorIndex} type="bg" />
					<FontPicker bind:selectedFont />
					<SizePicker bind:width bind:height />
				</div>
			</div>
		</section>
		<section class="preview">
			<h2>Preview</h2>
			<div class="display">
				<PreviewQuote
					quote={quoteString}
					{author}
					date={dateObj}
					pColorIndex={pTextColorIndex}
					sColorIndex={sTextColorIndex}
					bgColorIndex={backgroundColorIndex}
					font={selectedFont}
					{width}
					{height}
					bind:canvasContext
				/>
			</div>
		</section>
		<section>
			<h2>Export</h2>
			<div class="export-options">
				<button class="twitter">
					Export to Twitter
				</button>
				<button class="export" on:click={exportQuote}>
					Export As PNG
				</button>
			</div>
		</section>
	</div>
</div>

<style global>
	@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

	body {
		background-color: var(--backgroundColor) !important;
		height: initial !important;
		width: initial !important;
		display: initial !important;
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

	.styleContainer {
		overflow-y: hidden;
	}

	section {
		margin: 36px 0;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		color: var(--grey1);
	}

	.wrapper {
		max-width: 540px;
		margin: 0 auto;
		padding: var(--content-padding) 0;
		grid-row-start: 1;
		grid-column-start: 1;
		width: 100%;
		overflow-y: auto;
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
	}

	.options {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.colors {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		margin-right: 12px;
	}

	.colorWrap {
		margin-bottom: 12px;
	}

	@media screen and (max-width: 768px) {
		.colors > div {
			margin: 0 12px;
		}
	}

	.export-options {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}

	.export-options button {
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
		margin-right: 12px;
	}
	.twitter {
		background-color: #1DA1F2 !important;
	}
</style>
