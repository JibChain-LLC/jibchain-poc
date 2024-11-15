import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import MoneyImage from '#/images/money-image.jpg';
import Image from 'next/image';
import { mitigationBestPractices } from '#/utils/utils';

const OverviewSummaryComponent = () => {
  const content = [
    {
      title: 'Mitigation Best Practices',
      body: (
        <p className='mt-4 text-base text-gray-700 max-w-[850px]'>
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
        <p className='mt-4 text-base text-gray-700 max-w-[850px]'>
          The Verizon 2025 Data Breach involved in 24% of all breaches. The
          report also notes a 13% increase in ransomware incidents compared to
          the previous year, Investigations Report indicates that ransomware has
          maintained its prevalence,{' '}
        </p>
      )
    }
  ];

  return (
    <div className='flex justify-between xl:flex-row flex-col bg-white p-4'>
      <Card className='bg-white border border-gray-200 shadow-none rounded-none border-none max-w-[850px] w-full'>
        <CardHeader className='py-3 px-4'>
          <CardTitle className='text-sm font-semibold text-gray-400'>
            Summary
          </CardTitle>
        </CardHeader>
        <CardContent className='p-4'>
          <p className='text-[25px] text-gray-700'>
            Ransomware attacks continue to evolve and target organizations
            across various sectors. <br />
            <Button className='text-green-700 bg-white hover:bg-green-600 hover:text-white border border-green-700 text-[14px] p-5'>
              Read Articles
            </Button>
          </p>
          <Image
            src={MoneyImage}
            alt='img'
            className='max-w-[850px] w-full h-[200px] rounded-lg my-4'
          />
          {content.map((section, index) => (
            <div key={index} className='mt-6'>
              <h4 className='font-semibold text-gray-400 text-sm'>
                {section.title}
              </h4>
              {section.body}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className='bg-white border border-gray-200 shadow-md rounded-md min-w-[400px] h-fit p-3'>
        <CardHeader className='bg-none py-3 px-4'>
          <CardTitle className='text-md font-semibold text-gray-500'>
            Potential Impact Areas
          </CardTitle>
        </CardHeader>
        <CardContent className='p-4 space-y-6 flex flex-col items-start text-black'>
          {mitigationBestPractices.map((item, index) => (
            <div key={index} className='flex justify-center items-start w-full'>
              <item.icon className='mr-1 h-5 w-5 text-green-600' />
              <p className='border-b-[1px] border-gray-200 w-full pb-3'>
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
