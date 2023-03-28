<script lang="ts">
  import type { PageData } from './$types';
  import '../app.postcss';
  import { getImageURL } from '$lib/utils';
  export let data: PageData;
</script>

<div class="min-h-full">
  <nav class="navbar border-b bg-base-100">
    <div class="flex-1">
      <a class="btn-link no-underline hover:no-underline hover:scale-110 btn text-3xl normal-case text-primary" href="/">Hue Hub</a>
    </div>

    {#if !data.user}
      <div class="dropdown-end dropdown">
        <a href="/login" class="btn-primary btn">Login</a>
        <a href="/signup" class="btn-secondary btn">Register</a>
      </div>
    {:else}
      <div class="dropdown-end dropdown mr-4">
        <a href="/scenes/new" class="btn-primary btn">Add Scene</a>
      </div>
      <div class="dropdown-end dropdown">
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <!-- for safari -->
        <label tabindex="0" class="btn-ghost btn-circle avatar btn">
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
          class="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
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
