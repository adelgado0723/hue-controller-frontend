import PocketBase from 'pocketbase';
import { serializeNonPOJOs } from '$lib/utils';
import type { Handle } from '@sveltejs/kit';
import { variables } from '$lib/variables';
const { ENV, BE_URL } = variables;


export const handle = (async ({ event, resolve }) => {
  event.locals.pb = new PocketBase(BE_URL);
  event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

  if(event.locals.pb.authStore.isValid) {
    event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model);
  } else {
    event.locals.user = undefined;
  }

  const response = await resolve(event);

  response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: ENV !== 'dev' }));

  return response;
}) satisfies Handle;
