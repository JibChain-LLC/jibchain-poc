import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '#/components/ui/select';
import { toast } from '#/components/ui/use-toast';
import { RoleEnum } from '#/enums';
import revalidateAllPath from '#/revalidate-path';
import { trpc, vanillaTRPC } from '#/trpc/query-clients/client';

interface ChangeRoleSelectProps {
  type: 'member' | 'invite';
  id: string;
  currentRole: RoleEnum;
  orgId: string;
  disabled?: boolean;
  allowOwnerSelect?: boolean;
}

export default function ChangeRoleSelect(props: ChangeRoleSelectProps) {
  const {
    currentRole,
    id,
    orgId,
    type,
    disabled = false,
    allowOwnerSelect = false
  } = props;

  const [value, setValue] = useState<RoleEnum>(currentRole);
  const utils = trpc.useUtils();
  const { mutate } = useMutation({
    mutationFn: async (role: RoleEnum) => {
      setValue(role);
      await (type === 'member'
        ? vanillaTRPC.org.member.update.mutate({ userId: id, orgId, role })
        : vanillaTRPC.org.invite.update.mutate({ inviteId: id, orgId, role }));
      return role;
    },
    onError: (data) => {
      setValue(currentRole);
      toast({
        variant: 'destructive',
        title: `Failed to update ${type}`,
        description: data.message
      });
    },
    onSuccess: async (role) => {
      toast({
        title: `Updated ${type}`,
        description: `${type.slice(0, 1).toUpperCase() + type.slice(1)} role updated to ${role}`
      });
    },
    onSettled: () => {
      utils.org[type].list.invalidate();
      revalidateAllPath();
    }
  });

  return (
    <Select
      disabled={disabled}
      value={value}
      onValueChange={(d) => mutate(d as RoleEnum)}>
      <SelectTrigger className='h-auto w-[80px] border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-800 hover:text-green-600'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={RoleEnum.USER}>{RoleEnum.USER}</SelectItem>
        <SelectItem value={RoleEnum.EDITOR}>{RoleEnum.EDITOR}</SelectItem>
        <SelectItem value={RoleEnum.ADMIN}>{RoleEnum.ADMIN}</SelectItem>
        {type === 'member' && (
          <SelectItem disabled={!allowOwnerSelect} value={RoleEnum.OWNER}>
            {RoleEnum.OWNER}
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
}
