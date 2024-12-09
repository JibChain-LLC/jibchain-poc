import { Check, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '#/components/ui/button';
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '#/components/ui/dialog';
import { useToast } from '#/components/ui/use-toast';
import { trpc } from '#/trpc/query-clients/client';

export default function RemoveUserDialog(props: {
  orgId: string;
  userId: string;
  isYou: boolean;
}) {
  const { orgId, userId, isYou } = props;

  const router = useRouter();
  const { toast } = useToast();
  const utils = trpc.useUtils();
  const {
    mutate: removeMember,
    isSuccess,
    isPending
  } = trpc.org.member.delete.useMutation({
    onError: (data) => {
      toast({
        variant: 'destructive',
        title: 'Failed to remove user',
        description: data.message
      });
    },
    onSuccess: () => {
      if (isYou) router.refresh();
    }
  });

  const refreshQuery = async () => {
    utils.org.member.list.invalidate();
  };

  return (
    <>
      {!isSuccess ? (
        <>
          <DialogHeader>
            <DialogTitle>
              {isYou ? 'Leave Organization?' : 'Remove User?'}
            </DialogTitle>
            <DialogDescription>
              {`Are you sure you want to ${isYou ? 'leave this' : 'remove this user from your'} organization?`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              disabled={isPending}
              variant={'destructive'}
              onClick={() => removeMember({ orgId, userId })}>
              {isYou ? 'Leave' : 'Remove'}
              {isPending && <Loader2 className='animate-spin' />}
            </Button>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </>
      ) : (
        <>
          <DialogHeader>
            <DialogTitle className='flex items-center gap-1.5 text-green-500'>
              <div className='flex size-6 items-center justify-center rounded-full bg-green-100'>
                <Check className='size-3' />
              </div>
              User removed
            </DialogTitle>
            <DialogDescription>
              {`User has been successfully removed from this organization`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild onClick={refreshQuery}>
              <Button>Continue</Button>
            </DialogClose>
          </DialogFooter>
        </>
      )}
    </>
  );
}
