import { eq } from 'drizzle-orm';
import { db } from '#/db';
import { invites } from '#/db/schema';

export default async function getInvites(orgId: string) {
  const inviteList = await db
    .select()
    .from(invites)
    .where(eq(invites.orgId, orgId));
  return inviteList;
}
