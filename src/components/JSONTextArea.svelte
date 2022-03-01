<script>
	export let json;
	let content = '';
	let jsonError = false;

	function handleChange() {
		try {
			const parsed = JSON.parse(content);
			if (parsed.length > 0) {
				json = parsed;
				jsonError = false;
			} else {
				jsonError = true;
			}
		} catch (e) {
			jsonError = true;
		}
	}
</script>

<div class="json-wrapper">
	<div class="label">
		<label for="textarea">Paste JSON</label>
		{#if jsonError}
			<span class="warning">Invalid JSON</span>
		{/if}
	</div>
	<div class={`textAreaWrap ${jsonError ? 'error' : ''}`}>
		<textarea bind:value={content} on:change={handleChange} />
	</div>
</div>

<style>
	.json-wrapper {
		width: 60%;
		margin: 2rem auto;
		min-height: 16rem;
	}
	.label {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-bottom: 4px;
	}
	label {
		font-size: var(--secondary-type-size);
		color: var(--grey2);
		display: block;
	}
	.warning {
		color: #f04848;
		font-size: var(--secondary-type-size);
	}
	.textAreaWrap {
		padding: 7px 0;
		border-radius: 8px;
		background-color: var(--inputBackgroundColor);
		min-height: 16rem;
		width: 100%;
		transition: ease-in-out 0.3s;
	}
	textarea {
		width: 100%;
		min-height: 16rem;
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
	.error {
		box-shadow: 0 0 0 2px #f04848;
	}
</style>
