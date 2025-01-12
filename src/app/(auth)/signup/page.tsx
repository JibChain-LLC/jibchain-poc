import 'server-only';

import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '#/lib/supabase/server';
import SignUpForm from './_components/sign-up-form';

export const metadata: Metadata = {
  title: 'Sign Up'
};

export default async function SignUpPage() {
  const supabase = await createClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (session !== null) return redirect('/dashboard');

  return (
    <div className='flex h-full flex-row items-center justify-center'>
      <SignUpForm />
    </div>
  );
}
