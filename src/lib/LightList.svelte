<script lang="ts">
	import Light from '$lib/Light.svelte';
	import type { Light as ILight } from './Light';

	export let lightData: ILight[] = [];
</script>

<div class="flex justify-center items-center flex-col gap-4 w-full">
	{#each lightData as light}
		<Light {light} />
	{/each}
</div>
