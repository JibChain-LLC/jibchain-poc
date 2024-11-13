'use server';

import { eq } from 'drizzle-orm';
import { db } from '#/db';
import { RoleEnum, invites } from '#/db/schema';
import authCheck from '../shared/auth-check';
import { ActionRes } from '../types';

interface DeleteInvitationOpts {
  inviteId: string;
}

type DeletedInvite = {
  deletedId: typeof invites.$inferSelect.id;
  email: typeof invites.$inferSelect.email;
};

/**
 * Deletes currently pending invite
 */
export default async function deleteInvitation(
  opts: DeleteInvitationOpts
): Promise<ActionRes<DeletedInvite>> {
  const { inviteId } = opts;

  const [invite] = await db
    .select()
    .from(invites)
    .where(eq(invites.id, inviteId));

  if (!invite)
    return {
      ok: false,
      status: 400,
      message: 'No matching invite with that id'
    };

  const auth = await authCheck({
    orgId: invite.orgId,
    rolesNeeded: [RoleEnum.ADMIN, RoleEnum.OWNER]
  });
  if (!auth.ok) return auth;

  const [deletedInvite] = await db
    .delete(invites)
    .where(eq(invites.id, inviteId))
    .returning({ deletedId: invites.id, email: invites.email });

  return {
    ok: true,
    status: 200,
    data: deletedInvite
  };
}
