import { type User } from '@supabase/supabase-js';
import { createClient } from '#/lib/supabase/server';
import { ActionRes } from '../types';
import doesUserHaveRoles from './does-user-have-roles';

type AuthMiddleOpts = Omit<
  Parameters<typeof doesUserHaveRoles>[0],
  'userId'
> & { user?: User | null };

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
      return { ok: false, status: 401, message: 'No user authenticated' };

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
        status: 401,
        message: 'User does not have sufficient roles'
      };
  }

  return { ok: true, status: 200, data: { user } };
}
