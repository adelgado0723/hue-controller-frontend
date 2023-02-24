import { PUBLIC_BRIDGE_IP, PUBLIC_BRIDGE_USERNAME } from '$env/static/public';
import type { Light } from '$lib/components/Light/Light';
import { convertHueLightToLight } from '$lib/hue';
import type { HueLight, HueLights } from '$lib/types';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const ssr = false;

export const load: PageLoad = (async () => {
  try {
    const opts = {
      method: 'GET',
    };

    const res = await fetch(`http://${PUBLIC_BRIDGE_IP}/api/${PUBLIC_BRIDGE_USERNAME}/lights`, opts);

    const data: HueLights = await res.json();
    if (!data) {
      throw error(500, 'No data returned from bridge');
    }
    const lights = Object.keys(data).map((key): Light => {
      const light: HueLight = data[key];
      return convertHueLightToLight(light, key);
    });
    return { lights };
  } catch (err) {
    return { error: 'Failed to load lights' };
  }
}) satisfies PageLoad;
