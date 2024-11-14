'use client';

import { useMutation } from '@tanstack/react-query';
import { LoaderCircle, SquareCheckBig } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '#/components/ui/button';
import acceptInvite from '#/lib/actions/invite/accept-invite ';

export default function SameUser(props: { inviteId: string }) {
  const { inviteId } = props;
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const res = await acceptInvite({ inviteId });
      if (!res.ok) throw new Error(res.message);
      return res;
    },
    onSuccess: () => {
      router.push('/organization');
    }
  });

  return (
    <div className='flex flex-row items-center justify-center gap-3 p-4'>
      <Button size={'sm'} onClick={() => mutate()} disabled={isPending}>
        {isPending ? (
          <LoaderCircle className='animate-spin' />
        ) : (
          <SquareCheckBig />
        )}
        Join Organization
      </Button>
    </div>
  );
}
