<script lang="ts">
	import Login from '$lib/components/Login/Login.svelte';
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<div class="flex flex-col items-center h-full w-full">
	<Login {form} />
</div>
