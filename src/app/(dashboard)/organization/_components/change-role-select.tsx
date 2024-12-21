import { useMutation } from '@tanstack/react-query';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '#/components/ui/select';
import { toast } from '#/components/ui/use-toast';
import { RoleEnum } from '#/enums';
import { trpc, vanillaTRPC } from '#/trpc/query-clients/client';

interface ChangeRoleSelectProps {
  type: 'member' | 'invite';
  id: string;
  currentRole: RoleEnum;
  orgId: string;
  disabled?: boolean;
}

export default function ChangeRoleSelect(props: ChangeRoleSelectProps) {
  const { currentRole, id, orgId, type, disabled = false } = props;

  const utils = trpc.useUtils();
  const { mutate } = useMutation({
    mutationFn: async (role: RoleEnum) => {
      await (type === 'member'
        ? vanillaTRPC.org.member.update.mutate({ userId: id, orgId, role })
        : vanillaTRPC.org.invite.update.mutate({ inviteId: id, orgId, role }));

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
      utils.org[type].list.invalidate();
    }
  });

  return (
    <Select
      disabled={disabled}
      defaultValue={currentRole}
      onValueChange={(d) => mutate(d as RoleEnum)}>
      <SelectTrigger className='h-auto w-[80px] border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-800 hover:text-green-600'>
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
