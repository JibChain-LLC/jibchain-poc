import 'server-only';

import { type Metadata } from 'next';
import SignUpForm from './_components/sign-up-form';

export const metadata: Metadata = {
  title: 'Sign Up'
};

export default async function SignUpPage() {
  return (
    <div className='flex h-full flex-row items-center justify-center'>
      <SignUpForm />
    </div>
  );
}
