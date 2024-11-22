import React from 'react';
import { Card } from '../../../../components/ui/card';
import Image from 'next/image';
import TimeFrame from '../../../../components/defaul-components/time-frame';
import { topRisk, atRiskSuppliers } from '../../../../utils/utils';
import { ArrowUp } from 'lucide-react';
import { ArrowDown } from 'lucide-react';
function TopRiskCards() {
  return (
    <div className="space-y-6 mt-8 lg:mb-0 mb-6 bg-gray-50">
      <div className="w-full">
        <div className="w-full flex flex-row items-center justify-between mb-2 ">
          <h1 className="text-lg font-semibold text-nowrap">Top Risk</h1>
          <div >
          <TimeFrame status={false} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {topRisk.map((risk, index) => (
            <Card
              key={index}
              className="flex flex-col items-start justify-start px-6 py-4 w-full shadow-sm"
            >
              <div className="flex flex-row gap-2 items-center">
                <h2
                  className={`font-bold ${
                    risk.trend === 'up' ? 'text-red-500' : 'text-green-500'
                  }`}
                >
                  {risk.percentage}
                </h2>
                {risk.trend === 'up' ? (
                  <ArrowUp className="text-red-500 w-5 h-5" />
                ) : (
                  <ArrowDown className="text-green-500 w-5 h-5" />
                )}
              </div>
              <h1 className="text-base font-medium">{risk.label}</h1>
            </Card>
          ))}
        </div>
      </div>

      <div className="w-full">
        <div className="w-full flex flex-row items-center justify-between mb-2 mt-8">
          <h1 className="text-lg font-semibold text-nowrap">At Risk Supplier</h1>
          <div >
          <TimeFrame status={false} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {atRiskSuppliers.map((supplier, index) => (
            <Card
              key={index}
              className="flex flex-col items-start justify-start px-6 py-4 w-full shadow-sm"
            >
              <div className="flex flex-row items-center gap-4">
                <Image
                  src={supplier.logo}
                  alt={supplier.name}
                  className="w-10 h-10"
                />
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopRiskCards;
