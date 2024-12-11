'use client';

import { format } from 'date-fns';
import { User } from 'flowbite-react-icons/solid';
import { Building } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar';
import { Badge } from '#/components/ui/badge';
import { DataTable } from '#/components/ui/data-table';
import { RoleEnum } from '#/db/schema';
import { cn } from '#/lib/utils';
import { trpc } from '#/trpc/query-clients/client';
import ChangeRoleSelect from './change-role-select';
import InviteActions from './invite-actions';
import InviteDialog from './invite-dialog';
import MemberActions from './member-actions';

interface UserTableProps {
  currentUserEmail: string;
  currentUserRoles: RoleEnum[];
  orgId: string;
  orgName: string;
}

const ADMIN_SET = new Set([RoleEnum.ADMIN, RoleEnum.OWNER]);

export default function UserTable(props: UserTableProps) {
  const { orgId, orgName, currentUserEmail, currentUserRoles } = props;

  const memberQuery = trpc.org.member.list.useQuery({ orgId });
  const inviteQuery = trpc.org.invite.list.useQuery({ orgId });

  const hasAdminPriv =
    ADMIN_SET.intersection(new Set(currentUserRoles)).size >= 1;

  return (
    <DataTable
      controls={({ table }) => (
        <div className='flex flex-row items-center justify-between rounded-md rounded-b-none border border-gray-200 bg-white p-4'>
          <div className='flex flex-row items-center'>
            <Avatar className='mr-3 size-[52px]'>
              <AvatarImage />
              <AvatarFallback>
                <Building />
              </AvatarFallback>
            </Avatar>
            <p className='text-lg font-semibold text-gray-900'>{orgName}</p>
            <p className='ml-8 text-base font-normal text-gray-500'>
              Team members:{' '}
              <span className='font-bold text-gray-900'>
                {table.getRowCount()}
              </span>
            </p>
          </div>
          {hasAdminPriv && <InviteDialog orgId={orgId} />}
        </div>
      )}
      pagination={{ manual: false, pageSize: 10 }}
      tableClassName='border-t-0 rounded-t-none'
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
              <div className='flex flex-row items-center gap-2.5'>
                <Avatar className='size-8'>
                  <AvatarImage src='' />
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
                <p className='text-sm font-medium leading-none'>{name}</p>
                {type === 'member' && email === currentUserEmail && (
                  <Badge>Me</Badge>
                )}
              </div>
            );
          }
        },
        {
          accessorKey: 'role',
          header: 'User Role',
          cell: ({ row }) =>
            hasAdminPriv ? (
              <ChangeRoleSelect
                orgId={orgId}
                type={row.original.type}
                id={row.original.id}
                currentRole={row.original.role}
              />
            ) : (
              <p className='font-normal text-gray-500'>{row.original.role}</p>
            )
        },
        {
          accessorKey: 'jobRole',
          header: 'Job Role',
          cell: ({ row }) => (
            <p className='font-normal text-gray-500'>
              {row.original.type === 'invite' ? '--' : row.original.jobRole}
            </p>
          )
        },
        {
          accessorKey: 'email',
          header: 'Email',
          cell: ({ row }) => (
            <p className='font-normal text-gray-500'>{row.original.email}</p>
          )
        },
        {
          accessorKey: 'lastSignIn',
          header: 'Last Login',
          accessorFn: (r) => {
            const { type } = r;
            return type === 'member' && r.lastSignIn
              ? format(r.lastSignIn, 'dd LLL yyyy')
              : '--';
          },
          cell: ({ row }) => (
            <p className='font-normal text-gray-500'>
              {row.getValue('lastSignIn')}
            </p>
          )
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
                    'size-2.5 rounded-full',
                    active === undefined
                      ? 'bg-gray-500'
                      : active
                        ? 'bg-green-500'
                        : 'bg-red-500'
                  )}></div>
                <p className='font-medium leading-none text-gray-900'>
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
                hasAdminPriv={hasAdminPriv}
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
        ...(memberQuery.isSuccess
          ? memberQuery.data.map((m) => ({
              ...m,
              type: 'member' as const
            }))
          : []),
        ...(inviteQuery.isSuccess
          ? inviteQuery.data.map((i) => ({
              ...i,
              type: 'invite' as const
            }))
          : [])
      ]}
    />
  );
}
