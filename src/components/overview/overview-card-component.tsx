import Image from 'next/image';
import React from 'react';
import { overviewCardData } from '#/utils/utils';
import { Card, CardHeader, CardTitle } from '../ui/card';

const OverviewCardComponent = () => {
  return (
    <div className='grid grid-cols-1 gap-6 rounded-none p-5 lg:grid-cols-2 xl:grid-cols-3'>
      {overviewCardData.map((item, i) => (
        <Card
          className='rounded-md border border-transparent bg-transparent shadow-md transition-all duration-500 hover:border-green-400 hover:text-green-700 hover:shadow-lg'
          key={i}>
          <CardHeader className='flex w-full flex-row items-center justify-between rounded-lg border-none bg-gray-100 p-0 hover:bg-green-50'>
            <CardTitle className='w-1/2 p-5 text-xl font-medium'>
              <span className='flex flex-col'>
                <span className='text-nowrap'>{item.title}</span>
                <span className='text-[32px] font-bold'>{item.value}</span>
              </span>
            </CardTitle>
            <div className='flex items-center justify-end'>
              <Image
                src={item.icon}
                alt={item.alt}
                className='h-[150px] w-full object-cover opacity-40'
              />
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default OverviewCardComponent;
