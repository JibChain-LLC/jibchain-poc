import React from 'react';
import { Card } from '../../../../components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface TopRiskCardProps {
  trend: string;
  percentage: string;
  label: string;
}

const TopRiskCard: React.FC<TopRiskCardProps> = ({ trend, percentage, label }) => {
  return (
    <Card className="flex flex-col items-start justify-start px-6 py-4 w-full shadow-sm">
      <div className="flex flex-row gap-2 items-center">
        <h2 className={`font-bold ${trend === 'up' ? 'text-red-500' : 'text-green-500'}`}>{percentage}</h2>
        {trend === 'up' ? (
          <ArrowUp className="text-red-500 w-5 h-5" />
        ) : (
          <ArrowDown className="text-green-500 w-5 h-5" />
        )}
      </div>
      <h1 className="text-base font-medium">{label}</h1>
    </Card>
  );
};

export default TopRiskCard;
