'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { UserPlus } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';
import { useState } from 'react';
import { Button } from '#/components/ui/button';
import { Checkbox } from '#/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '#/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '#/components/ui/table';
import ShellImage from '#/images/shell.svg';
import smallLogo from '#/images/small.svg';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import { AddTeamMemberModal } from './add-team-member-modal';
import { ChangeRoleModal } from './change-role-modal';
import { DeactivateUserModal } from './deactivate-user-modal';

export type Supplier = {
  image: any;
  user: string;
  userRole: 'Owner' | 'Admin' | 'Editor';
  role: string;
  email: string;
  status: string;
  lastLogin: string;
};

const suppliers: Supplier[] = [
  {
    image: smallLogo,
    user: 'Blue Sky Inc.',
    userRole: 'Owner',
    role: 'Ransomware Attack',
    email: 'email@gmail.com',
    status: 'Inactive',
    lastLogin: 'EU'
  },
  {
    image: smallLogo,
    user: 'Vandhana',
    userRole: 'Editor',
    role: 'Political Instability',
    email: 'email@gmail.com',
    status: 'Active',
    lastLogin: 'AF'
  },
  {
    image: smallLogo,
    user: 'LGT Logistics',
    userRole: 'Admin',
    role: 'Cyber Security',
    email: 'email@gmail.com',
    status: 'Pending',
    lastLogin: 'EU'
  },
  {
    image: smallLogo,
    user: 'Vishal Tradings',
    userRole: 'Editor',
    role: 'Ransomware Attack',
    email: 'email@gmail.com',
    status: 'Inactive',
    lastLogin: 'NA'
  },
  {
    image: smallLogo,
    user: 'AR Traders',
    userRole: 'Owner',
    role: 'Labor Strike',
    email: 'email@gmail.com',
    status: 'Active',
    lastLogin: 'EU'
  },
  {
    image: smallLogo,
    user: 'Gogo Tech',
    userRole: 'Admin',
    role: 'Ransomware Attack',
    email: 'email@gmail.com',
    status: 'Pending',
    lastLogin: 'SA'
  },
  {
    image: smallLogo,
    user: 'National Lumber',
    userRole: 'Editor',
    role: 'Legal Risk',
    email: 'email@gmail.com',
    status: 'Inactive',
    lastLogin: 'EU'
  }
];

