'use client';

import * as React from 'react';
import TabComponent from '#/components/tabs/tab-component';

export default function Tabs() {
  return (
    <div className='w-full'>
      <div className='bg-gray-100 px-2 py-6 lg:px-1 lg:py-6'>
        <TabComponent
          threatPercentage={75}
          title='Ransomware Attack'
          threatLevel='High'
        />
      </div>
    </div>
  );
}
