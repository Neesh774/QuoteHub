<script lang="ts">
	export let json;

	function onSelect(e) {
		var reader = new FileReader();
		reader.onload = function (upload) {
			json = JSON.parse(upload.target.result as string);
		};
		reader.readAsText(e.target.files[0]);
	}
</script>

<input type="file" accept=".json" on:change={onSelect} />

<style>
	input {
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
		margin: 0 8px;
		width: 108px;
	}
	input::-webkit-file-upload-button {
		visibility: hidden;
	}
	input::before {
		content: 'Upload JSON';
		display: flex;
		justify-content: center;
	}
</style>
