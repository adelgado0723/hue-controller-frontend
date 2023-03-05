<script lang="ts">
	import type { Light } from './Light';
	import type RequestInit from 'http';
	import LightModal from '$lib/components/Modals/LightModal/LightModal.svelte';
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

<div class="card w-96 bg-neutral text-neutral-content">
	<div class="card-body items-center text-center">
		<h2 class="card-title">{light.name}</h2>
		<p>name: {light.name}</p>
		<p>id: {light.id}</p>
		<p>type: {light.type}</p>
		<p>color:</p>
		<ul>
			<li>
				<p>x: {light.color?.xy?.x}</p>
				<p>y: {light.color?.xy?.y}</p>
			</li>
		</ul>
		<div class="card-actions  flex w-full flex-col items-center justify-center pt-3">
			<div class="flex gap-2">
				<span>power:</span>
				<input
					type="checkbox"
					class="toggle-secondary toggle"
					checked={on}
					on:click={handleToggleClick}
				/>
			</div>
		</div>
		<div class="card-actions  flex w-full flex-col items-center justify-center pt-3">
			<div class="flex gap-2">
				<span>brightness:</span>
				<input
					type="range"
          min="1"
					max="254"
					on:input={handleBrightnessChange}
					on:change={updateBrightness}
					bind:value={brightness}
					class="range range-xs {on ? 'range-warning' : 'disabled'}"
					disabled={!on}
				/>
			</div>
		</div>
		<LightModal {light} />
	</div>
</div>
