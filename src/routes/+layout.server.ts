import type { LayoutServerLoad } from './$types';

export const load = (({ locals }) => {
  return !!locals.user ? { user: locals.user } : undefined;
}) satisfies LayoutServerLoad;
