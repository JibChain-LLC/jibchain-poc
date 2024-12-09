'use server';

import { and, eq } from 'drizzle-orm';
import { db } from '#/db';
import { RoleEnum, invites } from '#/db/schema';
import authCheck from '../shared/auth-check';
import { ActionRes } from '../types';

type UpdateInviteOpts = Pick<typeof invites.$inferSelect, 'orgId' | 'id'> &
  Partial<Pick<typeof invites.$inferSelect, 'role'>>;

/**
 * Update invite entry in the database
 *
 * Requires Admin or Owner roles.
 */
export default async function updateInvite(
  opts: UpdateInviteOpts
): Promise<ActionRes> {
  const { orgId, id, ...rest } = opts;

  const auth = await authCheck({
    orgId,
    rolesNeeded: [RoleEnum.OWNER, RoleEnum.ADMIN]
  });
  if (!auth.ok) return auth;

  await db
    .update(invites)
    .set({
      role: rest.role
    })
    .where(and(eq(invites.orgId, orgId), eq(invites.id, id)));

  return {
    ok: true,
    status: 200
  };
}
