<script lang="ts">
	import Input from '$lib/components/Input/Input.svelte';
	import UpdateModal from '$lib/components/Modals/UpdateModal/UpdateModal.svelte';
	import type { UpdateProfileFormResponse } from '$lib/components/Modals/UpdateModal/UpdateModal';
	import type { PageData } from './$types';
	import { enhance, applyAction, type SubmitFunction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	export let form: UpdateProfileFormResponse;
	export let data: PageData;

	let emailModalOpen: boolean;
	let usernameModalOpen: boolean;
	let loading: boolean;

	$: emailModalOpen = false;
	$: usernameModalOpen = false;
	$: loading = false;

	const submitUpdateEmail = (() => {
	  loading = true;
	  emailModalOpen = true;
	  return async ({ result }) => {
	    switch (result.type) {
	      case 'success':
	        await invalidateAll();
	        emailModalOpen = false;
	        break;
	      case 'error':
	        break;
	      default:
	        await applyAction(result);
	        break;
	    }
	    loading = false;
	  };
	}) satisfies SubmitFunction;

	const submitUpdateUsername = (() => {
	  loading = true;
	  usernameModalOpen = true;
	  return async ({ result }) => {
	    switch (result.type) {
	      case 'success':
	        await invalidateAll();
	        usernameModalOpen = false;
	        break;
	      case 'error':
	        break;
	      default:
	        await applyAction(result);
	        break;
	    }
	    loading = false;
	  };
	}) satisfies SubmitFunction;
</script>

<div class="flex flex-col w-full h-full space-y-12">
	<div class="w-full">
		<h3 class="text-2xl font-medium">Change Email</h3>
		<div class="divider" />
		<UpdateModal label="change-email" checked={emailModalOpen}>
			<span slot="trigger" class="btn btn-primary">Change Email</span>
			<h3 slot="heading">Change Your Email</h3>
			<form action="?/updateEmail" method="POST" class="space-y-2" use:enhance={submitUpdateEmail}>
				<Input
					id="email"
					label="Enter your new email address"
					type="email"
					required={true}
					value={form?.email}
					disabled={loading}
				/>
				<button type="submit" class="btn btn-primary w-full">Change my email</button>
			</form>
		</UpdateModal>
	</div>

	<div class="w-full">
		<h3 class="text-2xl font-medium">Change Username</h3>
		<div class="divider mb-0.5" />
		<Input
			id="username"
			type="text"
			label="Username"
			value={data?.user?.username}
			disabled={true}
		/>
		<UpdateModal label="change-username" checked={usernameModalOpen}>
			<span slot="trigger" class="btn btn-primary">Change Username</span>
			<h3 slot="heading">Change Your Username</h3>
			<form
				action="?/updateUsername"
				method="POST"
				class="space-y-2"
				use:enhance={submitUpdateUsername}
			>
				<Input
					id="username"
					label="Enter your new username"
					type="text"
					required={true}
					value={form?.username}
					disabled={loading}
				/>
				<button class="btn btn-primary w-full" disabled={loading}> Change my username </button>
			</form>
		</UpdateModal>
	</div>
</div>
