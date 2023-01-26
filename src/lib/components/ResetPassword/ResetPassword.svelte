<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import type { ResetPasswordFormResponse } from './ResetPassword';

	import Alert from '$lib/components/Alert.svelte';
	export let form: ResetPasswordFormResponse;
</script>

<div class="flex flex-col items-center h-full w-full">
	<h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
		Reset Your Password
	</h2>
	<p class="text-center mt-1">We'll send you a link to reset your password.</p>
	<form
		method="POST"
		action="?/resetPassword"
		class="flex flex-col items-center space-y-2 w-full pt-4"
		use:enhance={({ form }) => {
			// Before form submission to server
			return async ({ result, update }) => {
				// After form submission to server
				if (result.type === 'success') {
					form.reset();
				}
				if (result.type === 'failure') {
					await applyAction(result);
				}
				update();
			};
		}}
	>
		<div class="form-control w-full max-w-md">
			<label for="email" class="label font-medium pb-1">
				<span class="label-text">Email</span>
			</label>
			<input
				type="email"
				name="email"
				value={form?.email ?? ''}
				class="input input-bordered w-full max-w-md"
			/>
		</div>
		<div class="form-control w-full max-w-md">
			<button type="submit" class="btn btn-primary w-full">Reset Password</button>
		</div>

		{#if form?.success}
			<div class="w-full max-w-md">
				<Alert type="success" message={'An email has been sent to reset your password.'} />
			</div>
		{/if}
	</form>
</div>
