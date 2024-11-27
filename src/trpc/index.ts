import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '#/db';
import { invites } from '#/db/schema';
import authCheck from '#/lib/actions/shared/auth-check';
import { publicProcedure, router } from './trpc';

const getInvitesInput = z.object({
  orgId: z.string(),
  offset: z.number().int().gte(0).optional(),
  limit: z.number().int().gte(0).lte(50).optional()
});

export const appRouter = router({
  getTodos: publicProcedure.query(async (opts) => {
    console.log(opts.ctx);

    return [10, 20, 30];
  }),
  getInvites: publicProcedure.input(getInvitesInput).query(async (opts) => {
    const { user } = opts.ctx;
    const { orgId, offset = 0, limit = 10 } = opts.input;

    const auth = await authCheck({
      user,
      orgId
    });

    if (!auth.ok) return auth;

    const inviteList = await db
      .select()
      .from(invites)
      .where(eq(invites.orgId, orgId))
      .offset(offset)
      .limit(limit);

    return inviteList;
  })
});

export type AppRouter = typeof appRouter;
