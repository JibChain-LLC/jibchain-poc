import Image from 'next/image';
import React from 'react';
import { overviewCardData } from '#/utils/utils';
import { Card, CardHeader, CardTitle } from '../ui/card';

const OverviewCardComponent = () => {
  return (
    <div className='grid grid-cols-1 gap-6 rounded-none p-5 lg:grid-cols-2 xl:grid-cols-3'>
      {overviewCardData.map((item, i) => (
        <Card
          className='flex items-center justify-center rounded-md border-none bg-gray-100 shadow-md transition-all hover:shadow-lg h-[132px]'
          key={i}>
          <CardHeader className='border-none bg-transparent p-0 w-full'>
            <div className='flex flex-row items-center'>
              <div className='w-full'>
                <CardTitle className='p-5 text-xl font-medium text-black'>
                  <span className='flex flex-col'>
                    <span className='text-slate-700'>{item.title}</span>
                    <span className='text-[32px] font-bold'>{item.value}</span>
                  </span>
                </CardTitle>
              </div>
              <div className='w-full flex items-center justify-end'>
                <Image src={item.icon} alt={item.alt} className='xl:w-auto w-full object-cover'/>
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default OverviewCardComponent;
