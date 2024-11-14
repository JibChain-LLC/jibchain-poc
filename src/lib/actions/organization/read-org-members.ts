'use server';

import { eq } from 'drizzle-orm';
import { db } from '#/db';
import { users } from '#/db/auth-schema';
import { RoleEnum, roles } from '#/db/schema';
import authCheck from '../shared/auth-check';
import { ActionRes, PaginationOpts } from '../types';

interface OrgMembersReadListOpts extends PaginationOpts {
  orgId: string;
}

export type Member = Omit<typeof users.$inferSelect, 'userMetadata'> &
  Pick<typeof roles.$inferSelect, 'role' | 'active'> &
  Partial<typeof users.$inferSelect.userMetadata>;

/**
 * Get list of users with their roles for a given organization
 */
export default async function getOrgMembers(
  opts: OrgMembersReadListOpts
): Promise<ActionRes<Member[]>> {
  const { orgId, offset = 0, limit = 10 } = opts;

  const auth = await authCheck({
    orgId,
    rolesNeeded: [RoleEnum.OWNER, RoleEnum.ADMIN, RoleEnum.USER]
  });

  if (!auth.ok) return auth;

  const members = await db
    .select({
      id: users.id,
      email: users.email,
      role: roles.role,
      active: roles.active,
      lastSignIn: users.lastSignIn,
      userMetadata: users.userMetadata
    })
    .from(roles)
    .where(eq(roles.orgId, orgId))
    .innerJoin(users, eq(users.id, roles.userId))
    .offset(offset)
    .limit(limit);

  return {
    ok: true,
    status: 200,
    data: members.map((m) => {
      const { userMetadata, ...rest } = m;

      return {
        ...rest,
        firstName: userMetadata?.firstName,
        lastName: userMetadata?.lastName,
        jobRole: userMetadata?.jobRole
      };
    })
  };
}
