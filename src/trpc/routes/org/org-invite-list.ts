import 'server-only';

import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '#/db';
import { invites } from '#/db/schema';
import authCheck from '#/lib/server/shared/auth-check';
import { authProcedure } from '#/trpc/init';

export const getInvitesInput = z.object({
  orgId: z.string(),
  offset: z.number().int().gte(0).optional(),
  limit: z.number().int().gte(0).lte(50).optional()
});

export const getInvites = authProcedure
  .input(getInvitesInput)
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

    const inviteList = await db
      .select()
      .from(invites)
      .where(eq(invites.orgId, orgId))
      .offset(offset)
      .limit(limit);

    return inviteList;
  });
