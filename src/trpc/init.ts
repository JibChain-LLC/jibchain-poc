import { initTRPC, TRPCError } from '@trpc/server';
import { createClient } from '#/lib/supabase/server';

const t = initTRPC.context<Context>().create();

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;

export const publicProcedure = t.procedure;
export const authProcedure = t.procedure.use(async (opts) => {
  const { user } = opts.ctx;
  if (!user)
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'User not logged in'
    });

  return opts.next({
    ctx: {
      user
    }
  });
});

export async function createTRPCContext() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return {
    user
  };
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
