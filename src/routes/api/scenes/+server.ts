import { error, json } from '@sveltejs/kit';
import { BRIDGE_IP, BRIDGE_USERNAME } from '$env/static/private';
import type { RequestHandler } from './$types';
import type { Scene } from '$lib/components/Scene/Scene';

export const GET = (async (): Promise<Response> => {
  try {
    const headers = new Headers();
    headers.set('hue-application-key', BRIDGE_USERNAME);

    const options = {
      method: 'GET',
      headers
    };

    const res = await fetch(`https://${BRIDGE_IP}/clip/v2/resource/scene`, options);

    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));

    const scenes: Scene[] = data?.data?.map((scene: any) => {
      return {
        id: scene?.id?.toString(),
        name: scene?.metadata?.name,
        actions: scene?.actions,
        image: {
          rid: scene?.metadata?.image?.rid,
          rtype: scene?.metadata?.image?.rtype
        },
        group: {
          rid: scene?.group?.rid,
          rtype: scene?.group?.rtype
        },
        pallet: {
          color: scene?.pallet?.color,
          dimming: scene?.pallet?.dimming
        },
        speed: scene?.metadata?.speed,
        autoDynamic: scene?.metadata?.auto_dynamic,
        type: scene?.type
      };
    });

    return json({ scenes });
  } catch (err) {
    throw error(500, 'Error fetching scenes');
  }
}) satisfies RequestHandler;
