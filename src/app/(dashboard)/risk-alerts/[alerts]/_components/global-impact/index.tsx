'use client';

import React from 'react';
import type { RouteOutputs } from '#/trpc/query-clients/client';
import ImpactCard from './global-impact-cards';
import GlobalImpactTable from './global-impact-table';
import CountryRiskProbability from './world-map';

type RiskEntry = RouteOutputs['dash']['risks']['read'];
interface GlobalImpactProps {
  riskEntry: RiskEntry;
  totalSuppliers: number;
}

export default function GlobalImpact(props: GlobalImpactProps) {
  const { riskEntry, totalSuppliers } = props;

  const impacted = riskEntry.impactedSuppliers.length;

  return (
    <div className='min-w-full'>
      <CountryRiskProbability impactedSuppliers={riskEntry.impactedSuppliers} />
      <div className='mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3'>
        <ImpactCard
          title={'Global Impact'}
          subTitle={Math.ceil((impacted / totalSuppliers) * 100) + '%'}
          active
          className='order-last lg:order-first'
        />
        <ImpactCard
          title={'Total Suppliers'}
          subTitle={totalSuppliers.toString()}
        />
        <ImpactCard title={'Impacted Suppliers'} subTitle={impacted} />
      </div>
      <GlobalImpactTable impactedSuppliers={riskEntry.impactedSuppliers} />
    </div>
  );
}
