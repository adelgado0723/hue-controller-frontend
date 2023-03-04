<script lang="ts">
  import LightRow from '$lib/components/LightRow/LightRow.svelte';
  import type { Light } from '../Light/Light';
  import type RequestInit from 'http';
  /* import LightModal from '$lib/components/Modals/LightModal/LightModal.svelte'; */
  import { PUBLIC_BRIDGE_IP, PUBLIC_BRIDGE_USERNAME } from '$env/static/public';
  import type { UpdateLightRequest } from '$lib/types/hue';
  import { error } from '@sveltejs/kit';

  export let light: Light = {
    name: '',
    id: '',
    uniqueId: '',
    type: '',
    color: { xy: { x: 0, y: 0 } },
    on: false,
    dimming: {
      brightness: 95,
      minDimLevel: 0.3,
    },
  };

  let on = light.on;
  let brightness = light?.dimming?.brightness;
  let withinRepeatInterval = false;
  const repeatIntervalMS = 150;

  async function handleToggleClick() {
    on = !on;
    const req: Partial<UpdateLightRequest> = {
      on,
    };

    try {
      const opts: RequestInit = {
        method: 'PUT',
      };

      opts.body = JSON.stringify(req);
      const res = await fetch(
        `http://${PUBLIC_BRIDGE_IP}/api/${PUBLIC_BRIDGE_USERNAME}/lights/${light.id}/state`,
        opts,
      );

      const data = await res.json();
      if (!data) {
        throw error(500, 'No data returned from bridge');
      }
      return data;
    } catch (err) {
      throw error(500, 'Error updating light');
    }
  }

  async function handleBrightnessChange() {
    if (withinRepeatInterval) return;
    withinRepeatInterval = true;
    await updateBrightness();
    setTimeout(() => (withinRepeatInterval = false), repeatIntervalMS);
  }

  async function updateBrightness() {
    const req: Partial<UpdateLightRequest> = {
      bri: brightness,
    };

    try {
      const opts: RequestInit = {
        method: 'PUT',
      };

      opts.body = JSON.stringify(req);
      const res = await fetch(
        `http://${PUBLIC_BRIDGE_IP}/api/${PUBLIC_BRIDGE_USERNAME}/lights/${light.id}/state`,
        opts,
      );

      const data = await res.json();
      if (!data) {
        throw error(500, 'No data returned from bridge');
      }
      return data;
    } catch (err) {
      throw error(500, 'Error updating light');
    }
  }
  export let lightData: Light[] = [];
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
      {#each lightData as light}
        <LightRow {light} />
      {/each}
    </tbody>
  </table>
</div>
