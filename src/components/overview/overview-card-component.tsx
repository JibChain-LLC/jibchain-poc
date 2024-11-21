import Image from 'next/image';
import React from 'react';
import { overviewCardData } from '#/utils/utils';
import { Card, CardHeader, CardTitle } from '../ui/card';

const OverviewCardComponent = () => {
  return (
    <div className='grid grid-cols-1 gap-6 rounded-none p-5 lg:grid-cols-2 xl:grid-cols-3'>
      {overviewCardData.map((item, i) => (
        <Card
          className='rounded-md border-none bg-transparent shadow-md transition-all hover:shadow-lg'
          key={i}>
          <CardHeader className='border-none bg-transparent p-0'>
            <div className='flex w-full flex-row justify-between'>
              <div className='flex w-full items-center justify-between bg-gray-100'>
                <div className='w-1/2'>
                  <CardTitle className='p-5 text-xl font-medium text-black'>
                    <span className='flex flex-col'>
                      <span className='text-slate-700'>{item.title}</span>
                      <span className='text-[32px] font-bold'>
                        {item.value}
                      </span>
                    </span>
                  </CardTitle>
                </div>
                <div className='w-1/2'>
                  <Image
                    src={item.icon}
                    alt={item.alt}
                    className='h-[150px] max-w-full object-cover opacity-40'
                  />
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default OverviewCardComponent;
