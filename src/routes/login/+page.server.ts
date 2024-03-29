import { appendToErrorMessage } from '$lib/utils';
import { redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export interface LoginForm {
  email: string;
  password: string;
}

export const actions: Actions = {
  login: async ({ locals, request }) => {
    /* another way to get form data */
    /* const formData = await request.formData(); */
    /* let name = formData.get('name'); */
    const body = Object.fromEntries(await request.formData());
    const email = body.email.toString();
    const password = body.password.toString();

    try {
      let errMessage = '';

      if (!email) {
        errMessage = appendToErrorMessage(errMessage, 'Email is required');
      }
      if (!password) {
        errMessage = appendToErrorMessage(errMessage, 'Password is required');
      }

      if (!!errMessage)
        return fail(400, {
          error: true,
          message: errMessage,
          email,
        });

      await locals.pb.collection('users').authWithPassword(email, password);
      if (!locals.pb?.authStore?.model?.verified) {
        locals.pb.authStore.clear();
        return fail(400, {
          error: true,
          message: 'You must verify your email address before logging in',
          email,
        });
      }
    } catch (err: any | { data: { message: string } }) {
      console.error('error logging in', err);
      return fail(500, {
        error: true,
        message: err?.data?.message || 'Error logging in',
        email,
      });
    }
    throw redirect(303, '/');
  },
};
