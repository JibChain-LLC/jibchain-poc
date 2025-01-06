'use client';

import React from 'react';
import GlobalImpactCards from './global-impact-cards';
import GlobalImpactTable from './global-impact-table';
import CountryRiskProbability from './world-map';
import { usePathname } from 'next/navigation';
import { trpc } from '#/trpc/query-clients/client';

const GlobalImpact = () => {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const id = parts[parts.length - 1];
  const { data, isLoading } = trpc.dash.risks.read.useQuery(id);
  
console.log('data22',data)
if (isLoading) return <p>LOading..</p>
if (data?.impactedSuppliers) {
  return (
    <div className='min-w-full'>
      <CountryRiskProbability />
      <GlobalImpactCards />
      <GlobalImpactTable data={data} />
    </div>
  );
}
};

export default GlobalImpact;
