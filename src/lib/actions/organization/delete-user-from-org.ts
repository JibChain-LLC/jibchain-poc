'use server';

import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { db } from '#/db';
import { RoleEnum, roles } from '#/db/schema';
import { createClient } from '#/lib/supabase/server';
import authCheck from '../shared/auth-check';
import { ActionRes } from '../types';

interface RemoveUserFromOrgOpts {
  orgId: string;
  userId: string;
}

/**
 * Remove user from organization
 *
 * Calling user must have `Admin` or `Owner` role.
 */
export default async function removeUserFromOrg(
  opts: RemoveUserFromOrgOpts
): Promise<ActionRes> {
  const { orgId, userId } = opts;

  const supabase = await createClient();
  const {
    error,
    data: { user: authUser }
  } = await supabase.auth.getUser();

  if (error || !authUser)
    return { ok: false, status: 401, message: 'No user authenticated' };

  if (authUser.id !== userId) {
    const auth = await authCheck({
      user: authUser,
      orgId,
      rolesNeeded: [RoleEnum.ADMIN, RoleEnum.OWNER]
    });
    if (!auth.ok) return auth;
  }

  await db
    .delete(roles)
    .where(and(eq(roles.orgId, orgId), eq(roles.userId, userId)));

  if (authUser.id === userId) {
    revalidatePath('/');
  }

  return {
    ok: true,
    status: 200
  };
}