export function MyTeamTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [roleChangeModal, setRoleChangeModal] = useState<{
    isOpen: boolean;
    rowId: string | null;
    newRole: string | null;
  }>({ isOpen: false, rowId: null, newRole: null });

  const [deactivateModal, setDeactivateModal] = useState<{
    isOpen: boolean;
    rowId: string | null;
  }>({ isOpen: false, rowId: null });

  const handleRoleChange = (rowId: string, selectedRole: string) => {
    if (selectedRole === 'Deactive') {
      setDeactivateModal({ isOpen: true, rowId });
    } else {
      setRoleChangeModal({ isOpen: true, rowId, newRole: selectedRole });
    }
  };

  const closeRoleChangeModal = () => {
    setRoleChangeModal({ isOpen: false, rowId: null, newRole: null });
  };

  const closeDeactivateModal = () => {
    setDeactivateModal({ isOpen: false, rowId: null });
  };

  const columns: ColumnDef<Supplier>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      ),
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'image',
      header: '',
      cell: ({ row }) => (
        <Image
          src={row.getValue('image')}
          alt={row.getValue('user')}
          className='size-[30px] rounded-none'
        />
      ),
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'user',
      header: 'User',
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('user')}</div>
      )
    },
    {
      accessorKey: 'userRole',
      header: 'User Role',
      cell: ({ row }) => {
        const userRole = row.getValue<string>('userRole');

        return (
          <Select
            value={userRole}
            onValueChange={(value) => handleRoleChange(row.id, value)}>
            <SelectTrigger className='w-full max-w-[90px] border-gray-300 bg-white'>
              <SelectValue>{userRole}</SelectValue>
            </SelectTrigger>
            <SelectContent className='max-w-[200px] bg-white text-black'>
              <SelectItem value='Owner'>Owner</SelectItem>
              <SelectItem value='Admin'>Admin</SelectItem>
              <SelectItem
                value='Editor'
                className='rounded-none border-b border-gray-200'>
                Editor
              </SelectItem>
              <SelectItem value='Deactive' className='text-red-500'>
                Deactivate User
              </SelectItem>
            </SelectContent>
          </Select>
        );
      }
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => <div>{row.getValue('role')}</div>
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => <div className=''>{row.getValue('email')}</div>
    },
    {
      accessorKey: 'lastLogin',
      header: 'Last Login',
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('lastLogin')}</div>
      )
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue<string>('status');
        const dotColor =
          status === 'Inactive'
            ? 'bg-red-500'
            : status === 'Pending'
              ? 'bg-yellow-500'
              : 'bg-green-500';

        return (
          <div className='flex items-center'>
            <span className={`mr-2 size-2 rounded-full ${dotColor}`}></span>
            {status}
          </div>
        );
      }
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='bg-transparent p-1 text-black'>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleEdit(row.original)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(row.original)}>
              Delete
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleViewDetails(row.original)}>
              View Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];

  const table = useReactTable({
    data: suppliers,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  });

  return (
    <>
      <p className='py-6 text-[24px] font-bold text-black'>My Team</p>
      <div className='flex w-full flex-col items-center justify-between rounded-b-none rounded-t-lg bg-white p-6 text-black shadow-md md:flex-row'>
        <div className='flex flex-col items-center gap-2 md:flex-row'>
          <Image
            src={ShellImage}
            alt='Shell Logo'
            className='size-[60px] rounded-md object-cover'
          />
          <h2 className='text-xl font-bold'>Shell USA, Inc.</h2>
          <p className='text-gray-500'>Team members: 10</p>
        </div>
        <div className='flex items-center gap-2 px-2'>
          <Button className='' disabled>
            Deactivate All
          </Button>
          <Button
            className='gap-2 bg-green-700 text-white hover:bg-green-600'
            onClick={() => setIsDialogOpen(true)}>
            <UserPlus /> Add New
          </Button>
        </div>
      </div>
      <div className='rounded-b-lg rounded-t-none border border-t-0 border-gray-200 p-0.5 shadow-md'>
        <Table className='rounded-lg'>
          <TableHeader className='bg-gray-100'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className='text-black' key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className='bg-white text-black'>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className='flex items-center justify-between space-x-2 border-t bg-white p-2 py-4'>
          <div className='flex items-center text-black'>
            <p>Rows per page: </p>
            <Button
              className='mx-4 bg-transparent text-black'
              variant='outline'
              size='sm'
              onClick={() => table.nextPage()}
              disabled={!table.getCanPreviousPage()}>
              10
            </Button>
          </div>
          <div className='gap-6'>
            <Button
              className='mx-4 bg-transparent text-black hover:scale-110 hover:cursor-pointer'
              variant='outline'
              size='sm'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}>
              Previous
            </Button>
            <Button
              className='bg-transparent text-black'
              variant='outline'
              size='sm'
              onClick={() => table.nextPage()}
              disabled={!table.getCanPreviousPage()}>
              Next
            </Button>
          </div>
        </div>
        <AddTeamMemberModal
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      </div>
      {roleChangeModal.isOpen && (
        <ChangeRoleModal
          isOpen={roleChangeModal.isOpen}
          onClose={closeRoleChangeModal}
        />
      )}
      {deactivateModal.isOpen && (
        <DeactivateUserModal
          isOpen={deactivateModal.isOpen}
          onClose={closeDeactivateModal}
        />
      )}
    </>
  );
}

function handleEdit(supplier: Supplier) {
  console.log('Edit:', supplier);
}

function handleDelete(supplier: Supplier) {
  console.log('Delete:', supplier);
}

function handleViewDetails(supplier: Supplier) {
  console.log('View Details:', supplier);
}
