import { useMutation, useQueryClient } from '@tanstack/react-query';
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
import updateRole from '#/lib/actions/organization/update-user-role';

export default function ToggleActivationDialog(props: {
  orgId: string;
  userId: string;
  active: boolean;
}) {
  const { orgId, userId, active } = props;

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    mutate: toggleActivation,
    isPending,
    isSuccess
  } = useMutation({
    mutationFn: async () => {
      const res = await updateRole({ userId, orgId, active: !active });
      if (!res.ok) throw new Error(res.message);
      return res;
    },
    onError: (data) => {
      toast({
        variant: 'destructive',
        title: 'Failed to deactivate user',
        description: data.message
      });
    }
  });

  const refreshQuery = async () => {
    await queryClient.invalidateQueries({
      queryKey: ['members', { orgId }]
    });
  };

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
              onClick={() => toggleActivation()}>
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
            <DialogClose asChild onClick={refreshQuery}>
              <Button>Continue</Button>
            </DialogClose>
          </DialogFooter>
        </>
      )}
    </>
  );
}
