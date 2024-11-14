import { type EmailOtpType } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server';
import { createClient } from '#/lib/supabase/server';

/**
 * Route for confirming user email after sign up
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tokenHash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('next') ?? '/';

  if (!tokenHash || !type) return redirect('/error');

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({
    type: type,
    token_hash: tokenHash
  });

  if (error) return redirect('/error');
  return redirect(next);
}
