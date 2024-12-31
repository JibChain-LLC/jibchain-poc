import Link from 'next/link';
import { Button } from '#/components/ui/button';

export default function NotUser(props: { email: string }) {
  const { email } = props;

  return (
    <>
      <p className='mb-6 text-center text-base font-medium'>
        Your email address{' '}
        <span className='font-semibold text-green-600'>{email}</span> does not
        not match the email address this invitation was sent to. To accept this
        invitation, please sign out of your current account.
      </p>
      <p className='mb-6 text-center text-base font-medium'>
        Once signed out, create a new account or sign in using the email address
        associated with this invite.
      </p>
      <Button variant={'destructive'} className='w-full' asChild>
        <Link href={'/logout'}>Sign Out</Link>
      </Button>
    </>
  );
}
