import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createClient } from '#/lib/supabase/server';
import { authProcedure } from '#/trpc/init';
import { updateUserInput } from '#/trpc/schemas';


export const updateUser = authProcedure
  .input(updateUserInput)
  .mutation(async ({ ctx, input }) => {
    const { user } = ctx;
    const supabase = await createClient();

    if (!user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You must be logged in to update your information.',
      });
    }

    const updates: Record<string, string> = {};

    if (input.firstName) updates.firstName = input.firstName;
    if (input.lastName) updates.lastName = input.lastName;
    if (input.jobRole) updates.jobRole = input.jobRole;


    if (input.email) {
      const { error: emailError } = await supabase.auth.updateUser({ email: input.email });
      if (emailError) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Email update failed: ${emailError.message}`,
        });
      }
    }

    if (input.password) {
      const { error: passwordError } = await supabase.auth.updateUser({ password: input.password });
      if (passwordError) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Password update failed: ${passwordError.message}`,
        });
      }
    }

    if (Object.keys(updates).length > 0) {
      const { error: metadataError, data } = await supabase.auth.updateUser({ data: updates });
      if (metadataError) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Metadata update failed: ${metadataError.message}`,
        });
      }
    }

    return { success: true, message: 'User information updated successfully.' };
  });
