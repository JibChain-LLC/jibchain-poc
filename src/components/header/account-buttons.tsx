'use client';

import { useRouter } from 'next/navigation';
import { Button } from '#/components/ui/button';

enum AuthPaths {
  LOGIN = '/login',
  SIGNUP = '/signup'
}

export default function AccountButtons() {
  const router = useRouter();

  const goTo = (p: AuthPaths) => {
    return () => router.push(p);
  };

  return (
    <div className='flex flex-row gap-2'>
      <Button variant='outline' onClick={goTo(AuthPaths.LOGIN)}>
        Login
      </Button>
      <Button onClick={goTo(AuthPaths.SIGNUP)}>Sign-up</Button>
    </div>
  );
}
