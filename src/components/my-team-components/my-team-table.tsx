'use client';

import * as React from 'react';
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
import { ChevronDown, MoreHorizontal } from 'lucide-react';
import { Badge } from '#/components/ui/badge';
import { Button } from '#/components/ui/button';
import { Checkbox } from '#/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '#/components/ui/dropdown-menu';
import ShellImage from '#/images/shell.svg';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '#/components/ui/table';
import smallLogo from '#/images/small.svg';
import Image from 'next/image';
import { UserPlus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import { useState } from 'react';
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
        className='w-[30px] h-[30px] rounded-none'
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'user',
    header: 'User',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('user')}</div>
  },
  {
    accessorKey: 'userRole',
    header: 'User Role',
    cell: ({ row }) => {
      const [userRole, setUserRole] = useState<string>(
        row.getValue<string>('userRole')
      );

      const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
      const [newRole, setNewRole] = useState<string | null>(null);

      const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);

      const handleRoleChange = (selectedRole: string) => {
        setNewRole(selectedRole);
        if (selectedRole === 'Deactive') {
          setIsDeactivateModalOpen(true); // Open the deactivation modal
        } else {
          setIsRoleModalOpen(true); // Open the role change modal
        }
      };

      const handleCloseChangeRoleDialog = () => {
        setIsRoleModalOpen(false);
        if (newRole && newRole !== 'Deactive') setUserRole(newRole);
      };

      const handleCloseDeactivateDialog = () => {
        setIsDeactivateModalOpen(false);
      };

      return (
        <>
          <Select value={userRole} onValueChange={handleRoleChange}>
            <SelectTrigger className='w-full bg-white border-gray-300 max-w-[90px]'>
              <SelectValue>{userRole}</SelectValue>
            </SelectTrigger>
            <SelectContent className='bg-white text-black max-w-[200px]'>
              <SelectItem value='Owner'>Owner</SelectItem>
              <SelectItem value='Admin'>Admin</SelectItem>
              <SelectItem
                value='Editor'
                className='border-b-[1px] rounded-none border-gray-200'>
                Editor
              </SelectItem>
              <SelectItem value='Deactive' className='text-red-500'>
                Deactivate User
              </SelectItem>
            </SelectContent>
          </Select>

          {isRoleModalOpen && (
            <ChangeRoleModal
              isOpen={isRoleModalOpen}
              onClose={handleCloseChangeRoleDialog}
            />
          )}
          {isDeactivateModalOpen && (
            <DeactivateUserModal
              isOpen={isDeactivateModalOpen}
              onClose={handleCloseDeactivateDialog}
            />
          )}
        </>
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
          <span className={`w-2 h-2 rounded-full mr-2 ${dotColor}`}></span>
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
          <Button className='p-1 bg-trasnparent text-black'>
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

function handleEdit(supplier: Supplier) {
  // Implement edit functionality
  console.log('Edit:', supplier);
}

function handleDelete(supplier: Supplier) {
  // Implement delete functionality
  console.log('Delete:', supplier);
}

function handleViewDetails(supplier: Supplier) {
  // Implement view details functionality
  console.log('View Details:', supplier);
}

export function MyTeamTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

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
      <p className='text-black text-[24px] font-bold py-6'>My Team</p>
      <div className='text-black bg-white w-full flex md:flex-row flex-col items-center justify-between rounded-t-lg rounded-b-none p-6 shadow-md'>
        <div className='flex md:flex-row flex-col items-center gap-2'>
          <Image
            src={ShellImage}
            alt='Shell Logo'
            className='w-[60px] h-[60px] rounded-md object-cover'
          />
          <h2 className='text-xl font-bold'>Shell USA, Inc.</h2>
          <p className='text-gray-500'>Team members: 10</p>
        </div>
        <div className='flex items-center gap-2 px-2'>
          <Button className='' disabled>
            Deactivate All
          </Button>
          <Button
            className='bg-green-700 text-white hover:bg-green-600 gap-2'
            onClick={openDialog}>
            <UserPlus></UserPlus> Add New
          </Button>
        </div>
      </div>
      <div className='border border-gray-200 border-t-0 rounded-t-none p-0.5 shadow-md rounded-b-lg'>
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
          <TableBody className='text-black bg-white'>
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

        <div className='flex items-center justify-between space-x-2 py-4 bg-white border-t-[1px] p-2'>
          <div className='flex items-center text-black'>
            <p>Rows per page: </p>
            <Button
              className='bg-transparent text-black mx-4'
              variant='outline'
              size='sm'
              onClick={() => table.nextPage()}
              disabled={!table.getCanPreviousPage()}>
              10
            </Button>
          </div>
          <div className='gap-6'>
            <Button
              className='bg-transparent text-black hover:cursor-pointer hover:scale-110 mx-4'
              variant='outline'
              size='sm'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}>
              Previous
            </Button>
            <Button
              className='bg-transparent text-black '
              variant='outline'
              size='sm'
              onClick={() => table.nextPage()}
              disabled={!table.getCanPreviousPage()}>
              Next
            </Button>
          </div>
        </div>
        <AddTeamMemberModal isOpen={isDialogOpen} onClose={closeDialog} />
      </div>
    </>
  );
}
