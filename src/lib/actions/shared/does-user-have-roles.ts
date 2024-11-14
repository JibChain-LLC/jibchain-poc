import { and, eq, inArray } from 'drizzle-orm';
import { db } from '#/db';
import { RoleEnum, roles } from '#/db/schema';

interface DoesUserHaveRolesOpts {
  /**
   * Roles to check for.
   * If left empty will only check if they are a member of the organization
   */
  rolesNeeded?: RoleEnum[];
  /** user to check access for */
  userId: string;
  /** organization to check against */
  orgId: string;
}

/**
 * Helper to ensure a given user has certain roles within an organization
 */
export default async function doesUserHaveRoles(
  opts: DoesUserHaveRolesOpts
): Promise<boolean> {
  const { orgId, userId, rolesNeeded } = opts;

  const userRoles = await db.$count(
    roles,
    and(
      eq(roles.orgId, orgId),
      eq(roles.userId, userId),
      rolesNeeded ? inArray(roles.role, rolesNeeded) : undefined
    )
  );

  return userRoles >= 1;
}
