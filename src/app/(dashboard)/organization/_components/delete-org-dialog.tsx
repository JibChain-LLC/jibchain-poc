'use client';

import { useMutation } from '@tanstack/react-query';
import { TrashBin } from 'flowbite-react-icons/solid';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '#/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose
} from '#/components/ui/dialog';
import { useToast } from '#/components/ui/use-toast';
import deleteOrg from '#/lib/actions/organization/delete-org';

export default function DeleteOrgDialog(props: {
  orgId: string;
  orgName: string;
}) {
  const { orgId } = props;
  const { toast } = useToast();
  const router = useRouter();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async () => {
      const res = await deleteOrg({
        orgId
      });

      if (!res.ok) throw new Error(res.message);
      return res;
    },
    onSuccess: () => {
      router.push('/');
    },
    onError: (err) => {
      toast({
        variant: 'destructive',
        title: 'Failed to invite user',
        description: err.message
      });
    }
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'destructive'} size={'sm'}>
          <TrashBin />
          Delete Team
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete this organization?
          </DialogTitle>
          <DialogDescription>
            All users will lose access to the dashboard.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={'destructive'}
            disabled={isPending || isSuccess}
            onClick={() => mutate()}>
            {(() => {
              let copy = 'Confirm Deletion';
              if (isSuccess) copy = 'Redirecting';
              else if (isPending) copy = 'Deleting';

              return (
                <>
                  {copy}
                  {(isPending || isSuccess) && (
                    <Loader2 className='animate-spin' />
                  )}
                </>
              );
            })()}
          </Button>
          <DialogClose asChild>
            <Button variant={'outline'}>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
