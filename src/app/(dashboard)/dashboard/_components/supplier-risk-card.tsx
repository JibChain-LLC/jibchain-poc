import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar';
import { Card } from '#/components/ui/card';
import { RiskLevelEnum } from '#/enums';
import { cn } from '#/lib/utils';

interface Supplier {
  name: string;
  impact: RiskLevelEnum;
}

interface SupplierRiskCardProps {
  supplier: Supplier;
}

const BADGE_MAP: Record<RiskLevelEnum, string> = {
  low: 'Low',
  med: 'Medium',
  hi: 'High'
};

const SupplierRiskCard: React.FC<SupplierRiskCardProps> = (props) => {
  const { supplier } = props;

  return (
    <Card className='flex w-full flex-col items-start justify-start px-6 py-5'>
      <div className='mb-2 flex flex-row items-center gap-2.5'>
        <Avatar className='size-8'>
          <AvatarImage src='' />
          <AvatarFallback className='text-white'>
            {supplier.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h1 className='text-base font-medium'>{supplier.name}</h1>
      </div>
      <p className='text-xs font-medium leading-tight text-gray-600'>
        Exposure to risk
      </p>
      <p
        className={cn('text-sm font-semibold leading-none', {
          'text-green-600': supplier.impact === 'low',
          'text-red-600': supplier.impact === 'hi',
          'text-yellow-700': supplier.impact === 'med'
        })}>
        {BADGE_MAP[supplier.impact]}
      </p>
    </Card>
  );
};

export default SupplierRiskCard;
