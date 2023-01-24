import { error, json } from '@sveltejs/kit';
// @ts-ignore -- svekt kit has trouble with this
import { BRIDGE_IP, BRIDGE_USERNAME } from '$env/static/private';
import type { RequestHandler } from './$types';

export const PUT = (async ({ request }) => {
  const { id, options } = await request.json();
  
  try {
    const headers = new Headers();
    headers.set('hue-application-key', BRIDGE_USERNAME);

    const req = {
      method: 'PUT',
      headers,
      body: '',
    };

    const body: Partial<{ on: { on: boolean }; dimming: { brightness: number } }> = {};
    if (options.on !== undefined) {
      body.on = { on: options.on };
    }
    if (options.brightness !== undefined) {
      body.dimming = { brightness: options.brightness };
    }

    req.body = JSON.stringify(body);
    const res = await fetch(`https://${BRIDGE_IP}/clip/v2/resource/light/${id}`, req);

    const data = await res.json();
    return json(data);
  } catch (err) {
    throw error(500, 'Error updating light');
  }
}) satisfies RequestHandler;
