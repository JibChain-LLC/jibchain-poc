'use server';

import { and, eq } from 'drizzle-orm';
import { db } from '#/db';
import { RoleEnum, roles } from '#/db/schema';
import authCheck from '../shared/auth-check';
import { ActionRes } from '../types';

type UpdateRoleOpts = Pick<typeof roles.$inferSelect, 'orgId' | 'userId'> &
  Partial<Pick<typeof roles.$inferSelect, 'role' | 'active'>>;

/**
 * Updates user role entry
 *
 * Cannot alter `org_id` or `user_id` entry.
 */
export default async function updateRole(
  opts: UpdateRoleOpts
): Promise<ActionRes> {
  const { orgId, userId, ...rest } = opts;

  const auth = await authCheck({
    orgId,
    rolesNeeded: [RoleEnum.OWNER, RoleEnum.ADMIN]
  });
  if (!auth.ok) return auth;

  await db
    .update(roles)
    .set({
      role: rest.role,
      active: rest.active
    })
    .where(and(eq(roles.orgId, orgId), eq(roles.userId, userId)));

  return { ok: true, status: 200 };
}
