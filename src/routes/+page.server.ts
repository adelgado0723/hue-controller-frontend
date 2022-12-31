import { BRIDGE_IP, BRIDGE_USERNAME } from '$env/static/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  /* const api = await v3.api.createLocal(BRIDGE_IP).connect(BRIDGE_USERNAME); */
  const api = {};
  return { bridgeAPI: api };
};
