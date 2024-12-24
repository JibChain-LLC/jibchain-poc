import { type ColumnDef } from '@tanstack/react-table';
import { Badge } from '#/components/ui/badge';
import { DataTable } from '#/components/ui/data-table';

export type ImpactedSupplier = {
  name: string;
  regions: string[];
  exposure: 'low' | 'med' | 'high';
  impact: 'low' | 'med' | 'high';
  email: string;
  phone: string;
};

const columns: ColumnDef<ImpactedSupplier>[] = [
  {
    accessorKey: 'name',
    header: 'Supplier',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'exposure',
    header: 'Exposure To Risk',
    cell: ({ row }) => {
      const riskStatus = row.getValue<string>('exposure');
      const riskColor =
        riskStatus === 'low'
          ? 'default'
          : riskStatus === 'med'
          ? 'warning'
          : 'destructive';
      return (
        <div className='capitalize'>
          <Badge variant={riskColor}>{riskStatus}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: 'regions',
    header: 'Regions',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue<string[]>('regions').join(', ')}</div>
    ),
  },
  {
    accessorKey: 'impact',
    header: 'Impact to Operation',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('impact')}</div>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <div>{row.getValue('email')}</div>
    ),
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ row }) => (
      <div>{row.getValue('phone')}</div>
    ),
  },
];

export default function GlobalImpactTable({ data }: { data: { impactedSuppliers: ImpactedSupplier[] } }) {
  return (
    <DataTable
      columns={columns}
      data={data.impactedSuppliers || []}
      pagination={{
        manual: false,
        pageSize: 10,
      }}
      tableClassName='bg-white'
      wrapperClassName='mt-6'
    />
  );
}
