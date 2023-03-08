<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import type { ResetPasswordFormResponse } from './ResetPassword';
	import Alert from '$lib/components/Alert.svelte';
	import { AlertType } from '$lib/constants';
	export let form: ResetPasswordFormResponse ;
	let errMessage: string;
</script>

<div class="flex h-full w-full flex-col items-center">
	<h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
		Reset Your Password
	</h2>
	<p class="mt-1 text-center">We'll send you a link to reset your password.</p>
	<form
		method="POST"
		action="?/resetPassword"
		class="flex w-full flex-col items-center space-y-2 pt-4"
		use:enhance={({ form }) => {
			// Before form submission to server
			return async ({ result, update }) => {
				// After form submission to server
				if (result.type === 'success') {
					form.reset();
				}
				if (result.type === 'failure') {
					await applyAction(result);
					errMessage = result.data?.message;
				}
				update();
			};
		}}
	>
		<div class="form-control w-full max-w-md">
			<label for="email" class="label pb-1 font-medium">
				<span class="label-text">Email</span>
			</label>
			<input
				type="email"
				name="email"
				value={form?.email ?? ''}
				class="input-bordered input w-full max-w-md"
			/>
		</div>
		<div class="form-control w-full max-w-md">
			<button type="submit" class="btn-primary btn w-full">Reset Password</button>
		</div>

		{#if errMessage}
			<div class="w-full max-w-md">
				<Alert type={AlertType.Error} message={errMessage} />
			</div>
		{/if}
		{#if form?.success}
			<div class="w-full max-w-md">
				<Alert
					type={AlertType.Success}
					message={'An email has been sent to reset your password.'}
				/>
			</div>
		{/if}
	</form>
</div>
