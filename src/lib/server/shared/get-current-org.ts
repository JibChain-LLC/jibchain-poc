'use server';

import { redirect } from 'next/navigation';
import { createClient } from '../../supabase/server';

interface DB {
  public: {
    Tables: {
      roles: {
        Row: {
          user_id: string;
          org_id: string;
        };
      };
    };
  };
}

/**
 * Pure function to get the first organization a user is a member of
 *
 * If not a member of any organization returns empty string.
 */
export default async function getUserCurrentOrg(
  userId?: string
): Promise<string> {
  let uid = userId;
  const supabase = await createClient<DB>();
  if (!uid) {
    const { error, data } = await supabase.auth.getUser();

    if (error || !data.user) return redirect('/login');
    uid = data.user.id;
  }

  console.log('attempting to find org for user:', uid);

  // use postgrest for edge runtime
  const res = await supabase
    .from('roles')
    .select('org_id')
    .eq('user_id', uid)
    .eq('active', true)
    .limit(1);

  const orgId =
    res.status !== 200 || !res.data || res.data.length === 0
      ? ''
      : res.data[0].org_id;

  console.log('org found for user', uid, orgId ? orgId : 'NONE!');
  return orgId;
}
