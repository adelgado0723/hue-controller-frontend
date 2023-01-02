import { BRIDGE_IP, BRIDGE_USERNAME } from '$env/static/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async ({ fetch }) => {
  try {
    console.log('executing api call...');
    const headers = new Headers();
    headers.set('hue-application-key', BRIDGE_USERNAME);

    const options = {
      method: 'GET',
      headers
    };

    const res = await fetch(`https://${BRIDGE_IP}/clip/v2/resource/light`, options);

    const data = await res.json();

    const lights = data?.data?.map((light: any) => {
      return {
        id: light?.id.toString(),
        name: light?.metadata?.name,
        type: light?.metadata?.archetype,
        color: {
          xy: {
            x: light?.color?.xy?.x,
            y: light?.color?.xy?.y
          }
        },
        on: light?.on?.on
      };
    });

    return { lights };
  } catch (err) {
    console.error(err);
  }
}) satisfies PageServerLoad;
