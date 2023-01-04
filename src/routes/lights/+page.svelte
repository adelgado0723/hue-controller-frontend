<script lang="ts">
	import type { iLight } from '$lib/Light';
	import LightList from '$lib/LightList.svelte';
	import type { PageData } from './$types';

	export let data: PageData | { lights: iLight[] } = { lights: [] };

	let lightData: iLight[] = (data.lights as iLight[])?.filter((light: iLight) => !!light);

	if (!lightData) {
		lightData = [];
	}
</script>

<h1 class="text-lg">Lights</h1>
<LightList {lightData} />
