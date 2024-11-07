import { and, eq, inArray } from 'drizzle-orm';
import { db } from '#/db';
import { RoleEnum, roles } from '#/db/schema';

interface DoesUserHaveRolesOpts {
  rolesNeeded: RoleEnum[];
  userId: string;
  orgId: string;
}

/**
 * helper to ensure a given user has certain roles within an organization
 */
export default async function doesUserHaveRoles(opts: DoesUserHaveRolesOpts) {
  const { orgId, userId, rolesNeeded } = opts;

  const userRoles = await db.$count(
    roles,
    and(
      eq(roles.orgId, orgId),
      eq(roles.userId, userId),
      inArray(roles.role, rolesNeeded)
    )
  );

  return userRoles >= 1;
}
