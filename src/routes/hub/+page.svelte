<script lang="ts">
  import type { Light } from '$lib/components/Light/Light';
  import LightRowList from '$lib/components/LightRowList/LightRowList.svelte';
  import GroupRowList from '$lib/components/GroupRowList/GroupRowList.svelte';
  import type { PageData } from './$types';
  import type { Groups } from '$lib/types/protocol';

  type Tab =
    | 'all'
    | 'rooms'
    | 'zones'
    | 'lightGroups'
    | 'lightSources'
    | 'luminaires'
    | 'entertainment';
  export let data: PageData | { lights: Light[]; groups: Groups[] } = { lights: [], groups: [] };

  let lightData: Light[] = (data?.lights as Light[])?.filter((light: Light) => !!light) || [];
  let groupData: Groups | null = data.groups;
  let activeTab: Tab = 'all';

  const roomsDataExists = !!groupData?.rooms && groupData.rooms.length > 0;
  const zonesDataExists = !!groupData?.zones && groupData.zones.length > 0;
  const lightGroupsDataExists = !!groupData?.lightGroups && groupData.lightGroups.length > 0;
  const lightSourcesDataExists = !!groupData?.lightSources && groupData.lightSources.length > 0;
  const luminairesDataExists = !!groupData?.luminaires && groupData.luminaires.length > 0;
  const entertainmentDataExists = !!groupData?.entertainment && groupData.entertainment.length > 0;

  function handleTabClick(tab: Tab) {
    activeTab = tab;
  }
</script>

<div class="tabs">
  <button
    on:click={() => {
      handleTabClick('all');
    }}
    class="tabs-bordered tab text-2xl text-primary {activeTab === 'all'
      ? 'tab-active underline'
      : ''}"
  >
    All
  </button>
  {#if roomsDataExists}
    <button
      on:click={() => {
        handleTabClick('rooms');
      }}
      class="tabs-bordered tab text-2xl text-primary {activeTab === 'rooms'
        ? 'tab-active underline'
        : ''}"
    >
      Rooms
    </button>
  {/if}
  {#if zonesDataExists}
    <button
      on:click={() => {
        handleTabClick('zones');
      }}
      class="tabs-bordered tab text-2xl text-primary {activeTab === 'zones'
        ? 'tab-active underline'
        : ''}"
    >
      Zones
    </button>
  {/if}
  {#if lightGroupsDataExists}
    <button
      on:click={() => {
        handleTabClick('lightGroups');
      }}
      class="tabs-bordered tab text-2xl text-primary {activeTab === 'lightGroups'
        ? 'tab-active underline'
        : ''}"
    >
      Light Groups
    </button>
  {/if}
  {#if lightSourcesDataExists}
    <button
      on:click={() => {
        handleTabClick('lightSources');
      }}
      class="tabs-bordered tab text-2xl text-primary {activeTab === 'lightSources'
        ? 'tab-active underline'
        : ''}"
    >
      Light Sources
    </button>
  {/if}
  {#if luminairesDataExists}
    <button
      on:click={() => {
        handleTabClick('luminaires');
      }}
      class="tabs-bordered tab text-2xl text-primary {activeTab === 'luminaires'
        ? 'tab-active underline'
        : ''}"
    >
      Luminaires
    </button>
  {/if}
  {#if entertainmentDataExists}
    <button
      on:click={() => {
        handleTabClick('entertainment');
      }}
      class="tabs-bordered tab text-2xl text-primary {activeTab === 'entertainment'
        ? 'tab-active underline'
        : ''}"
    >
      Entertainment
    </button>
  {/if}
</div>

{#if activeTab === 'all'}
  <LightRowList {lightData} />
{:else if activeTab === 'rooms' && roomsDataExists}
  <GroupRowList groupData={groupData?.rooms} />
{:else if activeTab === 'zones' && zonesDataExists}
  <GroupRowList groupData={groupData?.zones} />
{:else if activeTab === 'lightGroups' && lightGroupsDataExists}
  <GroupRowList groupData={groupData?.lightGroups} />
{:else if activeTab === 'lightSources' && lightSourcesDataExists}
  <GroupRowList groupData={groupData?.lightSources} />
{:else if activeTab === 'luminaires' && luminairesDataExists}
  <GroupRowList groupData={groupData?.luminaires} />
{:else if activeTab === 'entertainment' && entertainmentDataExists}
  <GroupRowList groupData={groupData?.entertainment} />
{/if}
