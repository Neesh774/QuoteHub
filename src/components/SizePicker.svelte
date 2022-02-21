<script>
	export let width;
	export let height;
</script>

<div class="SizePickers">
	<div class="size-picker">
		<div class="label">
			<label for="Width">Width</label>
		</div>
		<input type="range" bind:value={width} max={500} min={200} />
	</div>
	<div class="size-picker">
		<div class="label">
			<label for="Height">Height</label>
		</div>
		<input type="range" bind:value={height} max={400} min={100} />
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

	.SizePickers {
		display: flex;
		margin-top: 12px;
	}

	.size-picker {
		display: flex;
		flex-direction: column;
		margin-right: 16px;
	}

	input[type='range'] {
		-webkit-appearance: none;
		width: 100%;
		height: 16px;
		background: var(--inputBackgroundColor);
		border-radius: 4px;
		outline: none;
        margin-top: 4px;
	}
	input[type='range']:focus {
		outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
	}

    input[type='range']::-webkit-slider-runnable-track {
        width: 100%;
        background: var(--inputBackgroundColor);
        border-radius: 4px;
    }

    input[type='range']::-webkit-slider-thumb {
        -webkit-appearance: none;
        border: none;
        height: 16px;
        width: 16px;
        border-radius: 4px;
        background: var(--grey3);
        cursor: pointer;
    }

	@media screen and (max-width: 768px) {
		.SizePickers {
			margin: 12px 12px 0;
		}
	}
</style>
