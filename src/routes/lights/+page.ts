import type { Light } from '$lib/components/Light/Light';
import { variables } from '$lib/variables';
/* import type { Handle } from '@sveltejs/kit'; */
import { error, json } from '@sveltejs/kit';
import axios, { AxiosHeaders } from 'axios';
import https from 'https';
import type { PeerCertificate } from 'tls';
import type { PageLoad } from './$types';
const { BRIDGE_IP, BRIDGE_USERNAME, BRIDGE_SERVER_NAME, BRIDGE_SSL_CERT } = variables;

/* export const handle = async (({ event, resolve }) => { */
/*   return resolve(event, { ssr: false }); */
/* }) satisfies Handle; */
export const ssr = false;

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

export const load: PageLoad = (async () => {
  try {
    const headers = new AxiosHeaders();
    headers.set('hue-application-key', BRIDGE_USERNAME);

    const res = await axios.request({
      url: `https://${BRIDGE_IP}/clip/v2/resource/light`,
      headers: headers,
      method: 'GET',
      httpsAgent: new https.Agent({
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
    });

    if (!res.data) {
      throw error(500, 'No data returned from bridge');
    }
    console.log(res.data);
    console.log('Fetch from front end worked!');
    const lights: Light[] = res.data.map((light: HueLight) => {
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
    return { error: 'Failed to load lights' };
  }
}) satisfies PageLoad;
