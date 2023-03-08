<script lang="ts">
  import type { GroupRow } from '$lib/types/protocol';
  import type RequestInit from 'http';
  /* import LightModal from '$lib/components/Modals/LightModal/LightModal.svelte'; */
  import type { HueUpdateGroupRequest, HueUpdateGroupResponse } from '$lib/types/hue';

  import { PUBLIC_BRIDGE_IP, PUBLIC_BRIDGE_USERNAME } from '$env/static/public';
  import { error } from '@sveltejs/kit';

  export let group: GroupRow | null = null;

  let on = group?.action?.on;
  let brightness = group?.action?.bri;
  let withinRepeatInterval = false;
  const repeatIntervalMS = 150;

  async function updateGroupState(req: Partial<HueUpdateGroupRequest>) {
    if (!group || !group?.id) return;
    try {
      const opts: RequestInit = {
        method: 'PUT',
      };

      opts.body = JSON.stringify(req);
      const res = await fetch(
        `http://${PUBLIC_BRIDGE_IP}/api/${PUBLIC_BRIDGE_USERNAME}/groups/${group.id}/action`,
        opts,
      );

      const data = (await res.json()) as HueUpdateGroupResponse;
      if (!data) {
        throw error(500, 'No data returned from bridge');
      }
      return data;
    } catch (err) {
      throw error(500, 'Error updating light');
    }
  }

  async function handleToggleClick() {
    if (!group || !group?.id) return;
    await updateGroupState({ on: !on });
    on = !on;
  }

  async function handleBrightnessChange() {
    if (!group || !group?.id || withinRepeatInterval) return;
    withinRepeatInterval = true;
    await updateGroupState({ bri: brightness });
    setTimeout(() => (withinRepeatInterval = false), repeatIntervalMS);
  }

  async function updateBrightness() {
    if (!group || !group?.id) return;
    await updateGroupState({ bri: brightness });
  }
</script>

<tr class="text-center">
  <td>
    <input type="checkbox" class="toggle-accent toggle" checked={on} on:click={handleToggleClick} />
  </td>
  <td>{group?.id}</td>
  <td>{group?.name}</td>
  <td>{group?.type}</td>
  <td>{group?.action.colormode}</td>
  <td>
    <input
      type="range"
      min="0"
      max="254"
      on:input={handleBrightnessChange}
      on:change={updateBrightness}
      bind:value={brightness}
      class="range range-xs p-2 {on ? 'range-accent' : 'disabled'}"
      disabled={!on}
    />
    <!-- </td> -->
  </td></tr
>
