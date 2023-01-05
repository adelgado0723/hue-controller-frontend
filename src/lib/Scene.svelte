<script lang="ts">
	import type { Scene } from './Scene';

	export let scene: Scene = {
	  name: '',
	  id: '',
	  type: '',
	  color: { xy: { x: 0, y: 0 } },
	  on: false,
	  dimming: {
	    brightness: 95,
	    minDimLevel: 0.3,
	  },
	};

	let on = scene.on;

	async function handleToggleClick() {
	  on = !on;
	  const options = {
	    on,
	  };
	  await fetch('/api/scene', {
	    method: 'PUT',
	    body: JSON.stringify({ id: scene.id, options }),
	    headers: {
	      'content-type': 'application/json',
	    },
	  });
	  // TODO: handle error
	}
</script>

<div class="card w-96 bg-neutral text-neutral-content">
	<div class="card-body items-center text-center">
		<h2 class="card-title">{scene.name}</h2>
		<p>name: {scene.name}</p>
		<p>id: {scene.id}</p>
		<p>type: {scene.type}</p>
		<p>color:</p>
		<ul>
			<li>
				<p>x: {scene.color?.xy?.x}</p>
				<p>y: {scene.color?.xy?.y}</p>
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
	</div>
</div>
