<script lang="ts">
	import type { light as iLight } from './+page.server';
	import LightList from './LightList.svelte';
	import type { PageData } from './$types';

	export let data: PageData | { lights: iLight[] } = { lights: [] };

	let lightData: iLight[] = (data.lights as iLight[])?.filter((light: iLight) => !!light)
		.map((light) => {
			return {
				name: light.name,
				id: light.id.toString(),
				type: light.type
			};
		});

	if (!lightData) {
		lightData = [];
	}
</script>

<h1 class="text-lg">Lights</h1>
<LightList {lightData} />
