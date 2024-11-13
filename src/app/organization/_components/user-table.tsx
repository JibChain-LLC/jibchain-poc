'use client';

import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { User } from 'lucide-react';
import { Avatar, AvatarFallback } from '#/components/ui/avatar';
import { Badge } from '#/components/ui/badge';
import getInvites from '#/lib/actions/invite/read-invite-list';
import getOrgMembers from '#/lib/actions/organization/read-org-members';
import { cn } from '#/lib/utils';
import { DataTable } from '../../../components/ui/data-table';
import InviteActions from './invite-actions';
import InviteDialog from './invite-dialog';
import MemberActions from './member-actions';

interface UserTableProps {
  currentUserEmail: string;
  orgId: string;
}

export default function UserTable(props: UserTableProps) {
  const { orgId, currentUserEmail } = props;
  const { data: memberData } = useQuery({
    queryKey: ['members', { orgId }],
    queryFn: () => getOrgMembers({ orgId })
  });

  const { data: inviteData } = useQuery({
    queryKey: ['invites', { orgId }],
    queryFn: () => getInvites({ orgId })
  });

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex flex-row items-end justify-between'>
        <p className='text-2xl font-bold'>Members</p>
        <InviteDialog orgId={orgId} />
      </div>
      <DataTable
        columns={[
          {
            id: 'name',
            header: 'User',
            cell: ({ row }) => {
              const type = row.original.type;
              const name =
                type === 'invite'
                  ? '--'
                  : `${row.original.firstName ?? ''} ${row.original.lastName ?? ''}`;
              const email = row.getValue('email');

              return (
                <div className='flex flex-row items-center gap-2'>
                  <Avatar className='size-8'>
                    {/* <AvatarImage src='https://github.com/shadcn.png' /> */}
                    <AvatarFallback>
                      <User />
                    </AvatarFallback>
                  </Avatar>
                  <p>{name}</p>
                  {type === 'member' && email === currentUserEmail && (
                    <Badge>Me</Badge>
                  )}
                  {type === 'invite' && (
                    <Badge variant='secondary'>Pending</Badge>
                  )}
                </div>
              );
            }
          },
          {
            accessorKey: 'role',
            header: 'User Role'
          },
          { id: 'orgRole', header: 'Role' },
          {
            accessorKey: 'email',
            header: 'Email'
          },
          {
            accessorKey: 'lastSignIn',
            header: 'Last Login',
            accessorFn: (r) => {
              const { type } = r;
              return type === 'member' && r.lastSignIn
                ? format(r.lastSignIn, 'dd LLL yyyy')
                : '--';
            }
          },
          {
            accessorKey: 'active',
            header: 'Status',
            cell: ({ row }) => {
              const cell = row.original;
              const active = cell.type === 'invite' ? undefined : cell.active;

              return (
                <div className='flex flex-row items-center gap-2.5'>
                  <div
                    className={cn(
                      'size-3 rounded-full',
                      active === undefined
                        ? 'bg-foreground/50'
                        : active
                          ? 'bg-green-700'
                          : 'bg-red-700'
                    )}></div>
                  <p>
                    {active === undefined
                      ? 'Pending'
                      : active
                        ? 'Active'
                        : 'Inactive'}
                  </p>
                </div>
              );
            }
          },
          {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => {
              const type = row.original.type;

              return type === 'invite' ? (
                <InviteActions id={row.original.id} />
              ) : (
                <MemberActions
                  orgId={orgId}
                  id={row.original.id}
                  active={row.original.active}
                  role={row.original.role}
                  email={row.original.email!}
                />
              );
            }
          }
        ]}
        data={[
          ...(memberData?.ok
            ? memberData.data!.map((m) => ({
                ...m,
                type: 'member' as const
              }))
            : []),
          ...(inviteData?.ok
            ? inviteData.data!.map((i) => ({
                ...i,
                type: 'invite' as const
              }))
            : [])
        ]}
      />
    </div>
  );
}
