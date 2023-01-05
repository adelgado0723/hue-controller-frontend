import type { PageLoad } from './$types';

export const load: PageLoad = (async ({ fetch }) => {
  try {
    const res = await fetch('/api/lights');

    return await res.json();
  } catch (err) {
    return { error: 'Failed to load lights' };
  }
}) satisfies PageLoad;
