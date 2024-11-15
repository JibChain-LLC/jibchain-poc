'use client';
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  criticalRiskAlerts,
  lowRiskAlerts,
  mediumRiskAlerts
} from '#/utils/utils';
import { Button } from '../ui/button';
import { useRouter, usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

const OrganizationTabs = () => {
  const [activeTab, setActiveTab] = useState('High');
  const [activeAlert, setActiveAlert] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setActiveAlert(pathname);
  }, [pathname]);

  const handleAlertClick = (link: string) => {
    const fullPath = `/risk-alerts${link}`;
    setActiveAlert(fullPath);
    router.push(fullPath);
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className='w-auto bg-transparent'>
      <TabsList className='bg-transparent pb-8'>
        <TabsTrigger
          value='High'
          className={`border-b-[1px] rounded-none ${activeTab === 'High' ? 'border-red-500' : ''}`}>
          <span
            className={`${activeTab === 'High' ? 'text-red-500 hover:text-red-500 duration-150 flex flex-col' : 'hover:text-red-500 duration-150 flex flex-col'}`}>
            High Threat
            <span className='text-[29px] p-1'>3</span>
          </span>
        </TabsTrigger>
        <TabsTrigger
          value='Medium'
          className={`border-b-[1px] rounded-none ${activeTab === 'Medium' ? 'border-[#8E4B10]' : ''}`}>
          <span
            className={`${activeTab === 'Medium' ? 'text-[#8E4B10] hover:text-[#8E4B10] duration-150 flex flex-col' : 'hover:text-[#8E4B10] duration-150 flex flex-col'}`}>
            Med. Threat
            <span className='text-[29px] p-1'>7</span>
          </span>
        </TabsTrigger>
        <TabsTrigger
          value='Low'
          className={`border-b-[1px] rounded-none ${activeTab === 'Low' ? 'border-[#046C4E]' : ''}`}>
          <span
            className={`${activeTab === 'Low' ? 'text-[#046C4E] hover:text-[#046C4E] duration-150 flex flex-col' : 'hover:text-[#046C4E] duration-150 flex flex-col'}`}>
            Low Threat
            <span className='text-[29px] p-1'>10</span>
          </span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value='High' className='overflow-y-auto'>
        {criticalRiskAlerts.map((alert, index) => (
          <Button
            key={index}
            onClick={() => handleAlertClick(alert.link)}
            className={`w-full justify-between py-6 text-md bg-white text-black hover:bg-gray-100 ${
              activeAlert === `/dashboard${alert.link}`
                ? 'border border-red-500 bg-red-50'
                : ''
            }`}>
            {alert.label}
            <ChevronRight className='h-4 w-4' />
          </Button>
        ))}
      </TabsContent>

      <TabsContent value='Medium' className='overflow-y-auto'>
        {mediumRiskAlerts.map((alert, index) => (
          <Button
            key={index}
            onClick={() => handleAlertClick(alert.link)}
            className={`w-full justify-between py-6 text-md bg-white text-black hover:bg-gray-100${
              activeAlert === `/dashboard${alert.link}`
                ? 'border border-[#8E4B10] bg-orange-50'
                : ''
            }`}>
            {alert.label}
            <ChevronRight className='h-4 w-4' />
          </Button>
        ))}
      </TabsContent>

      <TabsContent value='Low' className='overflow-y-auto'>
        {lowRiskAlerts.map((alert, index) => (
          <Button
            key={index}
            onClick={() => handleAlertClick(alert.link)}
            className={`w-full justify-between py-6 text-md bg-white text-black hover:bg-gray-100${
              activeAlert === `/dashboard${alert.link}`
                ? 'border border-[#046C4E] bg-green-50'
                : ''
            }`}>
            {alert.label}
            <ChevronRight className='h-4 w-4' />
          </Button>
        ))}
      </TabsContent>
    </Tabs>
  );
};

export default OrganizationTabs;
