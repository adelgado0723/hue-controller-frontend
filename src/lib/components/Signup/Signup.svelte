<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { AlertType } from '$lib/types';
	import Alert from '$lib/components/Alert.svelte';
	import type { SignupFormResponse } from './Signup';
	export let form: SignupFormResponse;
	let message: string;
</script>

<div class="flex h-full w-full flex-col items-center">
	<h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
		Register for an account
	</h2>
	<p class="mt-1 text-center">
		Or <a href="/login" class="font-medium text-primary hover:cursor-pointer hover:underline"
			>sign in</a
		> if you already have an account.
	</p>
	<form
		method="POST"
		action="?/signup"
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
					message = result.data?.message;
				}
				update();
			};
		}}
	>
		<div class="form-control w-full max-w-md">
			<label for="name" class="label pb-1 font-medium">
				<span class="label-text">Name</span>
			</label>

			<input
				type="text"
				name="name"
				value={form?.name ?? ''}
				class="input-bordered input w-full max-w-md"
			/>
		</div>
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
		<div class="form-control w-full max-w-md">
			<label for="passwordConfirm" class="label pb-1 font-medium">
				<span class="label-text">Confirm Password</span>
			</label>

			<input type="password" name="passwordConfirm" class="input-bordered input w-full max-w-md" />
		</div>
		<div class="form-control w-full max-w-md">
			<button type="submit" class="btn-primary btn w-full">Register</button>
		</div>
		{#if message}
			<div class="w-full max-w-md">
				<Alert type={AlertType.Error} message={message} />
			</div>
		{/if}
	</form>
</div>
