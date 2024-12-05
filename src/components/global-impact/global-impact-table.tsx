import { type ColumnDef, Table as TableType } from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';
import { Badge } from '#/components/ui/badge';
import { Button } from '#/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '#/components/ui/dropdown-menu';
import { Input } from '#/components/ui/input';
import { supplierTable } from '#/utils/utils';
import { DataTable } from '../ui/data-table';

type Supplier = {
  supplier: string;
  region: string;
  exposureToRisk: 'Low' | 'Medium' | 'High';
  impactOperation: 'Low' | 'Medium' | 'High';
};
interface ControlsProps {
  table: TableType<Supplier>;
}
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
            ? "default"
            : riskStatus === 'Medium'
              ? "warning"
              : "destructive";
      return (
        <div className='capitalize'>
          <Badge variant={riskColor}>{riskStatus}</Badge>
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
  }
];

export function GlobalImpactTable() {
  const Controls = ({ table }: ControlsProps) => (
    <div className='flex items-center p-4'>
      <Input
        placeholder='Filter suppliers...'
        value={(table.getColumn('supplier')?.getFilterValue() as string) ?? ''}
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
  );

  return (
    <DataTable
      columns={columns}
      data={supplierTable}
      controls={Controls}
      pagination={{
        manual: false,
        pageSize: 10
      }}
      tableClassName='bg-white'
      wrapperClassName='mx-4'
    />
  );
}

export default GlobalImpactTable;
