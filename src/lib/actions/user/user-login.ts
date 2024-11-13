'use server';

import { revalidatePath } from 'next/cache';
import { UserLoginSchema } from '#/lib/schema/user-login';
import { createClient } from '#/lib/supabase/server';
import { ActionRes, ErrorRes } from '../types';

interface LoginUserOpts extends UserLoginSchema {
  redirectTo?: string;
}

export default async function loginUser(
  opts: LoginUserOpts
): Promise<ActionRes> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(opts);

  if (error)
    return {
      ok: false,
      status: parseInt(error.code || '500') as ErrorRes['status'],
      message: error.message
    };

  revalidatePath('/', 'layout');
  // redirect(opts.redirectTo ?? '/organization');

  return {
    ok: true,
    status: 200
  };
}
