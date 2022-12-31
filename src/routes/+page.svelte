<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let value = {}; // Response from bridge

	$: checkBridge = async () => {
		console.log('Checking bridge...');
		try {
			value = data.bridgeAPI._getConfig();
			console.log(data);
		} catch (err) {
			value = { error: err };
		}
	};
</script>

<h1>Welcome to SvelteKit</h1>

<!-- <input type="text" bind:value={ip} /> -->
<button class="btn" on:click={() => checkBridge()}>Check Connection</button>

<div>
	<h2>Response</h2>
	<!-- <JSONTree {value} /> -->
	{JSON.stringify(value, null, 2)}
</div>
