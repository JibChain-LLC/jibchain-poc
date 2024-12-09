import { Building } from 'lucide-react';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar';
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
    <Card className='flex w-full flex-col items-start justify-start px-6 py-5'>
      <div className='mb-2 flex flex-row items-center gap-2.5'>
        <Avatar className='size-8'>
          <AvatarImage src='' />
          <AvatarFallback>
            <Building size={16} />
          </AvatarFallback>
        </Avatar>
        <h1 className='text-base font-medium'>{supplier.name}</h1>
      </div>
      <p className='text-xs font-medium leading-tight text-gray-600'>
        Impact to operation
      </p>
      <p
        className={cn('text-sm font-semibold leading-none', {
          'text-green-600': supplier.impact === 'Low',
          'text-red-600': supplier.impact === 'High',
          'text-yellow-700': supplier.impact === 'Medium'
        })}>
        {supplier.impact}
      </p>
    </Card>
  );
};

export default SupplierRiskCard;
