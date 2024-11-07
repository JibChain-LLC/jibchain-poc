'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { UserLoginSchema } from '#/lib/schema/user-login';
import { createClient } from '#/lib/supabase/server';

export default async function loginUser(opts: UserLoginSchema) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(opts);

  if (error) return { message: error.message, code: error.code };

  revalidatePath('/', 'layout');
  redirect('/organization');
}
