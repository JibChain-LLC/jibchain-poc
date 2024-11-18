import React from 'react';
import CountryRiskProbability from './country-risk-probability';
import GlobalImpactCards from './global-impact-cards';
import { GlobalImpactTable } from './global-impact-table';

const GlobalImpact = () => {
  return (
    <div className='min-w-full'>
      <CountryRiskProbability supplier={false} />
      <GlobalImpactCards />
      <GlobalImpactTable />
    </div>
  );
};

export default GlobalImpact;
