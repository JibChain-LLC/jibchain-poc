'use client';

import * as React from 'react';
import TabComponent from '#/components/tabs/tab-component';
import { Card, CardContent } from '../ui/card';

export default function Tabs() {
  return (
    <Card className='max-h-screen'>
      <CardContent className='h-full p-8 pb-0'>
        <TabComponent
          threatPercentage={75}
          title='Ransomware Attack'
          threatLevel='High'
        />
      </CardContent>
    </Card>
  );
}
