import { TRPCError } from '@trpc/server';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { db } from '#/db';
import { roles } from '#/db/schema/public';
import { RoleEnum } from '#/enums';
import authCheck from '#/lib/server/shared/auth-check';
import { authProcedure } from '#/trpc/init';

const deleteMemberInput = z.object({
  orgId: z.string().uuid(),
  userId: z.string().uuid()
});

export const deleteMember = authProcedure
  .input(deleteMemberInput)
  .mutation(async (opts) => {
    const { user } = opts.ctx;
    const { userId, orgId } = opts.input;

    const cookieStore = await cookies();

    if (user.id !== userId) {
      const auth = await authCheck({
        user,
        orgId,
        rolesNeeded: [RoleEnum.ADMIN, RoleEnum.OWNER]
      });
      if (!auth.ok)
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: auth.message
        });
    }

    await db
      .delete(roles)
      .where(and(eq(roles.orgId, orgId), eq(roles.userId, userId)));

    const currOrgId = cookieStore.get('current-org')?.value;
    if (user.id === userId && currOrgId === orgId) {
      cookieStore.delete('current-org');
      revalidatePath('/');
    }

    return { ok: true };
  });
