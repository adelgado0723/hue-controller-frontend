<script lang="ts">
	import type { Light } from '$lib/Light';
	import LightList from '$lib/LightList.svelte';
	import type { PageData } from './$types';

	export let data: PageData | { lights: Light[] } = { lights: [] };

	let lightData: Light[] = (data.lights as Light[])?.filter((light: Light) => !!light);

	if (!lightData) {
		lightData = [];
	}
</script>

<h1 class="text-lg">Lights</h1>
<LightList {lightData} />
