<script lang="ts">
	import Login from '$lib/components/Login/Login.svelte';
	import type { ActionData } from './$types';
	import type { LoginFormResponse } from '$lib/components/Login/Login';
	export let form: ActionData;
	const loginForm = form as LoginFormResponse;
</script>

<div class="flex flex-col items-center h-full w-full">
	<Login form={loginForm} />
</div>
