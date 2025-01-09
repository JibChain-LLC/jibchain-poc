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
    <Card className='flex w-full flex-col items-start justify-start px-6 py-5'>
      <div
        className={cn(
          'flex flex-row items-center gap-0.5',
          isPositive ? 'text-red-600' : 'text-green-500'
        )}>
        <p className='text-sm font-bold'>{Math.abs(percentage)}%</p>
        {React.createElement(isPositive ? ArrowUp : ArrowDown, { size: 16 })}
      </div>
      <p className='text-base font-medium'>{label}</p>
    </Card>
  );
};

export default TopRiskCard;
