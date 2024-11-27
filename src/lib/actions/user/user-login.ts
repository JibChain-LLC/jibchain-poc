'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { UserLoginSchema } from '#/lib/schema/user-login';
import { createClient } from '#/lib/supabase/server';
import getUserCurrentOrg from '../shared/get-current-org';
import { ActionRes, ErrorRes } from '../types';

interface LoginUserOpts extends UserLoginSchema {
  redirectTo?: string;
}

export default async function loginUser(
  opts: LoginUserOpts
): Promise<ActionRes> {
  const cookieStore = await cookies();
  const supabase = await createClient();
  const {
    error,
    data: { user }
  } = await supabase.auth.signInWithPassword(opts);

  if (!user) {
    return {
      ok: false,
      status: 500,
      message: 'Failed to login'
    };
  }

  if (error)
    return {
      ok: false,
      status: parseInt(error.code || '500') as ErrorRes['status'],
      message: error.message
    };

  // if no cookie for org attempt to set
  if (!cookieStore.get('current-org')) {
    const orgId = await getUserCurrentOrg(user.id);
    if (orgId) cookieStore.set('current-org', orgId);
  }

  revalidatePath('/', 'layout');
  return {
    ok: true,
    status: 200
  };
}
