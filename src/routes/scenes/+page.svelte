<script lang="ts">
	import type { PageData } from './$types';
	import type { Scene } from '$lib/components/Scene/Scene';
	import SceneList from '$lib/components/SceneList/SceneList.svelte';

	export let data: PageData | { scenes: Scene[] } = { scenes: [] };

	let sceneData: Scene[] = (data.scenes as Scene[])?.filter((scene: Scene) => !!scene);

	if (!sceneData) {
		sceneData = [];
	}
</script>

<h1 class="text-lg text-primary">Scenes</h1>
<SceneList {sceneData} />
