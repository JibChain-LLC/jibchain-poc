import { TRPCError } from '@trpc/server';
import { createClient } from '#/lib/supabase/server';
import { authProcedure } from '#/trpc/init';
import { updateUserInput } from '#/trpc/schemas';

export const updateUser = authProcedure
  .input(updateUserInput)
  .mutation(async (opts) => {
    const { user } = opts.ctx;
    const supabase = await createClient();

    const { firstName, lastName, email, jobRole, password } = opts.input;
    const sanitizedPassword = password ?? undefined;

    if (!user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You must be logged in to update your information.'
      });
    }

    const { error } = await supabase.auth.updateUser({
      email,
      password: sanitizedPassword,
      data: {
        firstName,
        lastName,
        jobRole
      }
    });

    if (error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error.message
      });

    return { success: true, message: 'User information updated successfully.' };
  });
