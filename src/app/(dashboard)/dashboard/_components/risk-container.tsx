import React from 'react';
import TimeFrame from '../../../../components/defaul-components/time-frame';
import { topRisk, atRiskSuppliers } from '../../../../utils/utils';
import SupplierRiskCard from './supplier-risk-card';
import TopRiskCard from './top-risk-card';

const RiskContainer = () => {
  return (
    <div className='flex h-full flex-col gap-4 lg:mb-0 lg:justify-between lg:gap-0'>
      <div className='flex w-full flex-col gap-2'>
        <div className='flex w-full items-center justify-between'>
          <h1 className='text-nowrap text-base font-medium'>Top Risk</h1>
          <TimeFrame status={false} />
        </div>
        <div className='grid grid-cols-1 gap-4'>
          {topRisk.map((risk, index) => (
            <TopRiskCard
              key={index}
              percentage={risk.percentage}
              label={risk.label}
            />
          ))}
        </div>
      </div>
      <div className='flex w-full flex-col gap-2'>
        <div className='flex w-full items-center justify-between'>
          <h1 className='text-nowrap text-base font-medium lg:mb-0'>
            At Risk Supplier
          </h1>
          <TimeFrame status={false} />
        </div>
        <div className='grid grid-cols-1 gap-4'>
          {atRiskSuppliers.map((supplier, index) => (
            <SupplierRiskCard key={index} supplier={supplier} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiskContainer;
