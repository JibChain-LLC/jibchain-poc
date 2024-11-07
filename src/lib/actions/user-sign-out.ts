'use server';

import { redirect } from 'next/navigation';
import { createClient } from '../supabase/server';

export default async function signUserOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) return redirect('/error');
  return redirect('/logout');
}
