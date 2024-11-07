'use server';

import { cookies } from 'next/headers';
import { db } from '#/db';
import { organizations, roles } from '#/db/schema';
import { createClient } from '#/lib/supabase/server';

interface CreateOrg {
  name: string;
}

export default async function createOrganization(values: CreateOrg) {
  const { name } = values;

  const supabase = await createClient();
  const {
    error,
    data: { user }
  } = await supabase.auth.getUser();

  if (error || !user) return { success: false, error: 'user not authed' };
  const cookieStore = await cookies();

  const orgId = await db.transaction(async (tx) => {
    const [org] = await tx
      .insert(organizations)
      .values({ name, ownerId: user.id })
      .returning({ orgId: organizations.id });

    await tx
      .insert(roles)
      .values({ orgId: org.orgId, userId: user.id, role: 'Owner' });

    return org.orgId;
  });

  cookieStore.set('current-org', orgId);
  return { success: true };
}
