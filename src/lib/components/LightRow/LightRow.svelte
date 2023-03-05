<script lang="ts">
  import type { Light } from '$lib/components/Light/Light';
  import type RequestInit from 'http';
  /* import LightModal from '$lib/components/Modals/LightModal/LightModal.svelte'; */
  import { PUBLIC_BRIDGE_IP, PUBLIC_BRIDGE_USERNAME } from '$env/static/public';
  import type { HueUpdateLightRequest } from '$lib/types/hue';
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
    const req: Partial<HueUpdateLightRequest> = {
      on: !on,
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
      on = !on;
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
    const req: Partial<HueUpdateLightRequest> = {
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
</script>

<tr class="text-center">
  <td>
    <input type="checkbox" class="toggle-accent toggle" checked={on} on:click={handleToggleClick} />
  </td>
  <td>{light.id}</td>
  <td>{light.name}</td>
  <td>{light.type}</td>
  <td>{`X=${light.color.xy.x}, Y=${light.color.xy.y}`}</td>
  <td>
    <input
      type="range"
      min="1"
      max="254"
      on:input={handleBrightnessChange}
      on:change={updateBrightness}
      bind:value={brightness}
      class="range range-xs p-2 {on ? 'range-accent' : 'disabled'}"
      disabled={!on}
    />
  </td>
</tr>
