<script lang="ts">
  import type { GroupRow } from '$lib/components/GroupRow/Group';
  import type RequestInit from 'http';
  /* import LightModal from '$lib/components/Modals/LightModal/LightModal.svelte'; */
  import { PUBLIC_BRIDGE_IP, PUBLIC_BRIDGE_USERNAME } from '$env/static/public';
  import { error } from '@sveltejs/kit';

  export let group: GroupRow | null = null;

  /* let on = group?.action?.on; */
  /* let brightness = group?.action?.bri; */
  /* let withinRepeatInterval = false; */
  /* const repeatIntervalMS = 150; */

  /* async function handleToggleClick() { */
  /*   on = !on; */
  /*   const req: Partial<UpdateLightRequest> = { */
  /*     on, */
  /*   }; */
  /**/
  /*   try { */
  /*     const opts: RequestInit = { */
  /*       method: 'PUT', */
  /*     }; */
  /**/
  /*     opts.body = JSON.stringify(req); */
  /*     const res = await fetch( */
  /*       `http://${PUBLIC_BRIDGE_IP}/api/${PUBLIC_BRIDGE_USERNAME}/lights/${group.id}/state`, */
  /*       opts, */
  /*     ); */
  /**/
  /*     const data = (await res.json()) as GetGroupsResponse; */
  /*     if (!data) { */
  /*       throw error(500, 'No data returned from bridge'); */
  /*     } */
  /*     return data; */
  /*   } catch (err) { */
  /*     throw error(500, 'Error updating light'); */
  /*   } */
  /* } */
  /**/
  /* async function handleBrightnessChange() { */
  /*   if (withinRepeatInterval) return; */
  /*   withinRepeatInterval = true; */
  /*   await updateBrightness(); */
  /*   setTimeout(() => (withinRepeatInterval = false), repeatIntervalMS); */
  /* } */

  /* async function updateBrightness() { */
  /*   const req: Partial<UpdateLightRequest> = { */
  /*     bri: brightness, */
  /*   }; */
  /**/
  /*   try { */
  /*     const opts: RequestInit = { */
  /*       method: 'PUT', */
  /*     }; */
  /**/
  /*     opts.body = JSON.stringify(req); */
  /*     const res = await fetch( */
  /*       `http://${PUBLIC_BRIDGE_IP}/api/${PUBLIC_BRIDGE_USERNAME}/lights/${light.id}/state`, */
  /*       opts, */
  /*     ); */
  /**/
  /*     const data = await res.json(); */
  /*     if (!data) { */
  /*       throw error(500, 'No data returned from bridge'); */
  /*     } */
  /*     return data; */
  /*   } catch (err) { */
  /*     throw error(500, 'Error updating light'); */
  /*   } */
  /* } */
</script>

<tr class="text-center">
  <!-- <td> -->
  <!--   <input -->
  <!--     type="checkbox" -->
  <!--     class="toggle-accent toggle" -->
  <!--     checked={on} -->
  <!--     on:click={handleToggleClick} -->
  <!--   /> -->
  <!-- </td> -->
  <td>{group?.action.on}</td>
  <td>{group?.id}</td>
  <td>{group?.name}</td>
  <td>{group?.type}</td>
  <td>{group?.action.colormode}</td>
  <td>{group?.action.bri}</td>

  <!-- <td> -->
  <!--   <input -->
  <!--     type="range" -->
  <!--     min="1" -->
  <!--     max="254" -->
  <!--     on:input={handleBrightnessChange} -->
  <!--     on:change={updateBrightness} -->
  <!--     bind:value={brightness} -->
  <!--     class="range range-xs p-2 {on ? 'range-accent' : 'disabled'}" -->
  <!--     disabled={!on} -->
  <!--   /> -->
  <!-- </td> -->
</tr>
