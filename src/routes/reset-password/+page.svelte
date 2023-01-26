<script lang="ts">
	import ResetPassword from '$lib/components/ResetPassword/ResetPassword.svelte';
	import type { ActionData } from './$types';
	import type { ResetPasswordFormResponse } from '$lib/components/ResetPassword/ResetPassword';
	export let form: ActionData;
	const resetPasswordForm = form as ResetPasswordFormResponse;
</script>

<div class="flex flex-col items-center h-full w-full">
	<ResetPassword form={resetPasswordForm} />
</div>
