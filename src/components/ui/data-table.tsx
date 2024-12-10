'use client';

import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  Table as TableType,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';

import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import {
  Dispatch,
  SetStateAction,
  createElement,
  useEffect,
  useState
} from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '#/components/ui/table';
import { cn } from '#/lib/utils';
import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './dropdown-menu';

type PaginationOpts =
  | { manual: false; pageSize?: number }
  | {
      manual: true;
      pageSize: number;
      pageIndex: number;
      rowCount: number;
      onPageChange: Dispatch<SetStateAction<PaginationState>>;
    };

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  controls?: (props: { table: TableType<TData> }) => JSX.Element;
  tableClassName?: string;
  wrapperClassName?: string;
  pagination?: PaginationOpts;
  onColumnClick?: (row: TData, columnId: string) => void;
}

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  controls: ControlComp,
  wrapperClassName,
  tableClassName,
  pagination: p,
  onColumnClick
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: p?.manual ? p.pageIndex : 0,
    pageSize: p?.pageSize ?? data.length
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    ...(p !== undefined
      ? p.manual
        ? { manualPagination: true, rowCount: p.rowCount }
        : {
            getPaginationRowModel: getPaginationRowModel()
          }
      : {}),
    // manualPagination: true,
    state: {
      columnFilters,
      sorting,
      columnVisibility,
      pagination
    }
  });

  useEffect(() => {
    if (p?.manual) p.onPageChange(pagination);
  }, [pagination, p]);

  return (
    <div className={cn('flex flex-col gap-0', wrapperClassName)}>
      {ControlComp && <ControlComp table={table} />}
      <div
        className={cn(
          'overflow-hidden rounded-lg border border-gray-200',
          p && 'rounded-b-none',
          tableClassName
        )}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className='cursor-pointer'
                  data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      onClick={() =>
                        onColumnClick &&
                        onColumnClick(row.original, cell.column.id)
                      }>
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
      {p && (
        <div className='flex items-center justify-between space-x-2 rounded-b-lg border border-t-0 border-gray-200 bg-white p-3 text-sm'>
          <p className='text-gray-500'>
            Showing{' '}
            <span className='font-bold text-gray-900'>
              {(() => {
                const { pageIndex: idx, pageSize } =
                  table.getState().pagination;
                const { rows } = table.getRowModel();
                const start = idx * pageSize + 1;
                const end = start + rows.length - 1;
                return `${start} - ${end}`;
              })()}
            </span>{' '}
            of{' '}
            <span className='font-bold text-gray-900'>
              {table.getRowCount().toLocaleString()}
            </span>
          </p>
          {table.getPageCount() > 1 && (
            <div className='flex h-auto gap-0'>
              <Button
                className='rounded-r-none border-r-0'
                variant='secondary'
                size='sm'
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}>
                Previous
              </Button>
              {table.getPageCount() <= 4 &&
                Array.from(new Array(table.getPageCount()), (_, i) => i).map(
                  (idx) => (
                    <Button
                      onClick={() => table.setPageIndex(idx)}
                      key={idx}
                      className={cn(
                        'rounded-none border-r-0',
                        table.getState().pagination.pageIndex == idx &&
                          'bg-green-100 text-green-600 hover:bg-green-100'
                      )}
                      variant='secondary'
                      size='sm'>
                      {idx + 1}
                    </Button>
                  )
                )}

              <Button
                className='rounded-l-none'
                variant='secondary'
                size='sm'
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}>
                Next
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) return title;

  const setSort = (v: boolean) => {
    return () => column.toggleSorting(v);
  };

  const isSorted = column.getIsSorted();

  return (
    <div className={cn('flex text-right', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger className='flex gap-2 uppercase'>
          Exposture
          {createElement(
            !isSorted ? ArrowUpDown : isSorted === 'asc' ? ArrowUp : ArrowDown,
            { size: 14 }
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={column.clearSorting}>
            <ArrowUpDown />
            Clear
          </DropdownMenuItem>
          <DropdownMenuItem onClick={setSort(false)}>
            <ArrowUp />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={setSort(true)}>
            <ArrowDown />
            Desc
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
