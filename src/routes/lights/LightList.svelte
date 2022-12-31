<script lang="ts">
	import Light from '$lib/Light.svelte';
	import type { light } from './+page.server';

	/* export let lightData: { name: string; id: string; type: string }[]; */
	export let lightData: light[] = [];
</script>

<div class="flex justify-center items-center flex-col gap-4 w-full">
	{#each lightData as light}
		<Light {light} />
	{/each}
</div>
