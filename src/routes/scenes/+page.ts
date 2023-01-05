import type { PageLoad } from './$types';

export const load: PageLoad = (async ({ fetch }) => {
  try {
    const res = await fetch('/api/scenes');

    return await res.json();
  } catch (err) {
    return { error: 'Failed to load scenes' };
  }
}) satisfies PageLoad;
