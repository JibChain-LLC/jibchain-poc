'use server';

import { cookies } from 'next/headers';
import { db } from '#/db';
import { RoleEnum, organizations, roles } from '#/db/schema';
import authCheck from '../shared/auth-check';
import { ActionRes } from '../types';

interface CreateOrgOpts {
  name: string;
}

/**
 * Create a new organizaton
 *
 * Adds entry to `roles` table with currently authorized user as owner.
 */
export default async function createOrganization(
  opts: CreateOrgOpts
): Promise<ActionRes> {
  const { name } = opts;

  const auth = await authCheck();
  if (!auth.ok) return auth;
  const cookieStore = await cookies();
  const user = await auth.data!.user;

  const orgId = await db.transaction(async (tx) => {
    const [org] = await tx
      .insert(organizations)
      .values({ name, ownerId: user.id })
      .returning({ orgId: organizations.id });

    await tx
      .insert(roles)
      .values({ orgId: org.orgId, userId: user.id, role: RoleEnum.OWNER });

    return org.orgId;
  });

  cookieStore.set('current-org', orgId);
  return { ok: true, status: 200 };
}
