<script lang="ts">
	import type { Scene } from '$lib/components/Scene/Scene';

	export let scene: Scene = {
	  name: '',
	  id: '',
	  type: '',
	  image: {
	    rid: '',
	    rtype: '',
	  },
	  group: {
	    rid: '',
	    rtype: '',
	  },
	  pallet: null,
	  speed: 0,
	  autoDynamic: false,
	  actions: [],
	  color: { xy: { x: 0, y: 0 } },
	  on: false,
	  dimming: {
	    brightness: 95,
	    minDimLevel: 0.3,
	  },
	};
</script>

<div class="card w-96 bg-neutral text-neutral-content">
	<div class="card-body items-center text-center">
		<h2 class="card-title">{scene.name}</h2>
		<code>{JSON.stringify(scene, null, 2)}</code>
		<p>name: {scene.name}</p>
		<p>id: {scene.id}</p>
		<p>type: {scene.type}</p>
		<!-- <p>image: {JSON.stringify(scene.image)}</p> // fetch the image -->
		<!-- <p>color:</p> -->
		<!-- <ul> -->
		<!-- 	<li> -->
		<!-- 		<p>x: {scene.color?.xy?.x}</p> -->
		<!-- 		<p>y: {scene.color?.xy?.y}</p> -->
		<!-- 	</li> -->
		<!-- </ul> -->
		<!-- <p>on: {scene.on}</p> -->
	</div>
</div>
