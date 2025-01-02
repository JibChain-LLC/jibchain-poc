'use client';

import { format } from 'date-fns';
import { ComponentProps, useState } from 'react';
import { Badge } from '#/components/ui/badge';
import { DataTable } from '#/components/ui/data-table';
import { Sheet } from '#/components/ui/sheet';
import { RiskLevelEnum } from '#/enums';
import { cn } from '#/lib/utils';
import { trpc } from '#/trpc/query-clients/client';
import RiskSheet from './risk-sheet';

export const BADGE_MAP: Record<
  RiskLevelEnum,
  { text: string; variant: ComponentProps<typeof Badge>['variant'] }
> = {
  low: { text: 'Low', variant: 'default' },
  med: { text: 'Medium', variant: 'warning' },
  hi: { text: 'High', variant: 'destructive' }
};

export default function RiskTable() {
  const { data, isPending } = trpc.dash.risks.list.useQuery({
    include: { metdata: true },
    order: 'desc'
  });

  const [isSheetOpen, setSheetOpen] = useState(false);
  const [riskId, setRiskId] = useState<string>();

  return (
    <>
      <Sheet open={isSheetOpen}>
        {riskId && <RiskSheet setSheetOpen={setSheetOpen} id={riskId} />}
      </Sheet>
      {!isPending && data && (
        <DataTable
          pagination={{ manual: false, pageSize: 20 }}
          data={data.data}
          onColumnClick={(r) => {
            setSheetOpen(true);
            setRiskId(r.id);
          }}
          columns={[
            {
              id: 'id',
              header: 'ID',
              cell: ({ row }) => (
                <code className='rounded-md border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-xs'>
                  {row.original.id}
                </code>
              )
            },
            {
              id: 'category',
              accessorKey: 'riskCategory',
              header: 'Risk Category',
              cell: ({ row }) =>
                row.original.riskCategory +
                ` (${Math.ceil(row.original.probability! * 100) + '%'})`
            },
            {
              id: 'level',
              header: 'Risk Level',
              cell: ({ row }) => (
                <Badge variant={BADGE_MAP[row.original.riskLevel!].variant}>
                  {BADGE_MAP[row.original.riskLevel!].text}
                </Badge>
              )
            },
            {
              id: 'article-date',
              header: 'Event Date',
              cell: ({ row }) =>
                row.original.articleDate
                  ? format(row.original.articleDate, 'MMM d yyyy')
                  : null
            },
            {
              id: 'updated',
              header: 'Last Updated',
              cell: ({ row }) =>
                row.original.updated
                  ? format(row.original.updated, 'MMM d yyyy')
                  : null
            },
            {
              id: 'verified',
              header: 'Verified',
              cell: ({ row }) => (
                <div
                  className={cn(
                    'size-2.5 rounded-full',
                    row.original.verified! ? 'bg-green-500' : 'bg-red-600'
                  )}></div>
              )
            }
          ]}
        />
      )}
    </>
  );
}
