import React from 'react';
import { globalImpactCard } from '#/utils/utils';
import { Card, CardContent } from '../ui/card';

const GlobalImpactCards = () => {
  return (
    <div className='grid grid-cols-1 gap-7 p-4 md:grid-cols-2 lg:grid-cols-3'>
      {globalImpactCard.map((item, index) => (
        <Card
          key={index}
          className={`relative flex flex-col items-start justify-start rounded-lg border shadow-md ${
            index === 0
              ? 'border-green-400 bg-green-50 text-green-700'
              : 'border-gray-200 bg-gray-50 text-gray-700'
          }`}>
          <CardContent
            className={`grid gap-1 px-8 py-5 text-left ${index === 0 ? 'text-green-900' : 'text-gray-700'}`}>
            <div className='text-nowrap text-base font-normal'>
              {item.title}
            </div>
            <div className='text-2xl font-bold'>{item.value}</div>
          </CardContent>
          {index === 0 && (
            <div className='absolute bottom-[-13px] left-1/2 size-6 -translate-x-1/2 rotate-45 rounded-none border-b border-r border-green-500 bg-green-50'></div>
          )}
        </Card>
      ))}
    </div>
  );
};

export default GlobalImpactCards;
