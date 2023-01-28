import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  updateEmail: async ({ request, locals }) => {
    const data = Object.fromEntries(await request.formData());

    try {
      await locals.pb.collection('users').requestEmailChange(data.email.toString());
    } catch (err: { status: number; message: string } | any) {
      console.log('Error: ', err);
      throw error(err.status, err.message);
    }
    return {
      success: true,
    };
  },

  updateUsername: async ({ request, locals }) => {
    const data = Object.fromEntries(await request.formData());

    try {
      await locals.pb
        .collection('users')
        .getFirstListItem(`username = "${data.username.toString()}"`);
    } catch (err: { status: number; message: string } | any) {
      if (err.status === 404) {
        try {
          const { username } = await locals.pb
            .collection('users')
            .update(locals.user.id, { username: data.username.toString() });
          locals.user.username = username;
          return {
            success: true,
          };
        } catch (updateErr: { status: number; message: string } | any) {
          console.log('Error: ', updateErr);
          throw error(updateErr?.status, updateErr?.message);
        }
      }
      throw error(err?.status, err?.message);
    }
  },
};
