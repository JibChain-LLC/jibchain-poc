import 'server-only';

import { and, between, eq, isNotNull, sql } from 'drizzle-orm';
import { ArrowDown, ArrowUp } from 'lucide-react';
import React from 'react';
import OrgCard from '#/components/organization-card';
import { Card, CardContent } from '#/components/ui/card';
import { Progress } from '#/components/ui/progress';
import { db } from '#/db';
import { risks, suppliers } from '#/db/schema/risks';
import { RiskLevelEnum } from '#/enums';
import { cn } from '#/lib/utils';
import { RouteOutputs } from '#/trpc/query-clients/client';
import MiniMap from './mini-map';
import TimeFrameRisks from './time-frame-risks';

interface SuppliersHeaderProps {
  supplierList: RouteOutputs['dash']['suppliers']['list'];
}

const BADGE_MAP: Record<RiskLevelEnum, { text: string; color: string }> = {
  low: { text: 'Low', color: 'bg-green-400' },
  med: { text: 'Medium', color: 'bg-yellow-400' },
  hi: { text: 'High', color: 'bg-red-400' }
};

function getDistinctCount(start: Date, end: Date, cat?: string) {
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
        ...(cat ? [eq(risks.riskCategory, cat)] : [])
      )
    )
    .groupBy(risks.riskCategory)
    .orderBy(sql<number>`cast(count(${risks.riskCategory}) as int) DESC`);
}

const SuppliersHeader = async (props: SuppliersHeaderProps) => {
  const { supplierList } = props;

  const totalSuppliers = await db.$count(suppliers);
  const distinctCountries = await db
    .select({
      count: sql<number>`cast(count(${suppliers.countryCode}) as int)`,
      countryCode: suppliers.countryCode
    })
    .from(suppliers)
    .where(isNotNull(suppliers.countryCode))
    .groupBy(suppliers.countryCode);

  const atRiskMap = supplierList.reduce(
    (acc, curr) => {
      if (!curr.riskEvents[0]) return acc;
      acc[curr.riskEvents[0].risk.riskLevel!] += 1;
      return acc;
    },
    {
      hi: 0,
      med: 0,
      low: 0
    } as Record<RiskLevelEnum, number>
  );

  const now = Date.now();
  const [thisWeek, ...rest] = await getDistinctCount(
    new Date(now - 7 * 86_400_000),
    new Date(now)
  );

  const [lastWeek] = await getDistinctCount(
    new Date(now - 14 * 86_400_000),
    new Date(now - 7 * 86_400_000),
    thisWeek.riskCategory!
  );

  const change = Math.floor(
    ((thisWeek.count - lastWeek.count) / lastWeek.count) * 100
  );

  const sum = [thisWeek, ...rest].reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className='row-span-1 grid w-full auto-rows-[255px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
      <div className='flex w-auto flex-col gap-4'>
        <OrgCard />
        <TimeFrameRisks endDate={Date.now()} />
      </div>

      <Card className='w-full'>
        <CardContent className='flex h-full flex-col justify-between px-7 py-6'>
          <div className='flex gap-16'>
            <div className='flex flex-col'>
              <h3 className='text-base font-normal leading-tight text-gray-600'>
                Total Suppliers
              </h3>
              <p className='text-4xl font-bold leading-tight'>
                {totalSuppliers}
              </p>
            </div>
            <div className='flex flex-col'>
              <h3 className='text-base font-normal leading-tight text-gray-600'>
                Countries
              </h3>
              <p className='text-4xl font-normal leading-tight'>
                {distinctCountries.length}
              </p>
            </div>
          </div>
          <MiniMap distinctCountries={distinctCountries} />
        </CardContent>
      </Card>

      <Card className='w-full'>
        <CardContent className='h-full px-7 py-6'>
          <h3 className='text-base font-normal leading-tight text-gray-600'>
            At Risk Suppliers
          </h3>
          <div className='mb-7 flex items-end gap-1'>
            <p className='text-4xl font-bold leading-none'>
              {Object.values(atRiskMap).reduce((acc, curr) => acc + curr, 0)}
            </p>
            <p className='text-xl font-normal leading-tight'>
              /{totalSuppliers}
            </p>
          </div>
          <div className='flex flex-row justify-between gap-4'>
            {Object.entries(atRiskMap).map(([level, count]) => {
              const { text, color } = BADGE_MAP[level as RiskLevelEnum];

              return (
                <div key={text} className='flex flex-col'>
                  <div className='flex flex-row items-center'>
                    <span
                      className={cn('mr-2 size-2 rounded-full', color)}></span>
                    <p className='text-sm font-medium text-gray-500'>{text}</p>
                  </div>
                  <p className='text-lg font-bold'>
                    {Math.floor(count / totalSuppliers) * 100}%
                  </p>
                  <p className='text-sm font-medium text-gray-500'>{count}</p>
                </div>
              );
            })}
          </div>
          <div className='relative mt-4 flex h-5 w-full overflow-hidden rounded-md'>
            {Object.entries(atRiskMap).map(([level, count]) => {
              const { color } = BADGE_MAP[level as RiskLevelEnum];

              return (
                <div
                  key={level}
                  className={cn('h-full rounded-none', color)}
                  style={{
                    width: `${Math.floor(count / totalSuppliers) * 100}%`
                  }}></div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className='w-full'>
        <CardContent className='flex h-full flex-col px-7 py-6'>
          <div className='mb-9'>
            <h3 className='text-base font-normal leading-tight text-gray-600'>
              Top Risk
            </h3>
            <p className='text-2xl font-bold leading-tight'>
              {thisWeek.riskCategory}
            </p>
          </div>
          <div className='mb-5'>
            <p
              className={cn(
                'flex items-center gap-0.5 text-sm font-bold text-red-500',
                change <= 0 && 'text-green-600'
              )}>
              {Math.abs(change)}%{' '}
              {React.createElement(change > 0 ? ArrowUp : ArrowDown, {
                className: 'size-3'
              })}
            </p>
            <p className='text-sm font-medium'>Increase since last week</p>
          </div>

          <div className='flex flex-col gap-1'>
            <div className='flex w-full items-center gap-1'>
              <Progress
                indicatorColor={change > 0 ? 'bg-red-500' : 'bg-green-600'}
                value={(thisWeek.count / sum) * 100}
                className='h-1.5 rounded-sm bg-gray-200'
              />
              <p className='text-xs font-medium text-gray-500'>
                {thisWeek.count}/{sum}
              </p>
            </div>
            <p className='text-sm font-medium'>
              <span className='font-bold'>
                {Math.floor((thisWeek.count / sum) * 100)}
                {'% '}
              </span>
              of total risk events
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuppliersHeader;
