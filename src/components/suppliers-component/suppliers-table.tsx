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
import { ChevronDown, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';
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
import { Input } from '#/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '#/components/ui/table';
import { Invoice } from '#/utils/utils';
import { supplierTableInvoices } from '#/utils/utils';
import SupplierModal from './supplier-modal';

const columns: ColumnDef<Invoice>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        onClick={(event) => event.stopPropagation()}
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
        onClick={(e) => e.stopPropagation()}
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
        alt={row.getValue('supplier')}
        className='size-14 rounded-none'
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'supplier',
    header: 'Supplier',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('supplier')}</div>
    )
  },
  {
    accessorKey: 'riskStatus',
    header: 'Risk Status',
    cell: ({ row }) => {
      const riskStatus = row.getValue<string>('riskStatus');
      const riskColor =
        riskStatus === 'Low'
          ? 'bg-green-200 text-green-800'
          : riskStatus === 'Medium'
            ? 'bg-orange-200 text-orange-800'
            : 'bg-red-200 text-red-800';

      return (
        <div className='capitalize'>
          <Badge className={riskColor}>{riskStatus}</Badge>
        </div>
      );
    }
  },
  {
    accessorKey: 'topRisk',
    header: 'Top Risk',
    cell: ({ row }) => <div>{row.getValue('topRisk')}</div>
  },
  {
    accessorKey: 'impactOperation',
    header: 'Impact to Operation',
    cell: ({ row }) => {
      const impactOperation = row.getValue<string>('impactOperation');
      const dotColor =
        impactOperation === 'High'
          ? 'bg-red-500'
          : impactOperation === 'Medium'
            ? 'bg-yellow-500'
            : 'bg-green-500';

      return (
        <div className='flex items-center'>
          <span className={`mr-2 size-2 rounded-full ${dotColor}`}></span>
          {impactOperation}
        </div>
      );
    }
  },
  {
    accessorKey: 'region',
    header: 'Region',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('region')}</div>
    )
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className='p-1 text-black'
              onClick={(e) => e.stopPropagation()}>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' onClick={(e) => e.stopPropagation()}>
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
      </>
    )
  }
];

function handleEdit(invoice: Invoice) {
  // Implement edit functionality
  console.log('Edit:', invoice);
}

function handleDelete(invoice: Invoice) {
  // Implement delete functionality
  console.log('Delete:', invoice);
}

function handleViewDetails(invoice: Invoice) {
  // Implement view details functionality
  console.log('View Details:', invoice);
}

export function SuppliersTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: supplierTableInvoices,
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
      <div className='flex items-center py-4'>
        <Input
          placeholder='Filter suppliers...'
          value={
            (table.getColumn('supplier')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('supplier')?.setFilterValue(event.target.value)
          }
          className='max-w-sm bg-transparent text-black'
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              className='ml-auto bg-transparent text-black'>
              Columns <ChevronDown className='ml-2 size-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className='capitalize'
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='rounded-lg border border-gray-200 p-0.5'>
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
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                  className='cursor-pointer'
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
        <SupplierModal
          isOpen={isModalOpen}
          setOpen={() => setIsModalOpen(!isModalOpen)}
        />
        <div className='flex items-center justify-end space-x-2 border-t bg-white p-2 py-4'>
          <Button
            className='bg-transparent text-black hover:scale-110 hover:cursor-pointer'
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
    </>
  );
}
