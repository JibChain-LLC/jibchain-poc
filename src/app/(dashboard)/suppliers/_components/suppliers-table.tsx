'use client';

import { Building } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar';
import { Badge } from '#/components/ui/badge';
import { DataTable } from '#/components/ui/data-table';
import { RegionEnum, RiskLevelEnum } from '#/enums';
import { RouteOutputs } from '#/trpc/query-clients/client';
import SupplierModal from './supplier-modal';

interface SupplierTableProps {
  supplierList: RouteOutputs['dash']['suppliers']['list'];
}

const BADGE_MAP: Record<
  RiskLevelEnum,
  { variant: React.ComponentProps<typeof Badge>['variant']; text: string }
> = {
  hi: { variant: 'destructive', text: 'High' },
  med: { variant: 'warning', text: 'Medium' },
  low: { variant: 'default', text: 'Low' }
};

export default function SuppliersTable(props: SupplierTableProps) {
  const { supplierList } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [supplierId, setSupplierId] = useState<string>();

  const handleColumnClick = (id: string) => {
    setIsModalOpen(true);
    setSupplierId(id);
  };

  return (
    <>
      <DataTable
        columns={[
          {
            id: 'supplier',
            header: 'Supplier',
            cell: ({ row }) => (
              <div className='flex items-center gap-2.5'>
                <Avatar className='size-8'>
                  <AvatarImage src='' alt='@shadcn' />
                  <AvatarFallback>
                    <Building size={16} />
                  </AvatarFallback>
                </Avatar>
                <p className='text-base font-medium leading-none'>
                  {row.original.name}
                </p>
              </div>
            )
          },
          {
            id: 'industry',
            header: 'Industry',
            cell: ({ row }) => row.original.category
          },
          {
            id: 'riskStatus',
            header: 'Risk Status',
            cell: ({ row }) => {
              if (row.original.riskEvents.length === 0)
                return <Badge variant={'secondary'}>None</Badge>;

              const riskStatus = row.original.riskEvents[0].risk.riskLevel;
              return (
                <Badge variant={BADGE_MAP[riskStatus!].variant}>
                  {BADGE_MAP[riskStatus!].text}
                </Badge>
              );
            }
          },
          {
            id: 'topRisk',
            header: 'Top Risk',
            cell: ({ row }) => (
              <p className='text-sm font-medium'>
                {row.original.riskEvents[0].risk.riskCategory ?? 'No Risk'}
              </p>
            )
          },
          {
            id: 'region',
            header: 'Region',
            cell: ({ row }) => (
              <p className='text-sm font-medium'>
                {row.original.regions
                  ? RegionEnum[row.original.regions[0]]
                  : 'N/A'}
              </p>
            )
          }
        ]}
        data={supplierList}
        pagination={{
          manual: false,
          pageSize: 10
        }}
        onColumnClick={({ id }) => handleColumnClick(id)}
        wrapperClassName='py-4'
      />
      {supplierId && (
        <SupplierModal
          isOpen={isModalOpen}
          setOpen={setIsModalOpen}
          supplierId={supplierId}
        />
      )}
    </>
  );
}
