import Link from 'next/link';

export default function NotUser(props: { email: string }) {
  const { email } = props;

  return (
    <div className='flex flex-col gap-3 p-4 text-center text-sm'>
      <p>
        Your email address <b>{email}</b> does not match the email address this
        invitation was sent to.
      </p>
      <p className='text-gray-700'>
        To accept this invitation, you will need to{' '}
        <Link
          href={'/logout'}
          className='font-bold text-red-700 hover:underline'>
          sign out
        </Link>{' '}
        and then sign in or create a new account using the same email address
        used in the invitation.
      </p>
    </div>
  );
}
