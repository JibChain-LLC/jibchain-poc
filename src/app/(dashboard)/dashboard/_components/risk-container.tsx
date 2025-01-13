import 'server-only';

import { and, between, inArray, isNotNull, sql } from 'drizzle-orm';
import React from 'react';
import { db } from '#/db';
import { risks } from '#/db/schema/risks';
import SupplierRiskCard from './supplier-risk-card';
import TopRiskCard from './top-risk-card';

function getDistinctCount(start: Date, end: Date, cat?: string[]) {
  return db
    .select({
      count: sql<number>`cast(count(${risks.riskCategory}) as int)`.as('count'),
      riskCategory: risks.riskCategory
    })
    .from(risks)
    .where(
      and(
        isNotNull(risks.riskCategory),
        between(risks.articleDate, start, end),
        ...(cat ? [inArray(risks.riskCategory, cat)] : [])
      )
    )
    .groupBy(risks.riskCategory)
    .limit(3)
    .orderBy(sql<number>`cast(count(${risks.riskCategory}) as int) DESC`);
}

const RiskContainer = async () => {
  const now = Date.now();

  const thisWeek = (
    await getDistinctCount(new Date(now - 7 * 86_400_000), new Date(now))
  ).reduce(
    (acc, curr) => {
      acc[curr.riskCategory!] = curr.count;
      return acc;
    },
    {} as Record<string, number>
  );

  const lastWeek = (
    await getDistinctCount(
      new Date(now - 14 * 86_400_000),
      new Date(now - 7 * 86_400_000),
      Object.keys(thisWeek)
    )
  ).reduce(
    (acc, curr) => {
      acc[curr.riskCategory!] = curr.count;
      return acc;
    },
    {} as Record<string, number>
  );

  const riskChanges = Object.keys(thisWeek).reduce(
    (acc, curr) => {
      acc[curr] = Math.floor(
        ((thisWeek[curr] - lastWeek[curr]) / lastWeek[curr]) * 100
      );
      return acc;
    },
    {} as Record<string, number>
  );

  const atRiskSuppliers = await db.query.suppliers.findMany({
    columns: { name: true },
    limit: 3,
    with: {
      riskEvents: {
        limit: 1,
        columns: { exposure: true }
      }
    }
  });

  return (
    <div className='flex h-full flex-col gap-4 lg:mb-0 lg:justify-between lg:gap-0'>
      <div className='flex w-full flex-col gap-2'>
        <div className='flex w-full items-center justify-between'>
          <h1 className='text-nowrap text-base font-medium'>Top Risk</h1>
          <p className='text-xs font-semibold text-gray-600'>This week</p>
        </div>
        <div className='grid grid-cols-1 gap-4'>
          {Object.entries(riskChanges).map(([category, change], index) => (
            <TopRiskCard key={index} percentage={change} label={category} />
          ))}
        </div>
      </div>
      <div className='flex w-full flex-col gap-2'>
        <div className='flex w-full items-center justify-between'>
          <h1 className='text-nowrap text-base font-medium lg:mb-0'>
            At Risk Supplier
          </h1>
          <p className='text-xs font-semibold text-gray-600'>This week</p>
        </div>
        <div className='grid grid-cols-1 gap-4'>
          {atRiskSuppliers.map((supplier, index) => (
            <SupplierRiskCard
              key={index}
              supplier={{
                name: supplier.name!,
                impact: supplier.riskEvents[0].exposure
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiskContainer;
