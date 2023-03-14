import type { Light } from '$lib/types/protocol';
import type { Groups } from '$lib/types/protocol';
import type { PageLoad, PageData } from './$types';

export const ssr = false;

export const load: PageLoad = (async (): Promise<
PageData | { lights: Light[]; groups: Groups }
> => {
  try {
    return { lights: [], groups: {} };
  } catch (err) {
    return { error: 'Failed to load lights' };
  }
}) satisfies PageLoad;
