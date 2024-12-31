'use client';

import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffectOnce } from 'react-use';
import revalidateAllPath from '#/revalidate-path';
import { trpc } from '#/trpc/query-clients/client';

export default function LogoutPage() {
  const router = useRouter();
  const utils = trpc.useUtils();
  const { mutate, isPending, isSuccess } = trpc.auth.signOut.useMutation({
    async onSuccess() {
      await utils.org.invalidate();
      await revalidateAllPath();
      router.replace('/login');
    },
    onError(err) {
      console.log(err);
    }
  });

  useEffectOnce(() => {
    mutate();
  });

  return (
    <div className='flex flex-col items-center text-center'>
      <p className='mb-3 text-3xl font-bold'>
        {isPending && 'Logging out'}
        {isSuccess && 'Logged out'}
      </p>
      {isPending ? (
        <LoaderCircle className='w-fit animate-spin text-green-700' size={36} />
      ) : (
        <p className='text-gray-500'>Redirecting</p>
      )}
    </div>
  );
}
