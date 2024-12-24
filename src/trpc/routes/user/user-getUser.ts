import { authProcedure } from "#/trpc/init";
import { createClient } from '#/lib/supabase/server';
import { TRPCError } from "@trpc/server";

export const getUser = authProcedure.query(async ({ ctx }) => {
  const { user } = ctx;
  const supabase = await createClient();

  if (!user) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'You must be logged in.' });
  }

  const { data, error } = await supabase.auth.getUser();
  console.log(data)
  if (error) {
    throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
  }

  return data.user.user_metadata || {};
});
