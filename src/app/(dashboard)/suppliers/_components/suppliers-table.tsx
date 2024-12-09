'use client';
import { ColumnDef, Table as TableType } from '@tanstack/react-table';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar';
import { Badge } from '#/components/ui/badge';
import { Checkbox } from '#/components/ui/checkbox';
import { DataTable } from '#/components/ui/data-table';
import { Input } from '#/components/ui/input';
import { Suppliers, supplierTableInvoices } from '#/utils/utils';
import SupplierModal from './supplier-modal';

interface ControlsProps {
  table: TableType<Suppliers>;
}

export default function SuppliersTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleColumnClick = () => {
    setIsModalOpen(true);
  };
  const columns: ColumnDef<Suppliers>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          onClick={(e) => e.stopPropagation()}
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      ),
      enableSorting: false
    },
    {
      accessorKey: 'image',
      header: '',
      cell: () => (
        <Avatar>
          <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      )
    },
    {
      accessorKey: 'supplier',
      header: 'Supplier',
      cell: ({ row }) => row.getValue('supplier')
    },
    {
      accessorKey: 'riskStatus',
      header: 'Risk Status',
      cell: ({ row }) => {
        const riskStatus = row.getValue('riskStatus') as string;
        const riskColor =
          riskStatus === 'Low'
            ? 'default'
            : riskStatus === 'Medium'
              ? 'warning'
              : 'destructive';

        return <Badge variant={riskColor}>{riskStatus}</Badge>;
      }
    },
    {
      accessorKey: 'topRisk',
      header: 'Top Risk',
      cell: ({ row }) => row.getValue('topRisk')
    },
    {
      accessorKey: 'impactOperation',
      header: 'Impact to Operation',
      cell: ({ row }) => {
        const impact = row.getValue('impactOperation') as string;
        const dotColor =
          impact === 'High'
            ? 'bg-red-500'
            : impact === 'Medium'
              ? 'bg-yellow-500'
              : 'bg-green-500';

        return (
          <div className='flex items-center'>
            <span className={`mr-2 size-2 rounded-full ${dotColor}`}></span>
            {impact}
          </div>
        );
      }
    },
    {
      accessorKey: 'region',
      header: 'Region',
      cell: ({ row }) => row.getValue('region')
    }
  ];

  const Controls = ({ table }: ControlsProps) => (
    <div className='flex items-center py-4'>
      <Input
        placeholder='Filter suppliers...'
        value={(table.getColumn('supplier')?.getFilterValue() as string) ?? ''}
        onChange={(event) =>
          table.getColumn('supplier')?.setFilterValue(event.target.value)
        }
        className='max-w-sm'
      />
    </div>
  );

  return (
    <>
      <DataTable
        columns={columns}
        data={supplierTableInvoices}
        controls={Controls}
        pagination={{
          manual: false,
          pageSize: 10
        }}
        onColumnClick={handleColumnClick}
        wrapperClassName='py-4'
      />
      {isModalOpen && (
        <SupplierModal isOpen={isModalOpen} setOpen={setIsModalOpen} />
      )}
    </>
  );
}
