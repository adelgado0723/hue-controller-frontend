import https from 'https';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { variables } from '$lib/variables';
const { BRIDGE_IP, BRIDGE_USERNAME, BRIDGE_SERVER_NAME, BRIDGE_SSL_CERT } = variables;
import fetch from 'node-fetch';
import type { PeerCertificate } from 'tls';
import type { RequestInit } from 'node-fetch';

export const PUT = (async ({ request }) => {
  const { id, options } = await request.json();

  try {
    const headers = new Headers();
    headers.set('hue-application-key', BRIDGE_USERNAME);

    const opts: Partial<RequestInit> = {
      headers: headers,
      method: 'PUT',
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

    const body: Partial<{ on: { on: boolean }; dimming: { brightness: number } }> = {};
    if (options.on !== undefined) {
      body.on = { on: options.on };
    }
    if (options.brightness !== undefined) {
      body.dimming = { brightness: options.brightness };
    }

    opts.body = JSON.stringify(body);
    const res = await fetch(`https://${BRIDGE_IP}/clip/v2/resource/scene/${id}`, opts);
    
    // put into protocol struct

    const data = await res.json();
    if (!data) {
      throw error(500, 'No data returned from bridge');
    }
    console.log(await json(data));
    return json(data);
  } catch (err) {
    console.error(err);
    throw error(500, 'Error updating scene');
  }
}) satisfies RequestHandler;
