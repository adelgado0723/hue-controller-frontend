import type { PageLoad } from './$types';
import type { HueScene, HueScenes } from '$lib/types/hue';
import type { Scene } from '$lib/components/Scene/Scene';
import { error } from '@sveltejs/kit';
import { PUBLIC_BRIDGE_IP, PUBLIC_BRIDGE_USERNAME } from '$env/static/public';

export const ssr = false;

export const load: PageLoad = (async ({ fetch }) => {
  try {
    const opts = {
      /* headers: headers, */
      method: 'GET',
    };

    const res = await fetch(
      `http://${PUBLIC_BRIDGE_IP}/api/${PUBLIC_BRIDGE_USERNAME}/scenes`,
      opts,
    );

    const data: HueScenes = await res.json();
    if (!data) {
      throw error(500, 'No data returned from bridge');
    }

    const scenes = Object.keys(data).map((key): Partial<Scene> => {
      const scene: HueScene = data[key];
      return {
        id: key,
        name: scene?.name,
        image: scene?.image,
        group: scene?.group,
        type: scene?.type,
        lights: scene?.lights || [],
        owner: scene?.owner || '',
        locked: scene?.locked || false,
        recycle: scene?.recycle || false,
        lastUpdated: scene?.lastupdated, 
        version: scene?.version || 0,
      };
    });
    return { scenes };
  } catch (err) {
    return { error: 'Failed to load scenes' };
  }
}) satisfies PageLoad;
