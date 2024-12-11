import 'server-only';

import { type User } from '@supabase/supabase-js';
import { and, eq, inArray } from 'drizzle-orm';
import { db } from '#/db';
import { RoleEnum, roles } from '#/db/schema';
import { createClient } from '#/lib/supabase/server';

type ActionRes<D> = { ok: true; data: D } | { ok: false; message: string };

type AuthMiddleOpts = Omit<
  Parameters<typeof doesUserHaveRoles>[0],
  'userId'
> & { user?: User | null };

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
 * Helper to perform basic auth checks for server actions
 *
 * Ensures an authenticated user is calling function
 * and is capable of checking their roles for a given organization
 *
 * @param opts parameters for checking roles
 */
export default async function authCheck(
  opts?: AuthMiddleOpts
): Promise<ActionRes<{ user: User }>> {
  let user = opts?.user;
  if (!user) {
    const supabase = await createClient();
    const {
      error,
      data: { user: authUser }
    } = await supabase.auth.getUser();

    if (error || !authUser)
      return { ok: false, message: 'No user authenticated' };

    user = authUser;
  }

  if (opts) {
    const { rolesNeeded, orgId } = opts;
    const hasRole = await doesUserHaveRoles({
      rolesNeeded,
      orgId,
      userId: user.id
    });
    if (!hasRole)
      return {
        ok: false,
        message: 'User does not have sufficient roles'
      };
  }

  return { ok: true, data: { user } };
}

/**
 * Helper to ensure a given user has certain roles within an organization
 */
async function doesUserHaveRoles(
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
