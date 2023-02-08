import https from 'https';
import type { PeerCertificate } from 'tls';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Light } from '$lib/components/Light/Light';
import { variables } from '$lib/variables';
const { BRIDGE_IP, BRIDGE_USERNAME, BRIDGE_SERVER_NAME, BRIDGE_SSL_CERT } = variables;
import fetch from 'node-fetch';

interface HueLight {
  id: string;
  metadata: {
    name: string;
    archetype: string;
  };
  color: {
    xy: {
      x: number;
      y: number;
    };
  };
  on: {
    on: boolean;
  };
  dimming: {
    brightness: number;
    minDimLevel: number;
  };
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
    const res = await fetch(`https://${BRIDGE_IP}/clip/v2/resource/light`, opts);
    const data: { errors: unknown[]; data: HueLight[] } = (await res.json()) as {
      errors: unknown[];
      data: HueLight[];
    };

    if (!data) {
      throw error(500, 'No data returned from bridge');
    }
    const lights: Light[] = data.data?.map((light: HueLight) => {
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
          minDimLevel: light?.dimming?.minDimLevel,
        },
      };
    });

    return json({ lights });
  } catch (err) {
    console.error(err);
    throw error(500, 'Error fetching lights');
  }
}) satisfies RequestHandler;
