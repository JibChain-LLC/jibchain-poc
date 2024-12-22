import { TRPCError } from '@trpc/server';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { db } from '#/db';
import { invites, roles } from '#/db/schema/public';
import { authProcedure } from '#/trpc/init';

export const acceptInvite = authProcedure
  .input(z.string().uuid())
  .mutation(async (opts) => {
    const { user } = opts.ctx;
    const inviteId = opts.input;

    const [invite] = await db
      .select()
      .from(invites)
      .where(and(eq(invites.id, inviteId), eq(invites.email, user.email!)));

    if (!invite)
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'No matching invite'
      });

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
    revalidatePath('/', 'layout');
    return { ok: true };
  });
