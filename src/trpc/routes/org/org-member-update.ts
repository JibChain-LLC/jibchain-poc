import { TRPCError } from '@trpc/server';
import { and, eq } from 'drizzle-orm';
import { createSelectSchema } from 'drizzle-zod';
import { db } from '#/db';
import { roles } from '#/db/schema/public';
import { RoleEnum } from '#/enums';
import authCheck from '#/lib/server/shared/auth-check';
import { authProcedure } from '#/trpc/init';

const updateRoleInput = createSelectSchema(roles)
  .omit({ id: true })
  .partial({ active: true, role: true });

export const updateRole = authProcedure
  .input(updateRoleInput)
  .mutation(async (opts) => {
    const { user } = opts.ctx;
    const { userId, orgId, ...rest } = opts.input;

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
      .update(roles)
      .set({
        role: rest.role,
        active: rest.active
      })
      .where(and(eq(roles.orgId, orgId), eq(roles.userId, userId)));

    return { ok: true };
  });
