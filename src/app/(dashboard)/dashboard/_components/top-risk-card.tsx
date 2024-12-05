import { ArrowUp, ArrowDown } from 'lucide-react';
import React from 'react';
import { cn } from '#/lib/utils';
import { Card } from '../../../../components/ui/card';

interface TopRiskCardProps {
  percentage: number;
  label: string;
}

const TopRiskCard: React.FC<TopRiskCardProps> = ({ percentage, label }) => {
  const isPositive = percentage > 0;

  return (
    <Card className='flex w-full flex-col items-start justify-start px-6 py-5 shadow-sm'>
      <div className='flex flex-row items-center gap-2'>
        <h2
          className={cn(
            'font-bold',
            isPositive ? 'text-green-500' : 'text-red-500'
          )}>
          {percentage}%
        </h2>
        {isPositive ? (
          <ArrowUp className='size-5 text-green-500' />
        ) : (
          <ArrowDown className='size-5 text-red-500' />
        )}
      </div>
      <h1 className='text-base font-medium'>{label}</h1>
    </Card>
  );
};

export default TopRiskCard;
