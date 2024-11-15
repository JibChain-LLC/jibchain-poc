import React from 'react';
import { Card, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import { overviewCardData } from '#/utils/utils';

const OverviewCardComponent = () => {
  return (
    <div className='grid gap-6 lg:grid-cols-2 grid-cols-1 xl:grid-cols-3 bg-white rounded-none p-5'>
      {overviewCardData.map((item, i) => (
        <Card
          className='bg-transparent border-none shadow-md hover:shadow-lg transition-all rounded-md'
          key={i}>
          <CardHeader className='bg-transparent border-none p-0'>
            <div className='flex flex-row justify-between w-full'>
              <div className='flex items-center justify-between w-full bg-gray-100'>
                <div className='w-1/2'>
                  <CardTitle className='text-xl font-medium text-black p-5'>
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
                    className='opacity-40 max-w-full h-[150px] object-cover'
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
