import React from 'react';
import TopRiskCard from './top-risk-card';
import AtRiskSupplierCard from './at-risk-supplier-card';
import TimeFrame from '../../../../components/defaul-components/time-frame';
import { topRisk, atRiskSuppliers } from '../../../../utils/utils';

const RiskContainer = () => {
  return (
    <div className="lg:space-y-7 space-y-2 mt-8 lg:mb-0 mb-6 bg-gray-50 flex flex-col">
      <div className="w-full">
        <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between mb-2 mt-2">
          <h1 className="text-lg font-semibold text-nowrap mb-2 mt-2 lg:mb-0">Top Risk</h1>
          <div>
            <TimeFrame status={false} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
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
      <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between mb-2 mt-6">
         <h1 className="text-lg font-semibold text-nowrap mb-2 mt-2 lg:mb-0">
          At Risk Supplier
         </h1>
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
