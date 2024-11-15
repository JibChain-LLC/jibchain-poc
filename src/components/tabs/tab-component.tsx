'use client';

import * as React from 'react';
import { Printer } from 'lucide-react';

import { ShieldAlert, Globe, FileText } from 'lucide-react';

import { Button } from '../ui/button';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import OverviewComponent from '../overview/overview';
import GlobalImpact from '../global-impact/global-impact';
import ScenarioPlanning from '../scenario-planning/scenario-planning';

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
      icon: <FileText className='mr-1 h-5 w-5' />
    },
    {
      label: 'Global Impact',
      value: 'global-impact',
      icon: <Globe className='mr-1 h-5 w-5' />
    },
    {
      label: 'Scenario Planning',
      value: 'scenario-planning',
      icon: <ShieldAlert className='mr-1 h-5 w-5' />
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
    <div className='bg-white rounded-t-md rounded-b-md shadow-sm'>
      <div className='p-6 flex items-center justify-between'>
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
          <Button className='bg-green-700 text-white hover:bg-green-600 px-4 py-2 rounded-md text-lg'>
            <Printer className='mr-2 h-5 w-5' />
            Export Report
          </Button>
          <Button variant='ghost' className='text-gray-500 text-xl'>
            ...
          </Button>
        </div>
      </div>
      <Tabs value={currentTab} className='pt-4 px-4'>
        <TabsList className='bg-transparent pb-2 border-b border-gray-300 w-full'>
          <div className='flex w-full justify-evenly items-center'>
            {operations.map((op, index) => (
              <TabsTrigger
                key={index}
                value={op.value}
                className={`text-lg font-medium flex items-center rounded-none hover:bg-slate-100 ${
                  currentTab === op.value
                    ? 'text-green-700 border-b-2 border-green-700 w-full'
                    : 'text-gray-500 w-full'
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
      <div className='2xl:h-[78.5vh] h-[75vh] shadow-lg overflow-y-auto'>
        {renderTabContent()}
        <div className='h-[20px]'></div>
      </div>
    </div>
  );
};

export default TabComponent;
