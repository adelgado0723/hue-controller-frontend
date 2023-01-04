<script lang="ts">
	import type { iLight } from './Light';

	export let light: iLight = {
		name: '',
		id: '',
		type: '',
		color: { xy: { x: 0, y: 0 } },
		on: false,
		dimming: {
			brightness: 95,
			minDimLevel: 0.3
		}
	};

	let on = light.on;
	let brightness = light?.dimming?.brightness || 95;
  let withinRepeatInterval = false;
  const repeatIntervalMS = 150;

	async function handleToggleClick() {
		on = !on;
		const options = {
			on
		};
		const response = await fetch('/api/light', {
			method: 'PUT',
			body: JSON.stringify({ id: light.id, options }),
			headers: {
				'content-type': 'application/json'
			}
		});

		console.log(await response.json());
	}

	async function handleBrightnessChange() {
    if (withinRepeatInterval) return;
    withinRepeatInterval = true;
    await updateBrightness();
    setTimeout(() => withinRepeatInterval = false, repeatIntervalMS);
	}

  async function updateBrightness() {
		const options = {
			brightness
		};
		const response = await fetch('/api/light', {
			method: 'PUT',
			body: JSON.stringify({ id: light.id, options }),
			headers: {
				'content-type': 'application/json'
			}
		});
		console.log(await response.json());
  }
</script>

<h1>{withinRepeatInterval}</h1>

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
		<div class="pt-3  card-actions justify-center items-center w-full flex flex-col">
			<div class="flex gap-2">
				<span>power:</span>
				<input
					type="checkbox"
					class="toggle toggle-secondary"
					checked={on}
					on:click={handleToggleClick}
				/>
			</div>
		</div>
		<div class="pt-3  card-actions justify-center items-center w-full flex flex-col">
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
