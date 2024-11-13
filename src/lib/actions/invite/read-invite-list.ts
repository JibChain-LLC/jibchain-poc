'use server';

import { InferSelectModel, eq } from 'drizzle-orm';
import { db } from '#/db';
import { RoleEnum, invites } from '#/db/schema';
import authCheck from '../shared/auth-check';
import { ActionRes, PaginationOpts } from '../types';

interface InviteReadListOpts extends PaginationOpts {
  orgId: string;
}

/**
 * Returns list of currently pending invites for a given organization
 */
export default async function getInvites(
  opts: InviteReadListOpts
): Promise<ActionRes<InferSelectModel<typeof invites>[]>> {
  const { orgId, offset = 0, limit = 10 } = opts;

  const auth = await authCheck({
    orgId,
    rolesNeeded: [RoleEnum.OWNER, RoleEnum.ADMIN, RoleEnum.USER]
  });

  if (!auth.ok) return auth;

  const inviteList = await db
    .select()
    .from(invites)
    .where(eq(invites.orgId, orgId))
    .offset(offset)
    .limit(limit);

  return {
    ok: true,
    status: 200,
    data: inviteList
  };
}
