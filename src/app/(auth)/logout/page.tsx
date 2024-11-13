'use client';

import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useEffectOnce } from 'react-use';
import { Button } from '#/components/ui/button';
import { useTimer } from '#/hooks';
import signOut from '#/lib/actions/user/user-sign-out';

export default function LogoutPage() {
  const { startTimer, current, done } = useTimer(10);

  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffectOnce(() => {
    setLoading(true);
    signOut().then((r) => {
      const { ok } = r;
      if (!ok) return;
      setLoading(false);
      startTimer();
    });
  });

  useEffect(() => {
    if (!done) return;
    router.push('/');
  }, [done, router]);

  return (
    <div className='flex size-full items-center justify-center'>
      <div className='flex-col'>
        {loading ? (
          <>
            <h2 className='mb-3 text-5xl font-bold'>Logging out</h2>
            <LoaderCircle className='animate-spin' />
          </>
        ) : (
          <>
            <p>You have successfully logged out of the application.</p>
            <p>Redirecting to home page in {10 - current} seconds</p>
            <div className='flex gap-4'>
              <Button onClick={() => router.push('/')}>Back to home</Button>
              <Button variant={'outline'} onClick={() => router.push('/login')}>
                Sign in
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
