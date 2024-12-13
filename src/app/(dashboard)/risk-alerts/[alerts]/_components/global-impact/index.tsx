'use client';

import React from 'react';
import GlobalImpactCards from './global-impact-cards';
import GlobalImpactTable from './global-impact-table';
import CountryRiskProbability from './world-map';

const GlobalImpact = () => {
  return (
    <div className='min-w-full'>
      <CountryRiskProbability />
      <GlobalImpactCards />
      <GlobalImpactTable />
    </div>
  );
};

export default GlobalImpact;
