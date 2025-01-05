import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import { db } from '#/db';
import { organizations } from '#/db/schema/public';
import { RoleEnum } from '#/enums';
import authCheck from '#/lib/server/shared/auth-check';
import isSuperUser from '#/lib/server/shared/is-super-user';
import { authProcedure } from '#/trpc/init';
import { updateOrgInput } from '#/trpc/schemas';

export const updateOrg = authProcedure
  .input(updateOrgInput)
  .mutation(async (opts) => {
    const { id, ...rest } = opts.input;
    const user = opts.ctx.user;

    const isMember = await authCheck({
      user,
      orgId: id,
      rolesNeeded: [RoleEnum.ADMIN, RoleEnum.OWNER]
    });

    if (!isMember.ok && !(await isSuperUser(user.id))) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User does not have permission to perform this action.'
      });
    }

    await db.update(organizations).set(rest).where(eq(organizations.id, id));

    return { ok: true };
  });
