import 'server-only';

import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { createClient } from '#/lib/supabase/server';
import LoginForm from './_components/login-form';

export const metadata: Metadata = {
  title: 'Login'
};

export default async function LoginPage() {
  const supabase = await createClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (session !== null) return redirect('/dashboard');

  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
