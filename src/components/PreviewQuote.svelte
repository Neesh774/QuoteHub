<script>
	import { textColorOptions, bgColorOptions } from '../assets/options.json';
	import { onMount } from 'svelte';
	import { Canvas, Layer, t } from 'svelte-canvas';
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
	export let width;
	export let height;

	$: render = ({ context, width, height }) => {
		//fill background with bgColor
		context.fillStyle = bgColor;
		context.fillRect(0, 0, width, height);
		//draw quote
		context.fillStyle = pColor;
		context.font = `bold 16px ${font}`;
		context.textAlign = 'center';
		context.textBaseline = 'middle';
		context.fillText(quote, width / 2, height / 2);
		//draw date
		context.fillStyle = sColor;
		context.font = `italic 12px ${font}`;
		context.textAlign = 'right';
		context.fillText(
			quote.length > 0 ? new Date(date).toLocaleDateString('en-CA') : '',
			width - 60,
			height / 2 + 40
		);
		//draw author
		context.fillStyle = sColor;
		context.font = `italic 13px ${font}`;
		context.textAlign = 'right';
		context.fillText(author.length > 0 ? '- ' + author : '', width - 60, height / 2 + 20);
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