<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	/* @ts-ignore */
	import type { ActionData } from './$types';
	import Alert from '$lib/components/Alert.svelte';
	export let form: ActionData;
</script>

<div class="flex flex-col items-center h-full w-full">
	<h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
		Sign in to your account
	</h2>
	<p class="text-center mt-1">
		<a href="/signup" class="text-primary font-medium hover:cursor-pointer hover:underline"
			>Sign up</a
		> if you don't already have an account.
	</p>
	<form
		method="POST"
		action="?/login"
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
			<label for="password" class="label font-medium pb-1">
				<span class="label-text">Password</span>
			</label>
			<input type="password" name="password" class="input input-bordered w-full max-w-md" />
		</div>
		<div class="form-control w-full max-w-md">
			<button type="submit" class="btn btn-primary w-full">Login</button>
		</div>

		{#if !!form?.message}
			<div class="w-full max-w-md">
				<Alert message={form.message} />
			</div>
		{/if}
	</form>
</div>
