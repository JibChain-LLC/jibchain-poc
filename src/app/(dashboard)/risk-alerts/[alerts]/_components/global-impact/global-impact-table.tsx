import { type ColumnDef } from '@tanstack/react-table';
import { Badge } from '#/components/ui/badge';
import { DataTable } from '#/components/ui/data-table';
import { RegionEnum, RiskLevelEnum } from '#/enums';
import { type Supplier } from '#/lib/server/mocks/types';

type BadgeVariant =
  | 'default'
  | 'warning'
  | 'destructive'
  | 'secondary'
  | 'outline';
const riskLevelToBadgeVariant: Record<RiskLevelEnum, BadgeVariant> = {
  [RiskLevelEnum.LOW]: 'default',
  [RiskLevelEnum.MED]: 'warning',
  [RiskLevelEnum.HI]: 'destructive'
};
const columns: ColumnDef<Supplier>[] = [
  {
    accessorKey: 'name',
    header: 'Supplier',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('name')}</div>
  },
  {
    accessorKey: 'exposure',
    header: 'Exposure To Risk',
    cell: ({ row }) => {
      const riskStatus = row.getValue<RiskLevelEnum>('exposure');
      const badgeVariant = riskLevelToBadgeVariant[riskStatus];
      return (
        <div className='capitalize'>
          <Badge variant={badgeVariant}>{riskStatus}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: 'regions',
    header: 'Regions',
    cell: ({ row }) => (
      <div className='capitalize'>
        {row.getValue<(keyof typeof RegionEnum)[]>('regions').join(', ')}
      </div>
    )
  },
  {
    accessorKey: 'impact',
    header: 'Impact to Operation',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue<RiskLevelEnum>('impact')}</div>
    )
  },
  {
    accessorKey: 'contact.email',
    header: 'Email',
    cell: ({ row }) => <div>{row.original.contact.email}</div>
  },
  {
    accessorKey: 'contact.phone',
    header: 'Phone',
    cell: ({ row }) => <div>{row.original.contact.phone}</div>
  }
];

export default function GlobalImpactTable({
  data
}: {
  data: { impactedSuppliers: Supplier[] };
}) {
  return (
    <DataTable
      columns={columns}
      data={data.impactedSuppliers || []}
      pagination={{
        manual: false,
        pageSize: 10
      }}
      tableClassName='bg-white'
      wrapperClassName='mt-6'
    />
  );
}
