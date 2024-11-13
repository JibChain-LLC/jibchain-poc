'use server';

import { cookies } from 'next/headers';
import { createClient } from '../../supabase/server';

export default async function signUserOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) return { ok: false, message: error.message };

  const cookieStore = await cookies();
  cookieStore.delete('current-org');
  return { ok: true };
}
