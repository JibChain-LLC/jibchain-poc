import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Progress } from '../ui/progress';
import Image from 'next/image';
import ShellImage from '#/images/shell.svg';
import CountryRiskProbability from '../global-impact/country-risk-probability';
import { suppliersData } from '#/utils/utils';
import { supplierRiskLevels } from '#/utils/utils';

const SuppliersHeader = () => {
  return (
    <div className='gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full'>
      <div className='flex flex-col gap-4 w-auto'>
        <Card className='w-full min-h-[100px] flex items-center bg-white border-none shadow-md'>
          <CardContent className='flex items-center gap-12 p-4 text-black'>
            <Image
              src={ShellImage}
              alt='Shell Logo'
              className='w-[100px] h-[100px] rounded-md object-cover'
            />
            <div>
              <h2 className='text-xl font-bold'>Shell USA, Inc.</h2>
              <p className='text-gray-500'>Member since 2024</p>
            </div>
          </CardContent>
        </Card>
        <Card className='w-full min-h-[165px] flex items-center justify-between bg-white border-none shadow-md'>
          <CardContent className='p-4 flex flex-col items-center'>
            <div>
              <p className='text-gray-600'>Overall risk status</p>
              <p className='text-orange-500 text-[32px] font-semibold'>
                Medium
              </p>
            </div>
          </CardContent>
          <CardContent className='p-4 flex flex-col items-center'>
            <div className='text-left'>
              <p className='text-gray-600'>Active risks</p>
              <p className='font-semibold text-[32px] text-orange-500'>20</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className='w-full min-h-[280px] max-h-auto bg-white border-none shadow-md'>
        <CardContent className='md:p-6 p-0 space-y-4'>
          <div className='flex flex-wrap justify-between gap-4'>
            {suppliersData.map(({ label, value }) => (
              <div key={label} className='flex flex-col md:px-0 px-6'>
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

      <Card className='w-full min-h-[280px] max-h-auto bg-white border-none shadow-md'>
        <CardContent className='p-6 space-y-4 text-black'>
          <h3 className='text-xl font-semibold'>At Risk Suppliers</h3>
          <p className='text-3xl font-bold'>65</p>
          <div className='flex flex-row justify-between gap-4 pt-8'>
            {supplierRiskLevels.map(
              ({ label, value, count, indicatorColor }) => (
                <div
                  key={label}
                  className='flex justify-between items-center space-y-2'>
                  <span className='flex flex-col'>
                    <span className='flex flex-row items-center'>
                      <span
                        className={`w-2 h-2 rounded-full ${indicatorColor} mr-2`}></span>
                      {label}
                    </span>
                    <span className='flex flex-col '>
                      <span className='text-[22px] font-bold'>{value}%</span>{' '}
                      <span>{count}</span>
                    </span>
                  </span>
                </div>
              )
            )}
          </div>
          <div className='relative w-full h-6 rounded-md bg-gray-200 mt-4 flex overflow-hidden'>
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

      <Card className='w-full min-h-[280px] max-h-auto bg-white border-none shadow-md'>
        <CardContent className='p-6 space-y-4 text-black'>
          <div>
            <h3 className='text-gray-600'>Top Risk</h3>
            <p className='text-xl font-bold'>Ransomware Attack</p>
          </div>
          <div>
            <p className='font-normal text-sm'>
              <span className='font-bold'>9% </span>of total suppliers impacted
            </p>
            <div className='flex items-center justify-between'>
              <Progress
                indicatorColor='bg-red-500'
                value={9}
                className='h-1 bg-gray-200'
              />
              <span className='text-sm text-gray-600 ml-2'>22/243</span>
            </div>
          </div>
        </CardContent>
        <CardContent className='p-6 space-y-4'>
          <p className='text-sm text-gray-600 mt-4'>Increase since last week</p>
          <p className='text-red-500'>1.45% ↑</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuppliersHeader;
