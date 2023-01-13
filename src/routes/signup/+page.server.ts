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
    passwordConfirm: 'supersecret'
  }
];

export const load = () => {
  return {
    contacts
  };
};

export const actions: Actions = {
  create: async ({ request }) => {
    const formData = await request.formData();

    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const passwordConfirm = formData.get('passwordConfirm');

    // TODO: add validation
    if (!!name && name?.length < 2) {
      return fail(400, {
        error: true,
        message: 'Name must be at least 2 characters long',
        name,
        email
      });
    }

    if (!email) {
      return fail(400, {
        error: true,
        message: 'Email is required',
        name,
        email
      });
    }

    if (!password) {
      return fail(400, {
        error: true,
        message: 'Password is required',
        name,
        email
      });
    }

    if (!passwordConfirm) {
      return fail(400, {
        error: true,
        message: 'Password confirmation is required',
        name,
        email
      });
    }

    const id = crypto.randomUUID();
    const contact = {
      id: id,
      name: name?.toString() || '',
      email: email?.toString() || '',
      password: password?.toString() || '',
      passwordConfirm: passwordConfirm?.toString() || ''
    };

    contacts.push(contact);

    // we could alternatively redirect instead of returning success
    /* throw redirect(303, '/signup'); */
    return {
      success: true
    };
  },
  delete: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id');

    contacts = contacts.filter((contact) => contact.id !== id);

    return {
      success: true
    };
  }
};
