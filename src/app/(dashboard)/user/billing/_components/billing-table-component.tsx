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
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

import { Button } from '#/components/ui/button';
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

type BillingHistory = {
  id: string;
  amount: number;
  status: 'Pending' | 'Paid';
  InvoiceId: string;
  date: string;
};

const data: BillingHistory[] = [
  {
    id: '1',
    amount: 150,
    status: 'Pending',
    date: '01 May 2024',
    InvoiceId: '#1846210'
  },
  {
    id: '2',
    amount: 200,
    status: 'Paid',
    date: '01 May 2024',
    InvoiceId: '#1846215'
  },
  {
    id: '3',
    amount: 350,
    status: 'Pending',
    date: '01 May 2024',
    InvoiceId: '#1846217'
  },
  {
    id: '4',
    amount: 120,
    status: 'Paid',
    date: '01 May 2024',
    InvoiceId: '#1846212'
  },
  {
    id: '5',
    amount: 250,
    status: 'Pending',
    date: '01 May 2024',
    InvoiceId: '#1846219'
  }
];

export const columns: ColumnDef<BillingHistory>[] = [
  {
    accessorKey: 'InvoiceId',
    header: ({ column }) => {
      return (
        <span
          className='flex cursor-pointer items-center gap-4'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Invoice Id
          <ArrowUpDown />
        </span>
      );
    },
    cell: ({ row }) => (
      <div className='lowercase'>{row.getValue('InvoiceId')}</div>
    )
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('date')}</div>
  },
  {
    accessorKey: 'amount',
    header: () => <div className=''>Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount);

      return <div className='font-medium'>{formatted}</div>;
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <span
        className={`rounded-full px-2 py-1 text-sm font-medium ${
          row.getValue('status') === 'Pending'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-green-100 text-green-800'
        }`}>
        {row.getValue('status')}
      </span>
    )
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const billing = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(billing.id)}>
              Copy billing ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View billing details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];

export function BillingHistoryTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
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
    <div className='w-full rounded-md bg-white px-6 shadow-md lg:px-12 xl:px-32 pb-6'>
      <div className='rounded-md border-none'>
        <p className='text-[20px] font-semibold text-black py-4'>Billing history</p>
        <Table>
          <TableHeader className='text-black'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className='bg-gray-100 p-4 border-b border-gray-200'>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className='p-4 text-black'>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='p-3 border-gray-200 border-b'>
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
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
      <Button className='bg-green-700 text-white hover:bg-green-600'>
        Save Changes
      </Button>
    </div>
  );
}
