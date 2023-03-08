<script lang="ts">
  import LightRow from '$lib/components/LightRow/LightRow.svelte';
  import type { Light } from '$lib/types/protocol';

  export let lightData: Light[] = [];
</script>

<div class="m-2 overflow-x-auto">
  <table class="table-zebra w-full">
    <thead>
      <tr class="text-xl text-secondary">
        <th>On/Off</th>
        <th>Id</th>
        <th>Name</th>
        <th>Type</th>
        <th>Color</th>
        <th>Brightness</th>
      </tr>
    </thead>
    <tbody>
      {#each lightData as light}
        <LightRow {light} />
      {/each}
    </tbody>
  </table>
</div>
