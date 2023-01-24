import { error, redirect } from '@sveltejs/kit';
import { generateUsername } from '$lib/utils';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export interface SignupForm {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

let contacts = [
  {
    id: 'de393e6a-1c08-4e6e-9aad-0994fcf0d981',
    name: 'Saul Goodman',
    email: 'saul@example.com',
    password: 'supersecret',
    passwordConfirm: 'supersecret',
  },
];

export const load = () => {
  return {
    contacts,
  };
};

export const actions: Actions = {
  signup: async ({ locals, request }) => {
    /* another way to get form data */
    /* const formData = await request.formData(); */
    /* let name = formData.get('name'); */
    const body = Object.fromEntries(await request.formData());
    const username = generateUsername(body.name.toString().split(' ').join('').toLowerCase());

    try {
      const name = body.name.toString();
      const email = body.email.toString();
      const password = body.password.toString();
      const passwordConfirm = body.passwordConfirm.toString();

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

      const id = crypto.randomUUID();
      const contact = {
        id: id,
        name: name?.toString() || '',
        email: email?.toString() || '',
        password: password?.toString() || '',
        passwordConfirm: passwordConfirm?.toString() || '',
      };

      contacts.push(contact);
      await locals.pb.collection('users').create({ username, ...body });
      console.log(body.email.toString());
      await locals.pb.collection('users').requestVerification(body.email.toString());


    } catch (err) {
      throw error(500, 'error registering user');
    }
    // we could alternatively redirect instead of returning success
    throw redirect(303, '/');
    /* we could return success instead of redirecting */
    /* return { */
    /*   success: true */
    /* }; */
  },
  delete: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id');

    contacts = contacts.filter((contact) => contact.id !== id);

    return {
      success: true,
    };
  },
};
