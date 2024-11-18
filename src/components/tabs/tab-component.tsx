'use client';

import { Printer } from 'lucide-react';

import { ShieldAlert, Globe, FileText } from 'lucide-react';
import * as React from 'react';

import GlobalImpact from '../global-impact/global-impact';
import OverviewComponent from '../overview/overview';
import ScenarioPlanning from '../scenario-planning/scenario-planning';
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
    <div className='rounded-md bg-white shadow-sm'>
      <div className='flex items-center justify-between p-6'>
        <div className='flex flex-col'>
          <span className='text-sm font-medium text-gray-500'>Risk Title</span>
          <div className='flex items-center gap-2'>
            <h1 className='text-2xl font-bold text-black'>{title}</h1>
            <div className='rounded bg-red-100 px-3 py-1 text-sm font-semibold text-red-700'>
              {threatLevel}: {threatPercentage}%
            </div>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <Button className='rounded-md bg-green-700 px-4 py-2 text-lg text-white hover:bg-green-600'>
            <Printer className='mr-2 size-5' />
            Export Report
          </Button>
          <Button variant='ghost' className='text-xl text-gray-500'>
            ...
          </Button>
        </div>
      </div>
      <Tabs value={currentTab} className='px-4 pt-4'>
        <TabsList className='w-full border-b border-gray-300 bg-transparent pb-2'>
          <div className='flex w-full items-center justify-evenly'>
            {operations.map((op, index) => (
              <TabsTrigger
                key={index}
                value={op.value}
                className={`flex items-center rounded-none text-lg font-medium hover:bg-slate-100 ${
                  currentTab === op.value
                    ? 'w-full border-b-2 border-green-700 text-green-700'
                    : 'w-full text-gray-500'
                }`}
                onClick={() => setCurrentTab(op.value)}>
                {React.cloneElement(op.icon as React.ReactElement, {
                  className: `mr-1 h-5 w-5 ${
                    currentTab === op.value ? 'text-green-700' : 'text-gray-500'
                  }`
                })}
                {op.label}
              </TabsTrigger>
            ))}
          </div>
        </TabsList>
      </Tabs>
      <div className='h-[75vh] overflow-y-auto shadow-lg 2xl:h-[78.5vh]'>
        {renderTabContent()}
        <div className='h-[20px]'></div>
      </div>
    </div>
  );
};

export default TabComponent;
