'use client';

import Tabs from '#/components/tabs/tabs';
import { usePathname } from 'next/navigation';
import React from 'react';

const Alerts = () => {
  const pathname = usePathname();
  const selectedTab = pathname.split('/').pop();
  console.log('selecTab', selectedTab);
  const renderTabComponent = () => {
    switch (selectedTab) {
      case 'ransomware-attack':
        return <Tabs />;

      default:
        <Tabs />;
    }
  };
  return (
    <div className='w-full'>
      {/* <Sidebar /> */}
      {renderTabComponent()}
    </div>
  );
};

export default Alerts;
