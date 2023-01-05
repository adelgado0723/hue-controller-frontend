<script>
	import '../app.postcss';
	let isNavOpen = false;
</script>

<nav class="navbar bg-primary">
	<div class="flex-1">
		<a class="btn btn-ghost normal-case text-xl" href="/">Hue Controller</a>
	</div>
	{#if !isNavOpen}
		<div class="navbar-end">
			<button on:click={() => (isNavOpen = !isNavOpen)} class="btn btn-square btn-ghost">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="inline-block w-5 h-5 stroke-current"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
					/></svg
				>
			</button>
		</div>
	{/if}

	{#if isNavOpen}
		<div class="navbar-end">
			<button on:click={() => (isNavOpen = !isNavOpen)} class="btn btn-square btn-ghost">
				<svg class="h-8 w-8 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
					<line x1="18" y1="6" x2="6" y2="18" />
					<line x1="6" y1="6" x2="18" y2="18" />
				</svg>
			</button>
		</div>
	{/if}
</nav>

{#if isNavOpen}
	<ul class="flex flex-col items-center justify-between min-h-[250px] text-success">
		<li
			class="border-b border-gray-400 my-8 uppercase hover:transition-colors hover:text-secondary"
		>
			<a on:click={() => (isNavOpen = !isNavOpen)} href="/about">About</a>
		</li>
		<li class="border-b border-gray-400 my-8 uppercase hover:text-secondary">
			<a on:click={() => (isNavOpen = !isNavOpen)} href="/settings">Settings</a>
		</li>
		<li class="border-b border-gray-400 my-8 uppercase hover:text-secondary">
			<a on:click={() => (isNavOpen = !isNavOpen)} href="/lights">Lights</a>
		</li>
		<li class="border-b border-gray-400 my-8 uppercase hover:text-secondary">
			<a on:click={() => (isNavOpen = !isNavOpen)} href="/scenes">Scenes</a>
		</li>
		<li class="border-b border-gray-400 my-8 uppercase hover:text-secondary">
			<a on:click={() => (isNavOpen = !isNavOpen)} href="/theme">Theme</a>
		</li>
	</ul>
{/if}

<slot />
