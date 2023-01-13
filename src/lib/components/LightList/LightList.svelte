<script lang="ts">
	import Light from '$lib/components/Light/Light.svelte';
	import type { Light as ILight } from '$lib/components/Light/Light';

	export let lightData: ILight[] = [];
</script>

<div class="flex justify-center items-center flex-col gap-4 w-full">
	{#each lightData as light}
		<Light {light} />
	{/each}
</div>
