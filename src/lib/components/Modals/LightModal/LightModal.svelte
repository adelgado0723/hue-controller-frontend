<script lang="ts">
	import type { Light } from '$lib/components/Light/Light';

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
	let brightness = light?.dimming?.brightness || 95;
	let withinRepeatInterval = false;
	const repeatIntervalMS = 150;

	async function handleToggleClick() {
	  on = !on;
	  const options = {
	    on,
	  };
	  await fetch('/api/light', {
	    method: 'PUT',
	    body: JSON.stringify({ id: light.id, options }),
	    headers: {
	      'content-type': 'application/json',
	    },
	  });
	  // TODO: handle error
	}

	async function handleBrightnessChange() {
	  if (withinRepeatInterval) return;
	  withinRepeatInterval = true;
	  await updateBrightness();
	  setTimeout(() => (withinRepeatInterval = false), repeatIntervalMS);
	}

	async function updateBrightness() {
	  const options = {
	    brightness,
	  };
	  fetch('/api/light', {
	    method: 'PUT',
	    body: JSON.stringify({ id: light.id, options }),
	    headers: {
	      'content-type': 'application/json',
	    },
	  });
	  // TODO: handle error
	}
</script>

<!-- The button to open modal -->
<label for="my-modal-3" class="btn">{light.name}</label>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="my-modal-3" class="modal-toggle" />
<div class="modal">
	<div class="modal-box relative flex items-center justify-center">
		<label for="my-modal-3" class="btn-sm btn-circle btn absolute right-2 top-2">✕</label>
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
						min={light?.dimming?.minDimLevel}
						max="100"
						on:input={handleBrightnessChange}
						on:change={updateBrightness}
						bind:value={brightness}
						class="range range-xs {on ? 'range-warning' : 'disabled'}"
						disabled={!on}
					/>
				</div>
			</div>
		</div>
	</div>
</div>
