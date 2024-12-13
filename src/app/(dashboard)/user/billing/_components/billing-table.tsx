'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import React from 'react';
import { Badge } from '#/components/ui/badge';
import { Button } from '#/components/ui/button';
import { DataTable } from '#/components/ui/data-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '#/components/ui/dropdown-menu';
import { billingHistroyData } from '#/utils/utils';
import { BillingHistoryTypes } from '#/utils/utils';

export const columns: ColumnDef<BillingHistoryTypes>[] = [
  {
    accessorKey: 'InvoiceId',
    header: 'Invoice ID',
    cell: ({ row }) => row.getValue('InvoiceId')
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => row.getValue('date')
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount);
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const riskStatus = row.getValue('status') as string;
      const riskColor =
        riskStatus === 'Paid'
          ? 'default'
          : riskStatus === 'Pending'
            ? 'warning'
            : 'destructive';

      return <Badge variant={riskColor}>{riskStatus}</Badge>;
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const billing = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='size-8 p-0'>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(billing.id)}>
              Copy billing ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View billing details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];

export default function BillingHistoryTable() {
  return (
    <div className='bg-white'>
      <DataTable
        columns={columns}
        data={billingHistroyData}
        pagination={{
          manual: false,
          pageSize: 5
        }}
      />
      <div className='flex justify-start bg-white py-4'>
        <Button>Save Changes </Button>
      </div>
    </div>
  );
}
