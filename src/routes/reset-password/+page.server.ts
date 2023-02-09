import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  resetPassword: async ({ locals, request }) => {
    const body = Object.fromEntries(await request.formData());
    const email = body.email.toString();
    try {
      if (!email) {
        return fail(400, {
          error: true,
          message: 'Email is required',
          email,
        });
      }
      await locals.pb.collection('users').requestPasswordReset(body.email.toString());
      return {
        success: true,
      };
    } catch (err) {
      console.error('error resetting password', err);
      throw fail(500, { 
        error: true,
        message: 'Error resetting password',
        email,
      });
    }
  },
};
