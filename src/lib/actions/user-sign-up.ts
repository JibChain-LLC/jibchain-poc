'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { UserSignUpSchema } from '#/lib/schema/user-sign-up';
import { createClient } from '#/lib/supabase/server';

export default async function userSignUp(opts: UserSignUpSchema) {
  const { email, password, firstName, lastName } = opts;

  const supabase = await createClient();
  const origin = (await headers()).get('origin');

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        firstName,
        lastName
      },
      emailRedirectTo: new URL('/confirm', origin as string).toString()
    }
  });

  if (error) {
    return redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }

  return redirect(
    `/signup?success=${encodeURIComponent('Thanks for signing up! Please check your email for a verification link')}`
  );
}
