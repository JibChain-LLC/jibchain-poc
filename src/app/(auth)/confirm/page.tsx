import 'server-only';

import { type EmailOtpType } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { createClient } from '#/lib/supabase/server';

interface ConfirmParms {
  token_hash?: string;
  type?: string;
  next?: string;
}

interface ConfirmPageProps {
  searchParams: ConfirmParms;
}

export default async function ConfirmPage(props: ConfirmPageProps) {
  const { searchParams } = props;

  const tokenHash = searchParams.token_hash;
  const type = searchParams.type as EmailOtpType | null;
  const next = searchParams.next ?? '/';

  if (!tokenHash || !type) throw new Error('No search params');

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({
    type: type,
    token_hash: tokenHash
  });

  if (error) throw new Error(error.message);
  return redirect(next);
}
