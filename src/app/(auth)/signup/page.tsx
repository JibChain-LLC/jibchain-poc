import SignUpForm from '#/components/sign-up-form';
import 'server-only';

export default async function SignUpPage() {
  return (
    <div className='flex h-full flex-row items-center justify-center'>
      <SignUpForm />
    </div>
  );
}
