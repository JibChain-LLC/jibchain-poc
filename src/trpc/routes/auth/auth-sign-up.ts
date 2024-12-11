import { TRPCError } from '@trpc/server';
import { headers } from 'next/headers';
import { createClient } from '#/lib/supabase/server';
import { publicProcedure } from '#/trpc/init';
import { signUpInput } from '#/trpc/schemas';

export const signUp = publicProcedure
  .input(signUpInput)
  .mutation(async (opts) => {
    const { email, password, firstName, lastName, jobRole } = opts.input;

    const supabase = await createClient();
    const origin = (await headers()).get('origin');

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstName,
          lastName,
          jobRole
        },
        emailRedirectTo: new URL('/confirm', origin as string).toString()
      }
    });

    if (error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error.message
      });

    return { ok: true };
  });
