<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { AlertType } from '$lib/types';
	import Alert from '$lib/components/Alert.svelte';
	import type { SignupFormResponse } from './Signup';
	export let form: SignupFormResponse;
</script>

<div class="flex flex-col items-center h-full w-full">
	<h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
		Register for an account
	</h2>
	<p class="text-center mt-1">
		Or <a href="/login" class="text-primary font-medium hover:cursor-pointer hover:underline"
			>sign in</a
		> if you already have an account.
	</p>
	<form
		method="POST"
		action="?/signup"
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
			<label for="name" class="label font-medium pb-1">
				<span class="label-text">Name</span>
			</label>

			<input
				type="text"
				name="name"
				value={form?.name ?? ''}
				class="input input-bordered w-full max-w-md"
			/>
		</div>
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
			<label for="password" class="label font-medium pb-1">
				<span class="label-text">Password</span>
			</label>
			<input type="password" name="password" class="input input-bordered w-full max-w-md" />
		</div>
		<div class="form-control w-full max-w-md">
			<label for="passwordConfirm" class="label font-medium pb-1">
				<span class="label-text">Confirm Password</span>
			</label>

			<input type="password" name="passwordConfirm" class="input input-bordered w-full max-w-md" />
		</div>
		<div class="form-control w-full max-w-md">
			<button type="submit" class="btn btn-primary w-full">Register</button>
		</div>
		{#if form?.message}
			<div class="w-full max-w-md">
				<Alert type={AlertType.Error} message={form?.message} />
			</div>
		{/if}
	</form>
</div>