import { BRIDGE_IP, BRIDGE_USERNAME } from '$env/static/private';
import type { PageServerLoad } from './$types';
import https from 'https';

export interface light {
  id: string;
  name: string;
  type: string;
}
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
    console.log(data?.data);

    const lights = data?.data?.map((light: any) => {
      return {
        id: light?.id,
        name: light?.metadata?.name,
        type: light?.metadata?.archetype
      };
    });
    
    return { lights };
  } catch (err) {
    console.error(err);
  }
}) satisfies PageServerLoad;
