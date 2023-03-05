<script lang="ts">
  import Light from '$lib/components/Light/Light.svelte';
  import type { Light as ILight } from '$lib/types/protocol';

  export let lightData: ILight[] = [];
</script>

<div class="flex w-full flex-col items-center justify-center gap-4">
  {#each lightData as light}
    <Light {light} />
  {/each}
</div>
