<script lang="ts">
	import type { PageData } from './$types';
	import '../app.postcss';
	import { getImageURL } from '$lib/utils';
	export let data: PageData;
</script>

<div class="min-h-full">
	<nav class="navbar bg-base-100 border-b">
		<div class="flex-1">
			<a class="btn btn-ghost normal-case text-xl" href="/">Hue Hub</a>
		</div>

		{#if !data.user}
			<div class="dropdown dropdown-end">
				<a href="/login" class="btn btn-primary">Login</a>
				<a href="/signup" class="btn btn-secondary">Register</a>
			</div>
		{:else}
			<div class="dropdown dropdown-end mr-4">
				<a href="/scenes/new" class="btn btn-primary">Add Scene</a>
			</div>
			<div class="dropdown dropdown-end">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<!-- for safari -->
				<label tabindex="0" class="btn btn-ghost btn-circle avatar">
					<div class="w-10 rounded-full">
						<img
							src={data.user?.avatar
								? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar)
								: `https://ui-avatars.com/api/name=${data.user?.name}`}
							alt="User avatar"
						/>
					</div>
				</label>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<ul
					tabindex="0"
					class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
				>
					<li>
						<a href="/scenes" class="justify-between">My Scenes</a>
					</li>
					<li>
						<a href="/lights" class="justify-between">My Lights</a>
					</li>
					<li>
						<a href="/my/settings/profile">Settings</a>
					</li>
					<li>
						<form action="/logout" method="POST">
							<button type="submit" class="w-full text-start">Logout</button>
						</form>
					</li>
				</ul>
			</div>
		{/if}
	</nav>
	<slot />
</div>
