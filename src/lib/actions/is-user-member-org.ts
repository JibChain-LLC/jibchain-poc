import { eq } from 'drizzle-orm';
import { db } from '#/db';
import { roles } from '#/db/schema';

/**
 * check if user is a member of any organization
 *
 * @param userId user id string
 */
export default async function isUserMemberOfOrg(userId: string) {
  const count = await db.$count(roles, eq(roles.userId, userId));
  return count > 0;
}
