'use client';

import { Badge } from '#/components/ui/badge';
import { DataTable } from '#/components/ui/data-table';
import { RegionEnum, RiskLevelEnum } from '#/enums';
import { RouteOutputs } from '#/trpc/query-clients/client';

type ImpactedSuppliers =
  RouteOutputs['dash']['risks']['read']['impactedSuppliers'];

interface GlobalImpactTableProps {
  impactedSuppliers: ImpactedSuppliers;
}

const BADGE_MAP: Record<
  RiskLevelEnum,
  { variant: React.ComponentProps<typeof Badge>['variant']; text: string }
> = {
  hi: { variant: 'destructive', text: 'High' },
  med: { variant: 'warning', text: 'Medium' },
  low: { variant: 'default', text: 'Low' }
};

export default function GlobalImpactTable(props: GlobalImpactTableProps) {
  const { impactedSuppliers } = props;

  return (
    <DataTable
      columns={[
        {
          id: 'supplier',
          header: 'Supplier',
          cell: ({ row }) => (
            <div className='capitalize'>{row.original.supplier.name}</div>
          )
        },
        {
          id: 'category',
          header: 'Industry',
          cell: ({ row }) => row.original.supplier.category
        },
        {
          id: 'exposure',
          header: 'Exposure To Risk',
          cell: ({ row }) => {
            const riskStatus = row.original.exposure;
            const { text, variant } = BADGE_MAP[riskStatus];
            return (
              <div className='capitalize'>
                <Badge variant={variant}>{text}</Badge>
              </div>
            );
          }
        },
        {
          accessorKey: 'region',
          header: 'Region',
          cell: ({ row }) => {
            const regions = row.original.supplier.regions;

            if (regions === null || regions.length === 0) return 'N/A';

            return RegionEnum[regions[0]];
          }
        }
      ]}
      data={impactedSuppliers}
      pagination={{
        manual: false,
        pageSize: 10
      }}
      tableClassName='bg-white'
      wrapperClassName='mt-6'
    />
  );
}
