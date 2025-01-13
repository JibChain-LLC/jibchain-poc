'use client';

import { Check, Loader2 } from 'lucide-react';
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

export default function ToggleActivationDialog(props: {
  orgId: string;
  userId: string;
  active: boolean;
}) {
  const { orgId, userId, active } = props;

  const { toast } = useToast();
  const {
    mutate: toggleActivation,
    isPending,
    isSuccess
  } = trpc.org.member.update.useMutation({
    onError(err) {
      toast({
        variant: 'destructive',
        title: 'Failed to deactivate user',
        description: err.message
      });
    }
  });

  return (
    <>
      {!isSuccess ? (
        <>
          <DialogHeader>
            <DialogTitle>{`${active ? 'Deactivate' : 'Activate'} User?`}</DialogTitle>
            <DialogDescription>
              {`Are you sure you want to ${active ? 'de' : ''}activate this user from your organization?`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              disabled={isPending || isSuccess}
              variant={active ? 'destructive' : 'default'}
              onClick={() =>
                toggleActivation({ orgId, userId, active: !active })
              }>
              {active ? 'Deactivate' : 'Activate'}
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

              {`User ${active ? 'deactivated' : 'activated'}`}
            </DialogTitle>
            <DialogDescription>
              {`User has been successfully ${active ? 'deactivated' : 'activated'}`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button>Continue</Button>
            </DialogClose>
          </DialogFooter>
        </>
      )}
    </>
  );
}
