'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { db } from '#/db';
import { RoleEnum, organizations } from '#/db/schema';
import authCheck from '../shared/auth-check';
import { ActionRes } from '../types';

interface DeleteOrgOpts {
  orgId: string;
}

/**
 * Delete organizaiton by id
 *
 * Must by owner of organization to be able to do so.
 */
export default async function deleteOrg(
  opts: DeleteOrgOpts
): Promise<ActionRes<{ deletedId: string }>> {
  const { orgId } = opts;

  const auth = await authCheck({ orgId, rolesNeeded: [RoleEnum.OWNER] });
  if (!auth.ok) return auth;

  const [deleted] = await db
    .delete(organizations)
    .where(eq(organizations.id, orgId))
    .returning({ deletedId: organizations.id });

  revalidatePath('/organization', 'page');

  return {
    ok: true,
    status: 200,
    data: deleted
  };
}
