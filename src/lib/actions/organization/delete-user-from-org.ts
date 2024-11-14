'use server';

import { and, eq } from 'drizzle-orm';
import { db } from '#/db';
import { RoleEnum, roles } from '#/db/schema';
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

  const auth = await authCheck({
    orgId,
    rolesNeeded: [RoleEnum.ADMIN, RoleEnum.OWNER]
  });
  if (!auth.ok) return auth;

  await db
    .delete(roles)
    .where(and(eq(roles.orgId, orgId), eq(roles.userId, userId)));

  return {
    ok: true,
    status: 200
  };
}
