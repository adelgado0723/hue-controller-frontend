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
    console.log("executing api call...")
    const headers = new Headers();
    headers.set("hue-application-key", BRIDGE_USERNAME)

    const options = {
      method: 'GET',
      headers,
    }

    const res = await fetch(`https://${BRIDGE_IP}/clip/v2/resource/light`, options);

    console.log(await res.json())

    return { lights: await res.json() };

  } catch (err) {
    console.error(err);
  }
}) satisfies PageServerLoad;
