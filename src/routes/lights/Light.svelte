<script lang="ts">
	export let light: { name: string; id: number };
</script>

<div class="card w-96 bg-neutral text-neutral-content">
	<div class="card-body items-center text-center">
		<h2 class="card-title">Light Name or ID Here</h2>
		<p>data about the light...</p>
		<p>a small table perhaps?</p>
		<div class="pt-3  card-actions justify-center items-center w-full flex flex-col">
			<div class="flex gap-2">
				off
				<input type="checkbox" class="toggle" />
				on
			</div>
		</div>
	</div>
</div>
