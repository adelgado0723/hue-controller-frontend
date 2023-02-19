import type { PageLoad } from './$types';
import { variables } from '$lib/variables';
const { BRIDGE_IP, BRIDGE_USERNAME } = variables;
import type { HueScene } from '$lib/types';
import { error } from '@sveltejs/kit';

export const ssr = false;

export const load: PageLoad = (async ({ fetch }) => {
  try {
    const opts = {
      /* headers: headers, */
      method: 'GET',
    };

    const res = await fetch(`http://${BRIDGE_IP}/api/${BRIDGE_USERNAME}/lights`, opts);

    const data: any = await res.json();
    /* const data: HueScene[] = await res.json(); */
    if (!data) {
      throw error(500, 'No data returned from bridge');
    }
    console.log(data);
    console.log('Fetch from front end worked!');
    /* const scenes = Object.keys(data).map((key): scenes => { */
    /*   const scene: HueScene = data[key]; */
    /*   return { */
    /*     id: key, */
    /*     name: scene?.name, */
    /*     type: scene?.config?.archetype, */
    /*     color: { */
    /*       xy: { */
    /*         x: scene?.state?.xy[0], */
    /*         y: scene?.state?.xy[1], */
    /*       }, */
    /*     }, */
    /*     on: scene?.state?.on, */
    /*     dimming: { */
    /*       brightness: scene?.state?.bri, */
    /*       mindimlevel: scene?.capabilities?.control?.mindimlevel, */
    /*     }, */
    /*   }; */
    /* }); */
    /* return { scenes }; */
    return { data };
  } catch (err) {
    console.error(err);
    return { error: 'Failed to load scenes' };
  }
}) satisfies PageLoad;
