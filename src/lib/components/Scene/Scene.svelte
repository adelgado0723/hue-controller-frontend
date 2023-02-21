<script lang="ts">
	import type { Scene } from '$lib/components/Scene/Scene';

	export let scene: Partial<Scene> = {};
</script>

<div class="card w-96 bg-neutral text-neutral-content">
	<div class="card-body items-center text-center">
		<h2 class="card-title">{scene.name}</h2>
		<p>name: {scene.name}</p>
		<p>id: {scene.id}</p>
		<p>type: {scene.type}</p>
		<p>image: {scene.image}</p>
		<p>group: {scene.group}</p>
		<p>recycle: {scene.recycle}</p>
		<p>locked: {scene.locked}</p>
		<p>owner: {scene.owner}</p>
		<p>version: {scene.version}</p>
		<p>lights: {JSON.stringify(scene.lights, null, 2)}</p>
		<p>last updated: {scene.lastUpdated}</p>
	</div>
</div>
