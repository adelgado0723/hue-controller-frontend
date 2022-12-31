<script lang="ts">
	import type { light as iLight } from './+page.server';
	export let light: iLight = { name: '', id: 0, type: '' };
</script>

<div class="card w-96 bg-neutral text-neutral-content">
	<div class="card-body items-center text-center">
		<h2 class="card-title">{light?.name}</h2>
		<p>name: {light?.name}</p>
		<p>id: {light?.id}</p>
		<div class="pt-3  card-actions justify-center items-center w-full flex flex-col">
			<div class="flex gap-2">
				off
				<input type="checkbox" class="toggle" />
				on
			</div>
		</div>
	</div>
</div>
