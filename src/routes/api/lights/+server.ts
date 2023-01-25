import { error, json } from '@sveltejs/kit';
/* @ts-ignore -- svekt kit has trouble with this */
import { BRIDGE_IP, BRIDGE_USERNAME } from '$env/static/private';
import type { RequestHandler } from './$types';
import type { Light } from '$lib/components/Light/Light';

export const GET = (async (): Promise<Response> => {
  try {
    const headers = new Headers();
    headers.set('hue-application-key', BRIDGE_USERNAME);

    const options = {
      method: 'GET',
      headers,
    };

    const res = await fetch(`https://${BRIDGE_IP}/clip/v2/resource/light`, options);

    const data = await res.json();

    const lights: Light[] = data?.data?.map((light: any) => {
      return {
        id: light?.id.toString(),
        name: light?.metadata?.name,
        type: light?.metadata?.archetype,
        color: {
          xy: {
            x: light?.color?.xy?.x,
            y: light?.color?.xy?.y,
          },
        },
        on: light?.on?.on,
        dimming: {
          brightness: light?.dimming?.brightness,
          minDimLevel: light?.dimming?.min_dim_level,
        },
      };
    });

    return json({ lights });
  } catch (err) {
    throw error(500, 'Error fetching lights');
  }
}) satisfies RequestHandler;
