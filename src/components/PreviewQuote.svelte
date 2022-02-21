<script>
	import { textColorOptions, bgColorOptions } from '../assets/options.json';
	import { Canvas, Layer } from 'svelte-canvas';
	import '../fonts.css';
	import canvasTxt from 'canvas-txt';

	export let quote;
	export let author;
	export let date;
	export let pColorIndex;
	$: pColor = textColorOptions[pColorIndex].color;
	export let sColorIndex;
	$: sColor = textColorOptions[sColorIndex].color;
	export let bgColorIndex;
	$: bgColor = bgColorOptions[bgColorIndex].color;
	export let font;
    export let fontSize;
	export let width;
	export let height;

	export let canvasContext = null;

	$: render = ({ context, width, height }) => {
		canvasContext = context;
		//fill background with bgColor
		context.fillStyle = bgColor;
		context.fillRect(0, 0, width, height);

		// QUOTE
		context.fillStyle = pColor;
		canvasTxt.fontSize = fontSize;
		canvasTxt.fontWeight = 'bold';
		canvasTxt.font = font;
		canvasTxt.drawText(context, quote, 20, 10, width - 40, height - 40);

		// DATE
		context.fillStyle = sColor;
		canvasTxt.fontSize = fontSize * 0.9;
		canvasTxt.fontWeight = 'italic';
		canvasTxt.align = 'right';
		canvasTxt.drawText(
			context,
			quote.length > 0 ? new Date(date).toLocaleDateString('en-CA') : '',
		    width - fontSize - fontSize * 10,
			0.8 * height,
			fontSize * 10,
			fontSize
		);

		// AUTHOR
		context.fillStyle = sColor;
		canvasTxt.fontSize = fontSize * 0.9;
		canvasTxt.fontWeight = 'italic';
		canvasTxt.drawText(
			context,
			author.length > 0 ? '- ' + author : '',
			width - fontSize - fontSize * 10,
			0.8 * height - fontSize,
			fontSize * 10,
			fontSize
		);
		canvasTxt.align = 'center';
	};
</script>

<div class="canvas-container">
	<Canvas style="margin: auto" {width} {height}>
		<Layer {render} />
	</Canvas>
</div>

<style>
	.canvas-container {
		border-radius: 8px;
		margin: auto;
		display: flex;
		overflow-x: auto;
	}
</style>
