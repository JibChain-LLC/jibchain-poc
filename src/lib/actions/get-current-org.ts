'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { db } from '#/db';
import { createClient } from '../supabase/server';
import isUserMemberOfOrg from './is-user-member-org';

export default async function getUserCurrentOrg(userId?: string) {
  let uid = userId;
  if (!uid) {
    const supabase = await createClient();
    const { error, data } = await supabase.auth.getUser();

    if (error || !data.user) return redirect('/login');
    uid = data.user.id;
  }

  const isMember = await isUserMemberOfOrg(uid);
  if (!isMember) return redirect('/organization/no-member');

  const cookieStore = await cookies();
  const orgCookie = cookieStore.get('current-org');

  let orgId = orgCookie?.value;
  if (!orgId) {
    const org = await db.query.roles.findFirst({
      where: (r, { eq }) => eq(r.userId, uid)
    });

    orgId = org!.orgId;
    // cookieStore.set('current-org', orgId);
  }

  return orgId;
}
