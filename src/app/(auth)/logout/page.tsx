'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '#/components/ui/button';
import { useTimer } from '#/hooks';

export default function LogoutPage() {
  const { startTimer, current, done } = useTimer(10);
  const router = useRouter();

  useEffect(() => {
    startTimer();
  }, [startTimer]);

  useEffect(() => {
    if (!done) return;
    router.push('/');
  }, [done, router]);

  return (
    <div className='flex size-full items-center justify-center'>
      <div className='flex-col'>
        <h2 className='mb-3 text-5xl font-bold'>Logged out</h2>
        <p>You have successfully logged out of the application.</p>
        <p>Redirecting to home page in {10 - current} seconds</p>
        <div className='flex gap-4'>
          <Button onClick={() => router.push('/')}>Back to home</Button>
          <Button variant={'outline'} onClick={() => router.push('/login')}>
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
}
