import { eq } from 'drizzle-orm';
import { db } from '#/db';
import { users } from '#/db/auth-schema';
import { roles } from '#/db/schema';

/**
 * Get list of users with their roles for a given organization
 */
export default async function getOrgMembers(orgId: string) {
  return await db
    .select({
      userId: users.id,
      email: users.email,
      role: roles.role
    })
    .from(roles)
    .where(eq(roles.orgId, orgId))
    .innerJoin(users, eq(users.id, roles.userId));
}
