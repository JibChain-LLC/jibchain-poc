import { createClient } from '#/lib/supabase/server';

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
