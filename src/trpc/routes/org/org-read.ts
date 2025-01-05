import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { db } from '#/db';
import authCheck from '#/lib/server/shared/auth-check';
import isSuperUser from '#/lib/server/shared/is-super-user';
import { authProcedure } from '#/trpc/init';

export const readOrg = authProcedure
  .input(z.string().uuid())
  .query(async (opts) => {
    const orgId = opts.input;
    const user = opts.ctx.user;

    const isAdmin = await isSuperUser(user.id);
    const isMember = await authCheck({
      user,
      orgId
    });

    if (!isAdmin && !isMember.ok) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User does not have access to resource'
      });
    }

    return db.query.organizations.findFirst({
      where: (o, { eq }) => eq(o.id, orgId),
      with: {
        owner: {
          with: { user: true }
        }
      }
    });
  });
