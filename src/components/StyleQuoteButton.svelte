<script lang="ts">
	import Sparkles from '../assets/sparkles.svg';
	import { goto } from '$app/navigation';

	export let id: string = 'n';

	export let showText = true;
</script>

<a href={`/style/${id}`}>
	<img src={Sparkles} alt="Sparkles" />
	{#if showText}
		<span>Style</span>
	{/if}
</a>

<style>
	a {
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
		margin-right: 8px;
		text-decoration: none;
	}

	a img {
		margin-right: 0px;
		width: 20px;
		height: 20px;
	}
</style>
