import { TRPCError } from '@trpc/server';
import { db } from '#/db';
import { authProcedure } from '#/trpc/init';

export const readUser = authProcedure.query(async (opts) => {
  const user = opts.ctx.user;

  const profile = await db.query.profiles.findFirst({
    where: (p, { eq }) => eq(p.id, user.id),
    columns: {
      isSuperUser: false
    }
  });

  if (profile === undefined)
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'User with supplied ID does not exist'
    });

  return { ...profile, email: user.email };
});
