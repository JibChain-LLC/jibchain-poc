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
          active: boolean;
        };
      };
    };
  };
}

/**
 * Pure function to get set of orgs a user is a member of
 */
export default async function getOrgMembership(
  userId?: string
): Promise<Set<string>> {
  let uid = userId;

  try {
    const supabase = await createClient<DB>();
    if (!uid) {
      const { error, data } = await supabase.auth.getUser();

      if (error || !data.user) return redirect('/login');
      uid = data.user.id;
    }

    // use postgrest for edge runtime
    const res = await supabase
      .from('roles')
      .select('org_id')
      .eq('user_id', uid)
      .eq('active', true);

    const orgList =
      res.status !== 200 || !res.data || res.data.length === 0
        ? []
        : res.data.map((o) => o.org_id);

    return new Set(orgList);
  } catch {
    return new Set([]);
  }
}
