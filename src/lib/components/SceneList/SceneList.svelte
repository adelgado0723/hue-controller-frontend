<script lang="ts">
	import Scene from '$lib/components/Scene/Scene.svelte';
	import type { Scene as IScene } from '$lib/components/Scene/Scene';

	export let sceneData: IScene[] = [];
</script>

<div class="flex justify-center items-center flex-col gap-4 w-full">
	{#each sceneData as scene}
		<Scene {scene} />
	{/each}
</div>
