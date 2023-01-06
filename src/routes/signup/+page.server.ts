import { fail, invalid } from '@sveltejs/kit';
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
    company: 'Saul Goodman & Associates',
    job: 'Attorney',
  },
];

export const load = () => {
  return {
    contacts,
  };
};

export const actions = {
  create: async ({ request }) => {
    const formData = await request.formData();

    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const passwordConfirm = formData.get('passwordConfirm');
    const company = formData.get('company');
    const job = formData.get('job');

    // TODO: add validation
    if (!!name && name?.length < 2) {
      return fail(400, {
        error: true,
        message: 'Name must be at least 2 characters long',
        name,
        email,
        company,
        job,
      });
    }

    const id = crypto.randomUUID();
    const contact = {
      id,
      name,
      email,
      company,
      job,
      password,
      passwordConfirm,
    };

    contacts.push(contact);

    /* throw redirect(303, '/signup'); */

    return {
      success: true,
    };
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
