import { TRPCError } from '@trpc/server';
import { createClient } from '#/lib/supabase/server';
import { publicProcedure } from '#/trpc/init';
import { signUpInput } from '#/trpc/schemas';

export const signUp = publicProcedure
  .input(signUpInput)
  .mutation(async (opts) => {
    const { email, password, firstName, lastName, jobRole } = opts.input;

    const headers = opts.ctx.req?.headers;
    const supabase = await createClient();
    const reqOrigin = headers?.get('origin');
    const emailRedirectTo = new URL(
      '/confirm',
      reqOrigin ?? 'https://app.coeusrisk.ai'
    ).toString();

    console.log('ORIGIN', reqOrigin);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstName,
          lastName,
          jobRole
        },
        emailRedirectTo
      }
    });

    if (error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error.message
      });

    return { ok: true };
  });
