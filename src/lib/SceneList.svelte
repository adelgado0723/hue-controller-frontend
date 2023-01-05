<script lang="ts">
	import Scene from '$lib/Scene.svelte';
	import type { Scene as IScene } from './Scene';

	export let sceneData: IScene[] = [];
</script>

<div class="flex justify-center items-center flex-col gap-4 w-full">
	{#each sceneData as scene}
		<Scene {scene} />
	{/each}
</div>
