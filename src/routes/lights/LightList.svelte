<script lang="ts">
	import Light from './Light.svelte';

	let lights = [
		{ id: 1, name: 'Light 1' },
		{ id: 2, name: 'Light 2' }
	];
</script>

<div class="flex justify-center items-center flex-col gap-4 w-full">
	{#each lights as light}
		<Light {light} />
	{/each}
</div>
