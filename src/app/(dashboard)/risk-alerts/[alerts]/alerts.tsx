'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import Tabs from '#/components/tabs/tabs';

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
  return <>{renderTabComponent()}</>;
};

export default Alerts;
