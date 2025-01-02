import 'server-only';

import { type User } from '@supabase/supabase-js';
import { and, eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { db } from '#/db';
import { profiles } from '#/db/schema/public';
import { createClient } from '#/lib/supabase/server';
import { type WithAuthOpts } from './types';

async function isSuperUser(uid: string) {
  const c = await db.$count(
    profiles,
    and(eq(profiles.id, uid), eq(profiles.isSuperUser, true))
  );

  return c > 0;
}

/**
 * Wrapper function when exporting a server component that requires access to the user object
 *
 * @param comp functional component definition
 * @param fallback fallback if not authed
 * @returns function component
 */
export function withAuthUser<P = object>(
  Comp: React.FC<P & { user: User }>,
  opts: WithAuthOpts = { fallback: () => null }
) {
  return async function WithUser(props: P) {
    const supabase = await createClient();
    const {
      data: { user },
      error
    } = await supabase.auth.getUser();

    if (
      !user ||
      error ||
      (opts.requireSuperUser === true && !(await isSuperUser(user.id)))
    ) {
      if ('fallback' in opts) {
        if (typeof opts.fallback === 'function') return <opts.fallback />;
        else return <>{opts.fallback}</>;
      } else return redirect(opts.redirectTo);
    }

    return <Comp {...props} user={user} />;
  };
}
