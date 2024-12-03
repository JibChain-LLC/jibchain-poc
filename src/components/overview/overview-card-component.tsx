import Image from 'next/image';
import React from 'react';
import { overviewCardData } from '#/utils/utils';
import { Card, CardHeader, CardTitle } from '../ui/card';

const OverviewCardComponent = () => {
  return (
    <div className='grid grid-cols-1 gap-6 rounded-none p-5 lg:grid-cols-2 xl:grid-cols-3'>
      {overviewCardData.map((item, i) => (
        <Card
          className='rounded-md border border-transparent bg-transparent shadow-md hover:shadow-lg hover:border-green-400 transition-all duration-500 hover:text-green-700 '
          key={i}>
          <CardHeader className='border-none bg-transparent p-0 flex-row justify-between flex w-full items-center  rounded-lg  bg-gray-100 hover:bg-green-50'>
                  <CardTitle className='p-5 text-xl font-medium  w-1/2'>
                    <span className='flex flex-col'>
                      <span className=''>{item.title}</span>
                      <span className='text-[32px] font-bold '>
                        {item.value}
                      </span>
                    </span>
                  </CardTitle>
                  <div className='flex justify-end items-center'>
                  <Image
                    src={item.icon}
                    alt={item.alt}
                    className='h-[150px] object-cover opacity-40 w-full'
                  />
                  </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default OverviewCardComponent;
