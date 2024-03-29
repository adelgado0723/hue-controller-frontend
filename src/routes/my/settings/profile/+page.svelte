<script lang="ts">
	import { Icon, Pencil, type IconSource } from 'svelte-hero-icons';
	import Input from '$lib/components/Input/Input.svelte';
	import type { PageData } from './$types';
	import { getImageURL } from '$lib/utils';
	import { enhance, applyAction, type SubmitFunction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	let icon: IconSource = Pencil;

	export let data: PageData;
	let loading: boolean;
	$: loading = false;

	const showPreview = (event: Event) => {
	  const target = event.target as HTMLInputElement;
	  const files = target.files;
	  if (!!files && files.length && files.length > 0) {
	    const src = URL.createObjectURL(files[0]);
	    const preview = document.getElementById('avatar-preview') as HTMLImageElement;
	    preview.src = src;
	  }
	};

	const submitUpdateProfile = (() => {
	  loading = true;
	  return async ({ result }) => {
	    switch (result.type) {
	      case 'success':
	        await invalidateAll();
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

<div class="flex flex-col w-full h-full">
	<form
		action="?/updateProfile"
		method="POST"
		enctype="multipart/form-data"
		class="flex flex-col space-y-2 w-full"
		use:enhance={submitUpdateProfile}
	>
		<h3 class="text-2xl font-medium">Update Profile</h3>
		<div class="form-control w-full max-w-lg">
			<label for="avatar" class="label font-medium pb-1">
				<span class="label-text">Profile Picture</span>
			</label>
			<label for="avatar" class="avatar w-32 rounded-full hover:cursor-pointer">
				<label for="avatar" class="absolute -bottom-0.5 -right-0.5 hover:cursor-pointer">
					<span class="btn btn-circle btn-sm btn-secondary">
						<Icon src={icon} class="w-4 h-4" />
					</span>
				</label>
				<div class="w-32 rounded-full">
					<img
						src={data.user?.avatar
							? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar)
							: `https://ui-avatars.com/api/name=${data.user?.name}`}
						alt="user avatar"
						id="avatar-preview"
					/>
				</div>
			</label>
			<input
				type="file"
				name="avatar"
				id="avatar"
				value=""
				accept="image/*"
				hidden
				on:change={showPreview}
				disabled={loading}
			/>
		</div>
		<Input id="name" label="Name" value={data?.user?.name} disabled={loading} />
		<div class="w-full max-w-lg pt-3">
			<button class="btn btn-primary w-full max-w-lg" type="submit"> Update Profile </button>
		</div>
	</form>
</div>
