import Image from 'next/image';
import React from 'react';
import { mitigationBestPractices } from '#/utils/utils';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import SummaryImage from '#/images/summary.svg';

const OverviewSummaryComponent = () => {
  const content = [
    {
      title: 'Mitigation Best Practices',
      body: (
        <p className='mt-4 max-w-[850px] text-base text-gray-700'>
          The Verizon 2025 Data Breach involved in 24% of all breaches. The
          report also notes a 13% increase in ransomware incidents compared to
          the previous year, Investigations Report indicates that ransomware has
          maintained its prevalence,{' '}
        </p>
      )
    },
    {
      title: 'Justification',
      body: (
        <p className='mt-4 max-w-[850px] text-base text-gray-700'>
          The Verizon 2025 Data Breach involved in 24% of all breaches. The
          report also notes a 13% increase in ransomware incidents compared to
          the previous year, Investigations Report indicates that ransomware has
          maintained its prevalence,{' '}
        </p>
      )
    }
  ];

  return (
    <div className='flex flex-col justify-between bg-white p-4 xl:flex-row'>
      <Card className='w-full max-w-[850px] rounded-none border border-none border-gray-200 bg-white shadow-none'>
        <CardHeader className='px-4 py-3'>
          <CardTitle className='text-sm font-semibold text-gray-400'>
            Summary
          </CardTitle>
        </CardHeader>
        <CardContent className='p-4'>
          <p className='text-[25px] text-gray-700'>
            Ransomware attacks continue to evolve and target organizations
            across various sectors. <br />
            <Button className='border border-green-700 bg-white p-5 text-[14px] text-green-700 hover:bg-green-600 hover:text-white'>
              Read Articles
            </Button>
          </p>
          <Image
            src={SummaryImage}
            alt='img'
            className='my-4 h-[200px] w-full max-w-[850px] rounded-lg object-cover'
          />
          {content.map((section, index) => (
            <div key={index} className='mt-6'>
              <h4 className='text-sm font-semibold text-gray-400'>
                {section.title}
              </h4>
              {section.body}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className='h-fit min-w-[400px] rounded-md border border-gray-200 bg-white p-3 shadow-md'>
        <CardHeader className='bg-none px-4 py-3'>
          <CardTitle className='font-semibold text-gray-500'>
            Potential Impact Areas
          </CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col items-start space-y-6 p-4 text-black'>
          {mitigationBestPractices.map((item, index) => (
            <div key={index} className='flex w-full items-start justify-center'>
              <item.icon className='mr-1 size-5 text-green-600' />{' '}
              <p className='-mt-0.5 w-full border-b border-gray-200 pb-3'>
                {item.label}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewSummaryComponent;
