import { TRPCError } from '@trpc/server';
import { and, eq } from 'drizzle-orm';
import { createSelectSchema } from 'drizzle-zod';
import { db } from '#/db';
import { organizations, roles } from '#/db/schema/public';
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

    const isSameUser = userId === user.id;
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

    if (rest.role === RoleEnum.OWNER && !auth.data.roles.has(RoleEnum.OWNER))
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User does not have access to this action'
      });

    const isOwner = auth.data.roles.has(RoleEnum.OWNER);
    if (isSameUser && isOwner) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'User must first transfer ownership'
      });
    }

    const userToAugment = await db.query.roles.findFirst({
      columns: { role: true },
      where: (r, { eq, and }) => and(eq(r.userId, userId), eq(r.orgId, orgId))
    });

    if (userToAugment?.role === RoleEnum.OWNER && !isOwner) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User does not have access to this resource'
      });
    }

    await db.transaction(async (tx) => {
      await tx
        .update(roles)
        .set(rest)
        .where(and(eq(roles.orgId, orgId), eq(roles.userId, userId)));

      if (!isOwner || rest.role !== RoleEnum.OWNER) return;

      // transfer ownership
      await tx
        .update(roles)
        .set({ role: RoleEnum.ADMIN })
        .where(and(eq(roles.orgId, orgId), eq(roles.userId, user.id)));

      await tx
        .update(organizations)
        .set({ ownerId: userId })
        .where(eq(organizations.id, orgId));
    });

    return { ok: true };
  });
