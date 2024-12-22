import { TRPCError } from '@trpc/server';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '#/db';
import { invites } from '#/db/schema/public';
import { RoleEnum } from '#/enums';
import authCheck from '#/lib/server/shared/auth-check';
import { authProcedure } from '#/trpc/init';

const updateInviteInput = z.object({
  inviteId: z.string().uuid(),
  orgId: z.string().uuid(),
  role: z.nativeEnum(RoleEnum).optional()
});

export const updateInvite = authProcedure
  .input(updateInviteInput)
  .mutation(async (opts) => {
    const { user } = opts.ctx;
    const { orgId, inviteId, ...rest } = opts.input;

    const auth = await authCheck({
      user,
      orgId,
      rolesNeeded: [RoleEnum.OWNER, RoleEnum.ADMIN]
    });
    if (!auth.ok)
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: auth.message
      });

    await db
      .update(invites)
      .set({
        role: rest.role
      })
      .where(and(eq(invites.orgId, orgId), eq(invites.id, inviteId)));

    return { ok: true };
  });
