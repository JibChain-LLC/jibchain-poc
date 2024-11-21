'use client';

import { MoreHorizontal } from 'lucide-react';

import { ShieldAlert, Globe, FileText } from 'lucide-react';
import * as React from 'react';

import GlobalImpact from '../global-impact/global-impact';
import OverviewComponent from '../overview/overview';
import ScenarioPlanning from '../scenario-planning/scenario-planning';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';

interface TabProps {
  title: string;
  threatLevel: string;
  threatPercentage: number;
  operations?: { label: string; value: string; icon: React.ReactNode }[];
}

const TabComponent: React.FC<TabProps> = ({
  title = 'Ransomware Attack',
  threatLevel = 'High Threat',
  threatPercentage = 0,
  operations = [
    {
      label: 'Overview',
      value: 'overview',
      icon: <FileText className='mr-1 size-5' />
    },
    {
      label: 'Global Impact',
      value: 'global-impact',
      icon: <Globe className='mr-1 size-5' />
    },
    {
      label: 'Scenario Planning',
      value: 'scenario-planning',
      icon: <ShieldAlert className='mr-1 size-5' />
    }
  ]
}) => {
  const [currentTab, setCurrentTab] = React.useState(operations[0].value);

  const renderTabContent = () => {
    switch (currentTab) {
      case 'overview':
        return <OverviewComponent />;
      case 'global-impact':
        return <GlobalImpact />;
      case 'scenario-planning':
        return <ScenarioPlanning />;
      default:
        return <OverviewComponent />;
    }
  };

  return (
    <div className='flex h-full flex-col'>
      <div className='mb-6 flex items-center justify-between'>
        <div className='flex flex-col gap-1.5'>
          <div className='flex flex-row items-center gap-1.5'>
            <span className='text-xs font-semibold text-gray-500'>
              Live view:
            </span>
            <Badge variant={'destructive'}>
              {threatLevel} Threat: {threatPercentage}%
            </Badge>
          </div>
          <p className='text-2xl font-semibold leading-tight text-gray-950'>
            {title}
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <Button variant='ghost' className='text-xl text-gray-500'>
            <MoreHorizontal />
          </Button>
          <Button>Download Report</Button>
        </div>
      </div>
      <Tabs value={currentTab} className='w-full'>
        <TabsList className='grid h-auto w-full grid-cols-3'>
          {operations.map((op, index) => (
            <TabsTrigger
              key={index}
              value={op.value}
              onClick={() => setCurrentTab(op.value)}>
              {React.cloneElement(op.icon as React.ReactElement)}
              {op.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className='overflow-y-auto after:sticky after:bottom-0 after:block after:h-10 after:w-full after:bg-white after:content-[""] after:[mask-image:linear-gradient(0deg,#000_0%,transparent_100%)]'>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default TabComponent;
