import React from 'react';
import { cn } from '#/lib/utils';
import { Card } from '../../../../components/ui/card';

interface Supplier {
  logo: React.ComponentType<{ className?: string }>;
  name: string;
  impact: string;
}

interface SupplierRiskCardProps {
  supplier: Supplier;
}

const SupplierRiskCard: React.FC<SupplierRiskCardProps> = ({ supplier }) => {
  return (
    <Card className='flex w-full flex-col items-start justify-start px-6 py-4 shadow-sm'>
      <div className='flex flex-row items-center gap-4'>
        <supplier.logo className='size-4' />
        <h1 className='text-base font-medium'>{supplier.name}</h1>
      </div>
      <h3 className='font-medium text-gray-600'>Impact to Operate</h3>
      <h1
        className={cn('font-semibold', {
          'text-red-600': supplier.impact === 'High',
          'text-yellow-700': supplier.impact !== 'High'
        })}>
        {supplier.impact}
      </h1>
    </Card>
  );
};

export default SupplierRiskCard;
