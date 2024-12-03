import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '#/components/ui/select';
import { toast } from '#/components/ui/use-toast';
import { RoleEnum } from '#/db/schema';
import updateInvite from '#/lib/actions/invite/update-invite';
import updateRole from '#/lib/actions/organization/update-user-role';

interface ChangeRoleSelectProps {
  type: 'member' | 'invite';
  id: string;
  currentRole: RoleEnum;
  orgId: string;
  disabled?: boolean;
}

export default function ChangeRoleSelect(props: ChangeRoleSelectProps) {
  const { currentRole, id, orgId, type, disabled = false } = props;

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (role: RoleEnum) => {
      const res = await (type === 'member'
        ? updateRole({ userId: id, orgId, role })
        : updateInvite({ id, orgId, role }));

      if (!res.ok) throw new Error(res.message);
      return role;
    },
    onError: (data) => {
      toast({
        variant: 'destructive',
        title: `Failed to update ${type}`,
        description: data.message
      });
    },
    onSuccess: async (role) => {
      toast({
        title: `${type.slice(0, 1).toUpperCase() + type.slice(1)} role updated to ${role}`
      });
      return await queryClient.invalidateQueries({
        queryKey: [type === 'member' ? 'members' : 'invites', { orgId }]
      });
    }
  });

  return (
    <Select
      disabled={disabled}
      defaultValue={currentRole}
      onValueChange={(d) => mutate(d as RoleEnum)}>
      <SelectTrigger className='h-auto w-[80px] border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-800'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.values(RoleEnum).map((r) => (
          <SelectItem key={r} value={r}>
            {r}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
