import React from 'react';
import OrgCard from '#/components/organization-card';
import { suppliersData } from '#/utils/utils';
import { supplierRiskLevels } from '#/utils/utils';
import CountryRiskProbability from '../../../../components/global-impact/country-risk-probability';
import { Card, CardContent } from '../../../../components/ui/card';
import { Progress } from '../../../../components/ui/progress';

const SuppliersHeader = () => {
  return (
    <div className='grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      <div className='flex w-auto flex-col gap-4'>
        <OrgCard />
        <Card className='flex min-h-[198px] w-full items-center justify-between border-none bg-white shadow-md'>
          <CardContent className='flex flex-col items-center p-4'>
            <div>
              <p className='text-gray-600'>Overall risk status</p>
              <p className='text-[32px] font-semibold text-orange-500'>
                Medium
              </p>
            </div>
          </CardContent>
          <CardContent className='flex flex-col items-center p-4'>
            <div className='text-left'>
              <p className='text-gray-600'>Active risks</p>
              <p className='text-[32px] font-semibold text-orange-500'>20</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className='min-h-[280px] w-full border-none bg-white shadow-md'>
        <CardContent className='space-y-4 p-0 md:p-6'>
          <div className='flex flex-wrap justify-between gap-4'>
            {suppliersData.map(({ label, value }) => (
              <div key={label} className='flex flex-col px-6 md:px-0'>
                <h3 className='text-gray-600'>{label}</h3>
                <p className='text-[42px] font-normal text-black'>{value}</p>
              </div>
            ))}
          </div>
        </CardContent>
        <div className='h-32'>
          <CountryRiskProbability supplier={true} />
        </div>
      </Card>

      <Card className='min-h-[280px] w-full border-none bg-white shadow-md'>
        <CardContent className='space-y-4 p-6 text-black'>
          <h3 className='text-xl font-semibold'>At Risk Suppliers</h3>
          <p className='text-3xl font-bold'>65</p>
          <div className='flex flex-row justify-between gap-4 pt-8'>
            {supplierRiskLevels.map(
              ({ label, value, count, indicatorColor }) => (
                <div
                  key={label}
                  className='flex items-center justify-between space-y-2'>
                  <span className='flex flex-col'>
                    <span className='flex flex-row items-center'>
                      <span
                        className={`size-2 rounded-full ${indicatorColor} mr-2`}></span>
                      {label}
                    </span>
                    <span className='flex flex-col'>
                      <span className='text-[22px] font-bold'>{value}%</span>{' '}
                      <span>{count}</span>
                    </span>
                  </span>
                </div>
              )
            )}
          </div>
          <div className='relative mt-4 flex h-6 w-full overflow-hidden rounded-md bg-gray-200'>
            {supplierRiskLevels.map(({ value, indicatorColor }, index) => (
              <Progress
                key={index}
                value={value}
                className={`h-6 ${indicatorColor} rounded-none`}
                indicatorColor={indicatorColor}
                style={{
                  width: `${value}%`
                }}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className='min-h-[280px] w-full border-none bg-white shadow-md'>
        <CardContent className='space-y-4 p-6 text-black'>
          <div>
            <h3 className='text-gray-600'>Top Risk</h3>
            <p className='text-xl font-bold'>Ransomware Attack</p>
          </div>
          <div>
            <p className='text-sm font-normal'>
              <span className='font-bold'>9% </span>of total suppliers impacted
            </p>
            <div className='flex items-center justify-between'>
              <Progress
                indicatorColor='bg-red-500'
                value={9}
                className='h-1 bg-gray-200'
              />
              <span className='ml-2 text-sm text-gray-600'>22/243</span>
            </div>
          </div>
        </CardContent>
        <CardContent className='space-y-4 p-6'>
          <p className='mt-4 text-sm text-gray-600'>Increase since last week</p>
          <p className='text-red-500'>1.45% ↑</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuppliersHeader;
