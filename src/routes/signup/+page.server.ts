import { generateUsername } from '$lib/utils';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export interface SignupForm {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export const actions: Actions = {
  signup: async ({ locals, request }) => {
    /* another way to get form data */
    /* const formData = await request.formData(); */
    /* let name = formData.get('name'); */
    const body = Object.fromEntries(await request.formData());
    const username = generateUsername(body.name.toString().split(' ').join('').toLowerCase());
    const name = body.name.toString();
    const email = body.email.toString();
    const password = body.password.toString();
    const passwordConfirm = body.passwordConfirm.toString();

    try {
      // TODO: add validation
      if (!!name && name?.length < 2) {
        return fail(400, {
          error: true,
          message: 'Name must be at least 2 characters long',
          name,
          email,
        });
      }

      if (!email) {
        return fail(400, {
          error: true,
          message: 'Email is required',
          name,
          email,
        });
      }

      if (!password) {
        return fail(400, {
          error: true,
          message: 'Password is required',
          name,
          email,
        });
      }

      if (!passwordConfirm) {
        return fail(400, {
          error: true,
          message: 'Password confirmation is required',
          name,
          email,
        });
      }

      await locals.pb.collection('users').create({ username, ...body });
      await locals.pb.collection('users').requestVerification(body.email.toString());

    } catch (err: any | { data: { message: string } }) {
      // using fail function here instead of throwing an error to stay on the same page
      return fail(500, {
        error: true,
        message: err?.data?.message || 'error registering useer',
        name,
        email,
      });
    }
    // we could alternatively redirect instead of returning success
    throw redirect(303, '/');
    /* we could return success instead of redirecting */
    /* return { */
    /*   success: true */
    /* }; */
  },
};