<script lang="ts">
	import { textColorOptions, bgColorOptions } from '../assets/options.json';

	export let colorIndex = 0;
	export let type: 'text' | 'bg' = 'text';
	export let title = 'Color';
</script>

<div class="colorWrap">
	<div class="label">
		<label for={title}>{title}</label>
	</div>
	<div class="picker">
		{#each type == 'text' ? textColorOptions : bgColorOptions as color, i}
			<div class="color">
				<div class="colorChoiceWrap" style={`background-color: ${color.color}`}>
					<button
						style={`background-color: ${color.color};`}
						on:click={() => (colorIndex = i)}
						id={color.colorName}
						class={`colorChoice ${colorIndex == i ? 'active' : ''}`}
					/>
				</div>
				<label for={color.colorName} />
			</div>
		{/each}
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

	button {
		border-radius: 50%;
		width: 30px;
		height: 30px;
		border: none;
		outline: none;
		cursor: pointer;
	}

	.picker {
		display: flex;
		margin: 0.4rem 0 0.2rem;
	}

	.colorChoiceWrap {
		border-radius: 50%;
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 0.5rem;
		cursor: pointer;
	}
	.colorWrap {
		margin-top: 4px;
	}

	.active {
		width: 25px;
		height: 25px;
		border: 3px solid var(--backgroundColor);
		transition: ease-in-out 0.2s;
	}

	@media screen and (max-width: 768px) {
		button {
			width: 25px;
			height: 25px;
		}
		.colorChoiceWrap {
			width: 25px;
			height: 25px;
		}
		.active {
			width: 20px;
			height: 20px;
			border-width: 2.5px;
		}
	}
</style>
