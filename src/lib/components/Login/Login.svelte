<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import type { LoginFormResponse } from './Login';
	import { AlertType } from '$lib/types/constants';
	import Alert from '$lib/components/Alert.svelte';
	export let form: LoginFormResponse;
	let errorMessage: string;
</script>

<div class="flex h-full w-full flex-col items-center">
	<h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
		Sign in to your account
	</h2>
	<p class="mt-1 text-center">
		<a href="/signup" class="font-medium text-primary hover:cursor-pointer hover:underline"
			>Sign up</a
		> if you don't already have an account.
	</p>
	<form
		method="POST"
		action="?/login"
		class="flex w-full flex-col items-center space-y-2 pt-4"
		use:enhance={({ form }) => {
			// Before form submission to server
			return async ({ result, update }) => {
				// After form submission to server
				if (result.type === 'success') {
					form.reset();
				}
				if (result.type === 'failure') {
					console.log('from login component: ' + JSON.stringify(result, null, 2));
					errorMessage = result.data?.message;
					await applyAction(result);
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
			<label for="password" class="label pb-1 font-medium">
				<span class="label-text">Password</span>
			</label>
			<input type="password" name="password" class="input-bordered input w-full max-w-md" />
		</div>
		<div class="w-full max-w-md">
			<a
				href="/reset-password"
				class="font-medium text-primary hover:cursor-pointer hover:underline">Forgot password?</a
			>
		</div>
		<div class="form-control w-full max-w-md">
			<button type="submit" class="btn-primary btn w-full">Login</button>
		</div>

		{#if !!errorMessage}
			<div class="w-full max-w-md">
				<Alert type={AlertType.Error} message={errorMessage} />
			</div>
		{/if}
	</form>
</div>
