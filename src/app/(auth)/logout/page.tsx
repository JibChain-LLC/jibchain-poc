'use client';

import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useEffectOnce } from 'react-use';
import signOut from '#/lib/actions/user/user-sign-out';

export default function LogoutPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffectOnce(() => {
    signOut().then((r) => {
      const { ok } = r;
      if (!ok) return;
      setLoading(false);
      router.push('/');
    });
  });

  return (
    <div className='flex flex-col items-center gap-2 rounded-md border border-gray-200 bg-white px-6 py-8 text-center text-gray-900'>
      <p className='mb-3 text-3xl font-bold'>
        {loading ? 'Logging out' : 'Logged out'}
      </p>
      {loading ? (
        <LoaderCircle className='w-fit animate-spin text-green-700' size={36} />
      ) : (
        <p className='text-gray-500'>Redirecting</p>
      )}
    </div>
  );
}
