'use server';

import { and, eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { db } from '#/db';
import { invites, roles } from '#/db/schema';
import authCheck from '../shared/auth-check';
import { ActionRes } from '../types';

interface AcceptInviteOpts {
  inviteId: string;
}

/**
 * Accepts a given invitation.
 *
 * Will add new entry to the `roles` table for user with role defined in invite
 * and delete the invite itself.
 */
export default async function acceptInvite(
  opts: AcceptInviteOpts
): Promise<ActionRes> {
  const { inviteId } = opts;

  const auth = await authCheck();
  if (!auth.ok) return auth;
  const user = auth.data.user;

  const [invite] = await db
    .select()
    .from(invites)
    .where(and(eq(invites.id, inviteId), eq(invites.email, user.email!)));

  if (!invite) return { ok: false, status: 400, message: 'No matching invite' };

  const cookieStore = await cookies();
  await db.transaction(async (tx) => {
    await db.insert(roles).values({
      userId: user.id,
      role: invite.role,
      orgId: invite.orgId,
      active: true
    });

    await tx
      .delete(invites)
      .where(and(eq(invites.id, inviteId), eq(invites.email, user.email!)));
  });

  cookieStore.set('current-org', invite.orgId);

  return {
    ok: true,
    status: 200
  };
}
