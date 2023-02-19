import type { Light } from '$lib/components/Light/Light';
import type { HueLight, HueLights } from '$lib/types';
import { variables } from '$lib/variables';
import { error, json } from '@sveltejs/kit';
import type { PageLoad } from './$types';
const { BRIDGE_IP, BRIDGE_USERNAME } = variables;

export const ssr = false;

export const load: PageLoad = (async () => {
  try {
    const opts = {
      /* headers: headers, */
      method: 'GET',
    };

    const res = await fetch(`http://${BRIDGE_IP}/api/${BRIDGE_USERNAME}/lights`, opts);

    const data: HueLights = await res.json();
    if (!data) {
      throw error(500, 'No data returned from bridge');
    }
    console.log(data);
    console.log('Fetch from front end worked!');
    const lights = Object.keys(data).map((key): Light => {
      const light: HueLight = data[key];
      return {
        id: key,
        name: light?.name,
        type: light?.config?.archetype,
        color: {
          xy: {
            x: light?.state?.xy[0],
            y: light?.state?.xy[1],
          },
        },
        on: light?.state?.on,
        dimming: {
          brightness: light?.state?.bri,
          mindimlevel: light?.capabilities?.control?.mindimlevel,
        },
      };
    });
    return json({ lights });
  } catch (err) {
    console.error(err);
    return { error: 'Failed to load lights' };
  }
}) satisfies PageLoad;
