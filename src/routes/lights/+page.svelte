<script lang="ts">
  import type { Light } from '$lib/types/protocol';
  /* import LightList from '$lib/components/LightList/LightList.svelte'; */
  import LightRowList from '$lib/components/LightRowList/LightRowList.svelte';
  import type { PageData } from './$types';

  export let data: PageData | { lights: Light[] } = { lights: [] };

  let lightData: Light[] = (data.lights as Light[])?.filter((light: Light) => !!light);

  if (!lightData) {
    lightData = [];
  }
</script>

<h2 class="m-2 text-3xl text-purple-400">Lights</h2>
<LightRowList {lightData} />
