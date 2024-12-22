import 'server-only';

import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '#/db';
import { users } from '#/db/schema/auth';
import { roles } from '#/db/schema/public';
import authCheck from '#/lib/server/shared/auth-check';
import { authProcedure } from '#/trpc/init';

export const getMembersInput = z.object({
  orgId: z.string().uuid(),
  offset: z.number().int().gte(0).optional(),
  limit: z.number().int().gte(0).lte(50).optional()
});

export const getMembers = authProcedure
  .input(getMembersInput)
  .query(async (opts) => {
    const { user } = opts.ctx;
    const { orgId, offset = 0, limit = 10 } = opts.input;

    const auth = await authCheck({
      user,
      orgId
    });

    if (!auth.ok)
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: auth.message
      });

    const members = await db
      .select({
        id: users.id,
        email: users.email,
        role: roles.role,
        active: roles.active,
        lastSignIn: users.lastSignIn,
        userMetadata: users.userMetadata
      })
      .from(roles)
      .where(eq(roles.orgId, orgId))
      .innerJoin(users, eq(users.id, roles.userId))
      .offset(offset)
      .limit(limit);

    return members.map((m) => {
      const { userMetadata, ...rest } = m;

      return {
        ...rest,
        firstName: userMetadata?.firstName,
        lastName: userMetadata?.lastName,
        jobRole: userMetadata?.jobRole
      };
    });
  });
