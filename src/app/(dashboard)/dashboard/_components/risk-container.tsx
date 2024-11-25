import React from 'react';
import TopRiskCard from './risk-card';
import AtRiskSupplierCard from './at-risk-supplier-card';
import TimeFrame from '../../../../components/defaul-components/time-frame';
import { topRisk, atRiskSuppliers } from '../../../../utils/utils';

const RiskContainer = () => {
  return (
    <div className="space-y-6 mt-8 lg:mb-0 mb-6 bg-gray-50">
      <div className="w-full">
        <div className="w-full flex flex-row items-center justify-between mb-2">
          <h1 className="text-lg font-semibold text-nowrap">Top Risk</h1>
          <div>
            <TimeFrame status={false} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {topRisk.map((risk, index) => (
            <TopRiskCard
              key={index}
              trend={risk.trend}
              percentage={risk.percentage}
              label={risk.label}
            />
          ))}
        </div>
      </div>
      <div className="w-full">
        <div className="w-full flex flex-row items-center justify-between mb-2 mt-8">
          <h1 className="text-lg font-semibold text-nowrap">At Risk Supplier</h1>
          <div>
            <TimeFrame status={false} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {atRiskSuppliers.map((supplier, index) => (
            <AtRiskSupplierCard key={index} supplier={supplier} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiskContainer;
