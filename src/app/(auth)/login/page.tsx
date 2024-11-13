import { type Metadata } from 'next';
import LoginForm from './_components/login-form';

export const metadata: Metadata = {
  title: 'Login'
};

export default function LoginPage() {
  return (
    <div className='flex size-full items-center justify-center'>
      <LoginForm />
    </div>
  );
}
