<script>
	import { enhance, applyAction } from '$app/forms';
	import ContactsTable from '$lib/components/ContactsTable.svelte';
	import Alert from '$lib/components/Alert.svelte';
	export let data;
	export let form;
	console.log(form);
</script>

<div
	class="artboard artboard-demo max-w-lg p-8 m-10 bg-base-content text-secondary flex flex-col justify-center items-center"
>
	<div class="flex flex-col justify-center items-center">
		<div class="flex justify-between items-center">
			<h2 class="text-center text-3xl font-bold tracking-tight mb-4">Contact Manager</h2>
		</div>
		<form
			method="POST"
			action="?/create"
			class="flex flex-col font-bold gap-1"
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
			<div class="form-control max-w-xs">
				<label for="name" class="label">
					<span>Name</span>
				</label>

				<input
					type="text"
					name="name"
					value={form?.name ?? ''}
					class="input input-primary input-bordered max-w-xs"
				/>
			</div>
			<div class="form-control max-w-xs">
				<label for="email" class="label">
					<span>Email</span>
				</label>
				<input
					type="email"
					name="email"
					value={form?.email ?? ''}
					class="input input-primary input-bordered max-w-xs"
				/>
			</div>
			<div class="form-control max-w-xs">
				<label for="password" class="label">
					<span>Password</span>
				</label>

				<input
					type="text"
					name="password"
					value={form?.password ?? ''}
					class="input input-primary input-bordered max-w-xs"
				/>
			</div>
			<div class="form-control max-w-xs">
				<label for="passwordConfirm" class="label">
					<span>Confirm Password</span>
				</label>

				<input
					type="text"
					name="passwordConfirm"
					value={form?.passwordConfirm ?? ''}
					class="input input-primary input-bordered max-w-xs"
				/>
			</div>
			<button class="mt-6 btn btn-success max-w-xs">Add</button>
			{#if form?.message}
				<Alert message={form?.message} />
			{/if}
		</form>
	</div>
</div>
