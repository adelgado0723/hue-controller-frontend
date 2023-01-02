<script lang="ts">
	import type { iLight } from './Light';

	export let light: iLight = {
		name: '',
		id: '',
		type: '',
		color: { xy: { x: 0, y: 0 } },
		on: false
	};
	console.log(JSON.stringify(light, null, 2));
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
		<div class="pt-3  card-actions justify-center items-center w-full flex flex-col">
			<div class="flex gap-2">
				off
				<input type="checkbox" class="toggle" bind:checked={light.on} />
				on
			</div>
		</div>
	</div>
</div>
