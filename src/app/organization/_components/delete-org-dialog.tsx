'use client';

import { useMutation } from '@tanstack/react-query';
import { LoaderCircle, Trash2 } from 'lucide-react';
import { Button } from '#/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '#/components/ui/dialog';
import { useGoTo } from '#/hooks';
import deleteOrg from '#/lib/actions/organization/delete-org';

interface DeleteOrgDialogProps {
  orgName: string;
  orgId: string;
}

export default function DeleteOrgDialog(props: DeleteOrgDialogProps) {
  const { orgName, orgId } = props;

  const goTo = useGoTo();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async () => {
      const res = await deleteOrg({ orgId });
      if (!res.ok) throw new Error(res.message);
      return res;
    },
    onSuccess: goTo('/')
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'destructive'} className='w-fit'>
          <Trash2 />
          Delete Organization
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {orgName}</DialogTitle>
          <DialogDescription>
            This will delete the entirety of the organization. Are you sure you
            want to do this?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={'destructive'}
            disabled={isPending || isSuccess}
            onClick={() => mutate()}>
            {(isPending || isSuccess) && (
              <LoaderCircle className='animate-spin' />
            )}
            {!isPending && !isSuccess && 'Yes. Delete the organization.'}
            {isPending && 'Deleting'}
            {isSuccess && 'Redirecting'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
