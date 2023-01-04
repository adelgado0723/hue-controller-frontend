<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Welcome to SvelteKit</h1>

<button class="btn btn-secondary">Check Connection</button>

<div>
	<h2>Response</h2>
	<!-- <JSONTree {value} /> -->
	{JSON.stringify(data, null, 2)}
</div>
