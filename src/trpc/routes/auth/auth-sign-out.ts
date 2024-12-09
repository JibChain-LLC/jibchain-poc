import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { createClient } from '#/lib/supabase/server';
import { publicProcedure } from '#/trpc/init';

export const signOut = publicProcedure.mutation(async () => {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (user) await supabase.auth.signOut();

  const cookieStore = await cookies();
  cookieStore.delete('current-org');

  revalidatePath('/', 'layout');
  return { ok: true };
});
