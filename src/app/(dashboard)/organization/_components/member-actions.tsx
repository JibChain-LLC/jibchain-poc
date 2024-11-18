import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MoreVertical } from 'lucide-react';
import { Button } from '#/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '#/components/ui/dropdown-menu';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '#/components/ui/sheet';
import { useToast } from '#/components/ui/use-toast';
import useUserMetadata from '#/hooks/use-user-metadata';
import removeUserFromOrg from '#/lib/actions/organization/delete-user-from-org';
import { Member } from '#/lib/actions/organization/read-org-members';
import updateRole from '#/lib/actions/organization/update-user-role';

export default function MemberActions(
  props: Omit<Member, 'lastSignIn'> & { orgId: string }
) {
  const { email, id, orgId, active } = props;
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const userData = useUserMetadata();

  const { mutate: toggleActivation } = useMutation({
    mutationFn: async () => {
      const res = await updateRole({ userId: id, orgId, active: !active });
      if (!res.ok) throw new Error(res.message);
      return res;
    },
    onError: (data) => {
      toast({
        variant: 'destructive',
        title: 'Failed to deactivate user',
        description: data.message
      });
    },
    onSuccess: async () => {
      toast({
        title: 'User deactivated'
      });
      return await queryClient.invalidateQueries({
        queryKey: ['members', { orgId }]
      });
    }
  });

  const { mutate: removeUser } = useMutation({
    mutationFn: async () => {
      const res = await removeUserFromOrg({ orgId, userId: id });
      if (!res.ok) throw new Error(res.message);
      return res;
    },
    onError: (data) => {
      toast({
        variant: 'destructive',
        title: 'Failed to remove user',
        description: data.message
      });
    },
    onSuccess: async () => {
      toast({
        title: 'User removed from organization'
      });
      return await queryClient.invalidateQueries({
        queryKey: ['members', { orgId }]
      });
    }
  });

  return (
    <Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='float-end size-8 p-0'>
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <SheetTrigger asChild>
            <DropdownMenuItem className='flex flex-col items-start gap-1'>
              Manager access
            </DropdownMenuItem>
          </SheetTrigger>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            className='flex flex-col items-start gap-1'
            onClick={() => toggleActivation()}>
            {active ? 'Deactivate' : 'Activate'}
          </DropdownMenuItem>
          <DropdownMenuItem
            className='flex flex-col items-start gap-1'
            onClick={() => removeUser()}>
            <p>
              {id === userData?.id ? 'Leave organization' : 'Remove member'}
            </p>
            <p className='text-xs'>Remove user from organization.</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Manager user access</SheetTitle>
          <SheetDescription>Alter {email}&apos;s role.</SheetDescription>
        </SheetHeader>
        <div></div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type='submit'>Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
