import { error, json } from '@sveltejs/kit';
import { BRIDGE_IP, BRIDGE_USERNAME } from '$env/static/private';
import type { RequestHandler } from './$types';
import type { Scene } from '$lib/Scene';

export const GET = (async (): Promise<Response> => {
  try {
    const headers = new Headers();
    headers.set('hue-application-key', BRIDGE_USERNAME);

    const options = {
      method: 'GET',
      headers,
    };

    const res = await fetch(`https://${BRIDGE_IP}/clip/v2/resource/scene`, options);

    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));

    const scenes: Scene[] = data?.data?.map((light: any) => {
      return {
        id: light?.id?.toString(),
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

    return json({ scenes });
  } catch (err) {
    throw error(500, 'Error fetching lights');
  }
}) satisfies RequestHandler;
