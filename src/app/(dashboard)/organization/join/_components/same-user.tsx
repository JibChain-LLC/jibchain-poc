'use client';

import { LoaderCircle, SquareCheckBig } from 'lucide-react';
import { useRouter } from 'next/navigation';
import invalidateAll from '#/app/(auth)/logout/action';
import { Button } from '#/components/ui/button';
import { trpc } from '#/trpc/query-clients/client';

export default function SameUser(props: { inviteId: string }) {
  const { inviteId } = props;
  const router = useRouter();

  const { mutate, isPending, isSuccess } = trpc.org.invite.accept.useMutation({
    async onSuccess() {
      await invalidateAll();
      router.push('/organization');
    }
  });

  return (
    <div className='flex flex-row items-center justify-center gap-3 p-4'>
      <Button
        size={'sm'}
        onClick={() => mutate(inviteId)}
        disabled={isPending || isSuccess}>
        {isPending || isSuccess ? (
          <LoaderCircle className='animate-spin' />
        ) : (
          <SquareCheckBig />
        )}
        {!isSuccess ? 'Join Organization' : 'Redirecting'}
      </Button>
    </div>
  );
}
