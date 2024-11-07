import { eq } from 'drizzle-orm';
import { db } from '#/db';
import { invites } from '#/db/schema';

export default async function getOrgInvites(orgId: string) {
  return await db.select().from(invites).where(eq(invites.id, orgId));
}
