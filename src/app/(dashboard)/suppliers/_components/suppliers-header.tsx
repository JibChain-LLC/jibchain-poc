import 'server-only';

import { isNotNull, sql } from 'drizzle-orm';
import { ArrowUp } from 'lucide-react';
import React from 'react';
import TimeFrame from '#/components/defaul-components/time-frame';
import OrgCard from '#/components/organization-card';
import { Card, CardContent } from '#/components/ui/card';
import { Progress } from '#/components/ui/progress';
import { db } from '#/db';
import { suppliers } from '#/db/schema/risks';
import { cn } from '#/lib/utils';
import { supplierRiskLevels } from '#/utils/utils';
import MiniMap from './mini-map';

const SuppliersHeader = async () => {
  const totalSuppliers = await db.$count(suppliers);
  const distinctCountries = await db
    .select({
      count: sql<number>`cast(count(${suppliers.countryCode}) as int)`,
      countryCode: suppliers.countryCode
    })
    .from(suppliers)
    .where(isNotNull(suppliers.countryCode))
    .groupBy(suppliers.countryCode);

  return (
    <div className='row-span-1 grid w-full auto-rows-[255px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
      <div className='flex w-auto flex-col gap-4'>
        <OrgCard />
        <Card className='flex w-full grow flex-col items-center justify-center'>
          <CardContent className='flex size-full flex-col gap-7 px-5'>
            <TimeFrame className='w-full' />
            <div className='flex w-full justify-between'>
              <div className='flex flex-col gap-0.5'>
                <p className='text-xs font-medium leading-tight text-gray-500'>
                  Overall risk status
                </p>
                <p className='text-2xl font-bold leading-tight text-orange-600'>
                  Medium
                </p>
              </div>
              <div className='flex flex-col gap-0.5'>
                <p className='text-xs font-medium leading-tight text-gray-500'>
                  Active risks
                </p>
                <p className='text-2xl font-bold leading-tight'>20</p>
              </div>
            </div>
          </CardContent>
        </Card>
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
            <p className='text-4xl font-bold leading-none'>65</p>
            <p className='text-xl font-normal leading-tight'>/243</p>
          </div>
          <div className='flex flex-row justify-between gap-4'>
            {supplierRiskLevels.map(
              ({ label, value, count, indicatorColor }) => (
                <div key={label} className='flex flex-col'>
                  <div className='flex flex-row items-center'>
                    <span
                      className={cn(
                        'mr-2 size-2 rounded-full',
                        indicatorColor
                      )}></span>
                    <p className='text-sm font-medium text-gray-500'>{label}</p>
                  </div>
                  <p className='text-lg font-bold'>{value}%</p>
                  <p className='text-sm font-medium text-gray-500'>{count}</p>
                </div>
              )
            )}
          </div>
          <div className='relative mt-4 flex h-5 w-full overflow-hidden rounded-md'>
            {supplierRiskLevels.map(({ value, indicatorColor }, index) => (
              <div
                key={index}
                className={cn('h-full rounded-none', indicatorColor)}
                style={{
                  width: `${value}%`
                }}></div>
            ))}
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
              Ransomware Attack
            </p>
          </div>
          <div className='mb-5'>
            <p className='flex items-center gap-0.5 text-sm font-bold text-red-500'>
              1.45% <ArrowUp className='size-3' />
            </p>
            <p className='text-sm font-medium'>Increase since last week</p>
          </div>

          <div className='flex flex-col gap-1'>
            <div className='flex w-full items-center gap-1'>
              <Progress
                indicatorColor='bg-red-500'
                value={9}
                className='h-1.5 rounded-sm bg-gray-200'
              />
              <p className='text-xs font-medium text-gray-500'>22/243</p>
            </div>
            <p className='text-sm font-medium'>
              <span className='font-bold'>9% </span>of total suppliers impacted
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuppliersHeader;
