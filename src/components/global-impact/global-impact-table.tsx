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
import { ChevronDown } from 'lucide-react';
import * as React from 'react';
import { Badge } from '#/components/ui/badge';
import { Button } from '#/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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
import { supplierTable } from '#/utils/utils';
import { Supplier } from '#/utils/utils';

const columns: ColumnDef<Supplier>[] = [
  {
    accessorKey: 'supplier',
    header: 'Supplier',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('supplier')}</div>
    )
  },
  {
    accessorKey: 'region',
    header: 'Region',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('region')}</div>
    )
  },
  {
    accessorKey: 'exposureToRisk',
    header: 'Exposure To Risk',
    cell: ({ row }) => {
      const riskStatus = row.getValue<string>('exposureToRisk');
      const riskColor =
        riskStatus === 'Low'
          ? 'bg-green-200 text-green-800 rounded-md'
          : riskStatus === 'Medium'
            ? 'bg-orange-200 text-orange-800 rounded-md'
            : 'bg-red-200 text-red-800 rounded-md';

      return (
        <div className='capitalize'>
          <Badge className={riskColor}>{riskStatus}</Badge>
        </div>
      );
    }
  },
  {
    accessorKey: 'impactOperation',
    header: 'Impact to Operation',
    cell: ({ row }) => {
      const impactOperation = row.getValue<string>('impactOperation');
      const dotColor =
        impactOperation === 'High'
          ? 'bg-red-500 p-1.5'
          : impactOperation === 'Medium'
            ? 'bg-yellow-500 p-1.5'
            : 'bg-green-500 p-1.5';

      return (
        <div className='flex items-center'>
          <span className={`mr-2 size-2 rounded-full ${dotColor}`}></span>
          {impactOperation}
        </div>
      );
    }
  }
];

export function GlobalImpactTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: supplierTable,
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
      <div className='flex items-center p-4'>
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
      <div className='mx-4 rounded-lg border border-gray-200'>
        <Table className='rounded-lg p-4'>
          <TableHeader className='bg-gray-100'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className='text-black' key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className='p-4'>
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
                    <TableCell key={cell.id} className='p-4'>
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
          <h2 className='text-gray-400'>
            Showing <strong className='text-black'>1-10</strong> of{' '}
            <strong className='text-black'>1000</strong>
          </h2>
          <div>
            <Button
              className='bg-transparent text-black hover:scale-110 hover:cursor-pointer'
              variant='outline'
              size='sm'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}>
              Previous
            </Button>
            {Array.from({ length: table.getPageCount() }).map((_, index) => (
              <Button
                key={index}
                className={`${
                  table.getState().pagination.pageIndex === index
                    ? 'text-black'
                    : 'bg-transparent text-black'
                } hover:cursor-pointer`}
                variant='outline'
                size='sm'
                onClick={() => table.setPageIndex(index)}>
                {index + 1}
              </Button>
            ))}
            <Button
              className='bg-transparent text-black hover:scale-110 hover:cursor-pointer'
              variant='outline'
              size='sm'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
