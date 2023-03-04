<script lang="ts">
  import type { Light } from '$lib/components/Light/Light';
  import type { GroupRow } from '$lib/components/GroupRow/GroupRow';
  /* import LightList from '$lib/components/LightList/LightList.svelte'; */
  import LightRowList from '$lib/components/LightRowList/LightRowList.svelte';
  import GroupRowList from '$lib/components/GroupRowList/GroupRowList.svelte';
  import type { PageData } from './$types';

  type Tab = 'lights' | 'rooms' | 'groups';

  export let data: PageData | { lights: Light[]; groups: GroupRow[] } = { lights: [], groups: [] };

  let lightData: Light[] = (data.lights as Light[])?.filter((light: Light) => !!light);
  let groupData: GroupRow[] = (data.groups as GroupRow[])?.filter((group: GroupRow) => !!group);
  let activeTab: Tab = 'lights';

  lightData = lightData ? lightData : [];
  groupData = groupData ? groupData : [];

  function handleLightsTabClick() {
    activeTab = 'lights';
  }
  function handleRoomsTabClick() {
    activeTab = 'rooms';
  }
  function handleGroupsTabClick() {
    activeTab = 'groups';
  }
</script>

<div class="tabs">
  <button
    on:click={handleLightsTabClick}
    class="tabs-bordered tab text-2xl text-primary {activeTab === 'lights'
      ? 'tab-active underline'
      : ''}"
  >
    Lights
  </button>
  <button
    on:click={handleRoomsTabClick}
    class="tabs-bordered tab text-2xl text-primary {activeTab === 'rooms'
      ? 'tab-active underline'
      : ''}"
  >
    Rooms
  </button>
  <button
    on:click={handleGroupsTabClick}
    class="tabs-bordered tab text-2xl text-primary {activeTab === 'groups'
      ? 'tab-active underline'
      : ''}"
  >
    Groups
  </button>
</div>

{#if activeTab === 'lights'}
  <LightRowList {lightData} />
{:else if activeTab === 'rooms'}
  <GroupRowList {groupData} />
{:else if activeTab === 'groups'}
  <GroupRowList {groupData} />
{/if}
