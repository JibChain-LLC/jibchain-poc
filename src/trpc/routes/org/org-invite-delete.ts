import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '#/db';
import { invites, RoleEnum } from '#/db/schema';
import authCheck from '#/lib/server/shared/auth-check';
import { authProcedure } from '#/trpc/init';

const deleteInvitInput = z.object({
  inviteId: z.string().uuid()
});

export const deleteInvite = authProcedure
  .input(deleteInvitInput)
  .mutation(async (opts) => {
    const { user } = opts.ctx;
    const { inviteId } = opts.input;

    const [invite] = await db
      .select()
      .from(invites)
      .where(eq(invites.id, inviteId));

    if (!invite)
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'No matching invite with that id'
      });

    const auth = await authCheck({
      user,
      orgId: invite.orgId,
      rolesNeeded: [RoleEnum.ADMIN, RoleEnum.OWNER]
    });
    if (!auth.ok)
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: auth.message
      });

    const [deletedInvite] = await db
      .delete(invites)
      .where(eq(invites.id, inviteId))
      .returning({ deletedId: invites.id, email: invites.email });

    return deletedInvite;
  });
