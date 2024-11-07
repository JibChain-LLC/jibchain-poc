import { type User } from '@supabase/supabase-js';
import { createClient } from '#/lib/supabase/server';
import doesUserHaveRoles from './does-user-have-roles';

interface ActionResponse<O> {
  ok: O;
  [key: string]: unknown;
}

type SuccessResponse = ActionResponse<true>;
type ErrorResponse = ActionResponse<false>;

type AuthMiddleOpts = Omit<Parameters<typeof doesUserHaveRoles>[0], 'userId'>;

/**
 * wrapper to perform basic auth checks for server actions
 * ensures an authenticated user is calling function
 * and is capable of checking their roles for a given organization
 *
 * @param fn function requiring authenication
 * @param opts parameters for checking roles
 */
export default async function authMiddleware(
  fn: (user: User) => Promise<SuccessResponse | ErrorResponse>,
  opts?: AuthMiddleOpts
): Promise<SuccessResponse | ErrorResponse> {
  const supabase = await createClient();
  const {
    error,
    data: { user }
  } = await supabase.auth.getUser();

  if (error || !user) return { ok: false };
  if (opts) {
    const { rolesNeeded, orgId } = opts;
    const hasRole = await doesUserHaveRoles({
      rolesNeeded,
      orgId,
      userId: user.id
    });
    if (!hasRole) return { ok: false };
  }

  const v = await fn(user);
  return v;
}
