<script>
	import { fontOptions } from '../assets/options.json';
	export let selectedFont = 'Inter';
</script>

<div class="fontWrap">
	<div class="label">
		<label for="font">Font</label>
	</div>
	<div class="content">
		<div class="picker">
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
				><path
					d="M12.3536 6.35355C12.5488 6.15829 12.5488 5.84171 12.3536 5.64645C12.1583 5.45118 11.8417 5.45118 11.6464 5.64645L12.3536 6.35355ZM8 10L7.64645 10.3536C7.84171 10.5488 8.15829 10.5488 8.35355 10.3536L8 10ZM4.35355 5.64645C4.15829 5.45118 3.84171 5.45118 3.64645 5.64645C3.45118 5.84171 3.45118 6.15829 3.64645 6.35355L4.35355 5.64645ZM11.6464 5.64645L7.64645 9.64645L8.35355 10.3536L12.3536 6.35355L11.6464 5.64645ZM8.35355 9.64645L4.35355 5.64645L3.64645 6.35355L7.64645 10.3536L8.35355 9.64645Z"
					fill="#eee"
				/></svg
			>
			<select bind:value={selectedFont}>
				{#each fontOptions as font, i}
					<option value={font}>{font}</option>
				{/each}
			</select>
		</div>
		<p style={`font-family: ${selectedFont}`}>QuoteHub</p>
	</div>
</div>

<style>
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
	.picker {
		margin: 4px 0.5rem 0;
		background-color: var(--inputBackgroundColor);
		position: relative;
		width: 180px;
		border-radius: 8px;
	}
	select {
		height: 36px;
		border-radius: 8px;
		background-color: var(--inputBackgroundColor);
		border: none;
		outline: none;
		font-family: var(--font-family);
		color: var(--grey1);
		padding: 0 12px;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		font-size: var(--type-size);
		width: 180px;
	}
	select::-ms-expand {
		display: none;
	}
	svg {
		position: absolute;
		right: 10px;
		bottom: calc((36px - 16px) / 2);
		pointer-events: none;
	}
	.content {
		display: flex;
		align-items: center;
	}
	.content p {
		font-size: 24px;
		color: var(--grey1);
		margin-left: 0.5rem;
	}
	@media screen and (max-width: 768px) {
		.fontWrap {
			margin: 0 12px;
			margin-top: 12px;
		}

		.content p {
			font-size: 16px;
		}
		select {
			height: 30px;
			width: 140px;
		}
		.picker {
			width: 140px;
		}
		svg {
			bottom: calc((30px - 16px) / 2);
		}
	}
</style>
