<script lang="ts">
  import GroupRow from '$lib/components/GroupRow/GroupRow.svelte';

  import type { GroupRow as IGroupRow } from '$lib/components/GroupRow/Group';
  /* import LightModal from '$lib/components/Modals/LightModal/LightModal.svelte'; */

  export let groupData: IGroupRow[] = [];
</script>

<div class="overflow-x-auto rounded-lg border-2 border-slate-400 shadow-lg">
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
      {#each groupData as group}
        <GroupRow {group} />
      {/each}
    </tbody>
  </table>
</div>
