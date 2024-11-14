'use server';

import { headers } from 'next/headers';
import { UserSignUpSchema } from '#/lib/schema/user-sign-up';
import { createClient } from '#/lib/supabase/server';
import { ActionRes } from '../types';

export default async function userSignUp(
  opts: UserSignUpSchema
): Promise<ActionRes> {
  const { email, password, firstName, lastName, jobRole } = opts;

  const supabase = await createClient();
  const origin = (await headers()).get('origin');

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        firstName,
        lastName,
        jobRole
      },
      emailRedirectTo: new URL('/confirm', origin as string).toString()
    }
  });

  if (error) {
    return {
      ok: false,
      status: error.status as Exclude<ActionRes['status'], 200>,
      message: error.message
    };
  }

  return {
    ok: true,
    status: 200
  };
}
