import { type ColumnDef } from '@tanstack/react-table';
import { Badge } from '#/components/ui/badge';
import { supplierTable } from '#/utils/utils';
import { DataTable } from '../ui/data-table';

type Supplier = {
  supplier: string;
  region: string;
  exposureToRisk: 'Low' | 'Medium' | 'High';
  impactOperation: 'Low' | 'Medium' | 'High';
};

const columns: ColumnDef<Supplier>[] = [
  {
    accessorKey: 'supplier',
    header: 'Supplier',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('supplier')}</div>
    )
  },
  {
    accessorKey: 'exposureToRisk',
    header: 'Exposure To Risk',
    cell: ({ row }) => {
      const riskStatus = row.getValue<string>('exposureToRisk');
      const riskColor =
        riskStatus === 'Low'
          ? 'default'
          : riskStatus === 'Medium'
            ? 'warning'
            : 'destructive';
      return (
        <div className='capitalize'>
          <Badge variant={riskColor}>{riskStatus}</Badge>
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
    accessorKey: 'impactOperation',
    header: 'Impact to Operation'
  }
];

export function GlobalImpactTable() {
  return (
    <DataTable
      columns={columns}
      data={supplierTable}
      pagination={{
        manual: false,
        pageSize: 10
      }}
      tableClassName='bg-white'
      wrapperClassName='mt-6'
    />
  );
}

export default GlobalImpactTable;
