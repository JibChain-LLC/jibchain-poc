import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { db } from '#/db';
import { organizations } from '#/db/schema';
import { createClient } from '#/lib/supabase/server';

/**
 * Checks if user is owner of a given organization
 *
 */
export default async function isUserOwner(orgId: string, userId?: string) {
  let uid = userId;
  if (!uid) {
    const supabase = await createClient();

    const {
      data: { user },
      error
    } = await supabase.auth.getUser();

    if (error || !user) return redirect('/login');
    uid = user.id;
  }

  const [{ ownerId }] = await db
    .select({ ownerId: organizations.ownerId })
    .from(organizations)
    .where(eq(organizations.id, orgId));

  return ownerId === uid;
}
