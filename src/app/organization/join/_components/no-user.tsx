'use client';

import { Button } from '#/components/ui/button';
import { useGoTo } from '#/hooks';

export default function NoUser() {
  const goTo = useGoTo();
  const { pathname, search } = window.location;
  const redirectPath = `${pathname}${search}`;

  return (
    <div className='flex flex-col gap-4 p-4 text-center'>
      <p className='text-sm'>
        You will need to sign in to accept this invitation
      </p>
      <div className='flex flex-row items-center justify-center gap-3'>
        <Button
          size='sm'
          onClick={goTo(
            `/login?redirectTo=${encodeURIComponent(redirectPath)}`
          )}>
          Sign in
        </Button>
        <Button size='sm' onClick={goTo('/signup')}>
          Create an account
        </Button>
      </div>
    </div>
  );
}
