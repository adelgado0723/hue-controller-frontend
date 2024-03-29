import type { LayoutServerLoad } from './$types';

export const load = (() => {
  return {
    sections: [
      { slug: 'profile', title: 'Profile' },
      { slug: 'notifications', title: 'Notifications' },
    ],
  };
}) satisfies LayoutServerLoad;
