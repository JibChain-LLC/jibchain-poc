import 'server-only';

import { type User } from '@supabase/supabase-js';
import { db } from '#/db';
import { RoleEnum } from '#/enums';
import { createClient } from '#/lib/supabase/server';

type ActionRes<D> = { ok: true; data: D } | { ok: false; message: string };

type AuthCheckOpts = {
  user?: User | null;
  orgId: string;
  rolesNeeded?: RoleEnum[];
};

async function authCheck(
  opts: AuthCheckOpts
): Promise<ActionRes<{ user: User; roles: Set<RoleEnum> }>>;
async function authCheck(): Promise<ActionRes<{ user: User }>>;

/**
 * Helper to perform basic auth checks for server actions
 *
 * Ensures an authenticated user is calling function
 * and is capable of checking their roles for a given organization
 *
 * @param opts parameters for checking roles
 */
async function authCheck(
  opts?: AuthCheckOpts
): Promise<ActionRes<{ user: User; roles?: Set<RoleEnum> }>> {
  try {
    let user = opts?.user;
    if (!user) {
      const supabase = await createClient();
      const {
        error,
        data: { user: authUser }
      } = await supabase.auth.getUser();

      if (error || !authUser) throw new Error('No user authenticated');
      user = authUser;
    }

    // return only user data
    // just ensures login
    if (!opts) return { ok: true, data: { user } };

    const { rolesNeeded, orgId } = opts;
    const roleSet = new Set(
      (
        await db.query.roles.findMany({
          columns: { role: true },
          where: (r, { eq, and, inArray }) =>
            and(
              eq(r.orgId, orgId),
              eq(r.userId, user.id),
              eq(r.active, true),
              rolesNeeded ? inArray(r.role, rolesNeeded) : undefined
            )
        })
      ).map((o) => o.role)
    );

    if (roleSet.size <= 0)
      throw new Error(
        'User does not have sufficient roles to perform this action'
      );

    return { ok: true, data: { user, roles: roleSet } };
  } catch (err) {
    let message = 'Internal Error';
    if (err instanceof Error) message = err.message;
    return { ok: false, message };
  }
}

export default authCheck;
