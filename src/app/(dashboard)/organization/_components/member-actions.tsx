import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DropdownMenuItem } from '#/components/ui/dropdown-menu';
import { useToast } from '#/components/ui/use-toast';
import useUserMetadata from '#/hooks/use-user-metadata';
import removeUserFromOrg from '#/lib/actions/organization/delete-user-from-org';
import { Member } from '#/lib/actions/organization/read-org-members';
import updateRole from '#/lib/actions/organization/update-user-role';
import ControlledDropdown from './controlled-dropdown';

export default function MemberActions(
  props: Omit<Member, 'lastSignIn'> & { orgId: string }
) {
  const { id, orgId, active } = props;
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
    <div className='flex justify-end'>
      <ControlledDropdown align='end'>
        <DropdownMenuItem
          className='flex flex-col items-start gap-1'
          onClick={() => toggleActivation()}>
          {active ? 'Deactivate' : 'Activate'}
        </DropdownMenuItem>
        <DropdownMenuItem
          className='flex flex-col items-start gap-1'
          onClick={() => removeUser()}>
          {id === userData?.id ? 'Leave organization' : 'Remove member'}
        </DropdownMenuItem>
      </ControlledDropdown>
    </div>
  );
}
