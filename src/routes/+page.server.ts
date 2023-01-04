import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const api = {};
  return { bridgeAPI: api };
};
