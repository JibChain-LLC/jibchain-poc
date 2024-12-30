'use client';

import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '#/components/ui/button';
import invalidateAll from '#/revalidate-path';
import { trpc } from '#/trpc/query-clients/client';

export default function SameUser(props: { inviteId: string }) {
  const { inviteId } = props;
  const router = useRouter();

  const { mutate, isPending, isSuccess } = trpc.org.invite.accept.useMutation({
    async onSuccess() {
      await invalidateAll();
      router.push('/organization');
      router.refresh();
    }
  });

  return (
    <Button
      className='w-full'
      onClick={() => mutate(inviteId)}
      disabled={isPending || isSuccess}>
      {isPending || (isSuccess && <LoaderCircle className='animate-spin' />)}
      {!isSuccess ? 'Join Team' : 'Redirecting'}
    </Button>
  );
}
