import { BRIDGE_IP, BRIDGE_USERNAME } from '$env/static/private';
import type { PageServerLoad } from './$types';
import { v3 } from 'node-hue-api';

export const load: PageServerLoad = async () => {
  const api = await v3.api.createLocal(BRIDGE_IP).connect(BRIDGE_USERNAME);
  return { bridgeAPI: api };
};
