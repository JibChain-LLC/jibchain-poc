'use client';
import { ColumnDef, Table as TableType } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Badge } from '#/components/ui/badge';
import { Button } from '#/components/ui/button';
import { Checkbox } from '#/components/ui/checkbox';
import { DataTable } from '#/components/ui/data-table';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '#/components/ui/dropdown-menu';
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
      cell: ({ row }) => (
        <Image
          src={row.getValue('image')}
          alt={row.getValue('supplier')}
          width={56}
          height={56}
          className='rounded-none'
        />
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
            ? 'bg-green-200 text-green-800'
            : riskStatus === 'Medium'
              ? 'bg-orange-200 text-orange-800'
              : 'bg-red-200 text-red-800';

        return <Badge className={riskColor}>{riskStatus}</Badge>;
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
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='p-1'>
              <MoreHorizontal className='size-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
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
