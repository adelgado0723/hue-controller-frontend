import https from 'https';
import type { PeerCertificate } from 'tls';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { variables } from '$lib/variables';
const { BRIDGE_IP, BRIDGE_USERNAME, BRIDGE_SERVER_NAME, BRIDGE_SSL_CERT } = variables;
import fetch from 'node-fetch';
import type { Scene } from '$lib/components/Scene/Scene';

interface HueScene {
  id: string;
  metadata: {
    name: string;
    actions: any;
    image: {
      rid: string;
      rtype: string;
    };
    speed: number;
    auto_dynamic: boolean;
  };
  group: {
    rid: string;
    rtype: string;
  };
  pallet:
  | {
    color: {
      color: {
        xy: {
          x: number;
          y: number;
        };
      };
      dimming: {
        brightness: number;
      };
    };
    dimming: {
      brightness: number;
    }[];
    colorTemperature: {
      colorTemperature: {
        mirek: number;
      };
      dimming: {
        brightness: number;
      };
    }[];
  }[]
  | null;
  type: string;
}

export const GET = (async (): Promise<Response> => {
  try {
    const headers = new Headers();
    headers.set('hue-application-key', BRIDGE_USERNAME);

    const opts = {
      headers: headers,
      method: 'GET',
      agent: new https.Agent({
        checkServerIdentity: (hostname: string, cert: PeerCertificate) => {
          // Make sure the peer certificate's common name is equal to
          // the Hue bridgeId that this request is for.
          if (cert.subject.CN === BRIDGE_SERVER_NAME) {
            return undefined;
          } else {
            return new Error('Server identity check failed. CN does not match bridgeId.');
          }
        },
        ca: BRIDGE_SSL_CERT,
      }),
    };

    const res = await fetch(`https://${BRIDGE_IP}/clip/v2/resource/scene`, opts);

    const data: { errors: unknown[]; data: HueScene[] } = (await res.json()) as {
      errors: unknown[];
      data: HueScene[];
    };

    if (!data) {
      throw error(500, 'No data returned from bridge');
    }

    const scenes: Partial<Scene>[] = data?.data?.map((scene: HueScene): Partial<Scene> => {
      return {
        id: scene?.id?.toString(),
        name: scene?.metadata?.name,
        actions: scene?.metadata?.actions,
        image: {
          rid: scene?.metadata?.image?.rid,
          rtype: scene?.metadata?.image?.rtype,
        },
        group: {
          rid: scene?.group?.rid,
          rtype: scene?.group?.rtype,
        },
        pallet: scene?.pallet,
        speed: scene?.metadata?.speed,
        autoDynamic: scene?.metadata?.auto_dynamic,
        type: scene?.type,
      };
    });
    console.log(await json(scenes));

    return json({ scenes });
  } catch (err) {
    console.error(err);
    throw error(500, 'Error fetching scenes');
  }
}) satisfies RequestHandler;
