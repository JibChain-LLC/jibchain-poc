import { and, eq } from 'drizzle-orm';
import { db } from '#/db';
import { profiles } from '#/db/schema/public';

/**
 * Helper to check if given user is a superuser
 *
 * @param uid User id
 * @returns whether user is superuser
 */
export default async function isSuperUser(uid: string) {
  const c = await db.$count(
    profiles,
    and(eq(profiles.id, uid), eq(profiles.isSuperUser, true))
  );

  return c > 0;
}
