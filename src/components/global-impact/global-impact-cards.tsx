import React from 'react';
import { Card, CardContent } from '../ui/card';
import { globalImpactCard } from '#/utils/utils';
const GlobalImpactCards = () => {
  return (
    <div className='grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 '>
      {globalImpactCard.map((item, index) => (
        <Card
          key={index}
          className='flex flex-col items-center justify-center bg-white p-6 shadow-sm '>
          <CardContent className='text-center text-black'>
            <div className='text-2xl font-bold'>{item.value}</div>
            <div className='text-xl font-medium'>{item.title}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GlobalImpactCards;
