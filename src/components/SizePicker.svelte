<script>
	export let width;
	export let height;
</script>

<div class="SizePickers">
	<div class="size-picker">
		<div class="label">
			<label for="Width">Width</label>
		</div>
		<div class="inputWrap">
			<input
				type="number"
				value={400}
				on:change={(e) => {
					let value = parseInt(e.target.value);
					if (value <= 500 && value > 200) {
						width = value;
					} else if (value > 500) {
						e.target.value = 500;
						width = 500;
					} else if (value <= 200) {
						e.target.value = 200;
						width = 200;
					}
				}}
			/>
		</div>
	</div>
	<div class="size-picker">
		<div class="label">
			<label for="Height">Height</label>
		</div>
		<div class="inputWrap">
			<input
				type="number"
                value={300}
				on:change={(e) => {
					let value = parseInt(e.target.value);
					if (value <= 400 && value > 100) {
						height = value;
					} else if (value > 400) {
						e.target.value = 400;
						height = 400;
					} else if (value <= 100) {
						e.target.value = 100;
						height = 100;
					}
				}}
			/>
		</div>
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

	.inputWrap {
		position: relative;
		display: flex;
		flex-direction: row;
		height: 36px;
		background-color: var(--inputBackgroundColor);
		border-radius: 8px;
		align-items: center;
		padding: 0 12px;
		width: 60px;
        margin: 4px 0.5rem 0;
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

	input::-webkit-inner-spin-button {
		appearance: none;
	}

	@media screen and (max-width: 768px) {
		.SizePickers {
			margin: 12px 12px 0;
		}
	}
</style>
