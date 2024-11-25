import React from 'react';
import { Card } from '../../../../components/ui/card';
import Image from 'next/image';

interface Supplier {
  logo: string;
  name: string;
  impact: string;
}

interface AtRiskSupplierCardProps {
  supplier: Supplier;
}

const AtRiskSupplierCard: React.FC<AtRiskSupplierCardProps> = ({ supplier }) => {
  return (
    <Card className="flex flex-col items-start justify-start px-6 py-4 w-full shadow-sm">
      <div className="flex flex-row items-center gap-4">
        <Image src={supplier.logo} alt={supplier.name} className="w-10 h-10" />
        <h1 className="text-base font-medium">{supplier.name}</h1>
      </div>
      <h3 className="font-medium text-gray-600">Impact to Operate</h3>
      <h1
        className={`font-semibold ${
          supplier.impact === 'High' ? 'text-red-600' : 'text-yellow-700'
        }`}
      >
        {supplier.impact}
      </h1>
    </Card>
  );
};

export default AtRiskSupplierCard;
