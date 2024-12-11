import { TRPCError } from '@trpc/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { z } from 'zod';
import getUserCurrentOrg from '#/lib/server/shared/get-current-org';
import { createClient } from '#/lib/supabase/server';
import { publicProcedure } from '#/trpc/init';

const loginInput = z.object({
  email: z.string().email(),
  password: z.string()
});

export const login = publicProcedure
  .input(loginInput)
  .mutation(async (opts) => {
    const supabase = await createClient();
    const {
      error,
      data: { user }
    } = await supabase.auth.signInWithPassword(opts.input);

    if (error || !user)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error?.message ?? ''
      });

    const cookieStore = await cookies();
    const orgId = await getUserCurrentOrg(user.id);
    if (orgId) cookieStore.set('current-org', orgId);

    revalidatePath('/', 'layout');
    return { ok: true };
  });
