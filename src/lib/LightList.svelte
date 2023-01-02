<script lang="ts">
	import Light from '$lib/Light.svelte';
	import type { iLight } from './Light';

	/* export let lightData: { name: string; id: string; type: string }[]; */
	export let lightData: iLight[] = [];
</script>

<div class="flex justify-center items-center flex-col gap-4 w-full">
	{#each lightData as light}
		<Light {light} />
	{/each}
</div>
