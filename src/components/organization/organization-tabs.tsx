'use client';
import { ChevronRight } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {
  criticalRiskAlerts,
  lowRiskAlerts,
  mediumRiskAlerts
} from '#/utils/utils';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

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
          className={`rounded-none border-b ${activeTab === 'High' ? 'border-red-500' : ''}`}>
          <span
            className={`${activeTab === 'High' ? 'flex flex-col text-red-500 duration-150 hover:text-red-500' : 'flex flex-col duration-150 hover:text-red-500'}`}>
            High Threat
            <span className='p-1 text-[29px]'>3</span>
          </span>
        </TabsTrigger>
        <TabsTrigger
          value='Medium'
          className={`rounded-none border-b ${activeTab === 'Medium' ? 'border-[#8E4B10]' : ''}`}>
          <span
            className={`${activeTab === 'Medium' ? 'flex flex-col text-[#8E4B10] duration-150 hover:text-[#8E4B10]' : 'flex flex-col duration-150 hover:text-[#8E4B10]'}`}>
            Med. Threat
            <span className='p-1 text-[29px]'>7</span>
          </span>
        </TabsTrigger>
        <TabsTrigger
          value='Low'
          className={`rounded-none border-b ${activeTab === 'Low' ? 'border-[#046C4E]' : ''}`}>
          <span
            className={`${activeTab === 'Low' ? 'flex flex-col text-[#046C4E] duration-150 hover:text-[#046C4E]' : 'flex flex-col duration-150 hover:text-[#046C4E]'}`}>
            Low Threat
            <span className='p-1 text-[29px]'>10</span>
          </span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value='High' className='overflow-y-auto'>
        {criticalRiskAlerts.map((alert, index) => (
          <Button
            key={index}
            onClick={() => handleAlertClick(alert.link)}
            className={`text-md w-full justify-between bg-white py-6 text-black hover:bg-gray-100 ${
              activeAlert === `/dashboard${alert.link}`
                ? 'border border-red-500 bg-red-50'
                : ''
            }`}>
            {alert.label}
            <ChevronRight className='size-4' />
          </Button>
        ))}
      </TabsContent>

      <TabsContent value='Medium' className='overflow-y-auto'>
        {mediumRiskAlerts.map((alert, index) => (
          <Button
            key={index}
            onClick={() => handleAlertClick(alert.link)}
            className={`text-md w-full justify-between bg-white py-6 text-black hover:bg-gray-100${
              activeAlert === `/dashboard${alert.link}`
                ? 'border border-[#8E4B10] bg-orange-50'
                : ''
            }`}>
            {alert.label}
            <ChevronRight className='size-4' />
          </Button>
        ))}
      </TabsContent>

      <TabsContent value='Low' className='overflow-y-auto'>
        {lowRiskAlerts.map((alert, index) => (
          <Button
            key={index}
            onClick={() => handleAlertClick(alert.link)}
            className={`text-md w-full justify-between bg-white py-6 text-black hover:bg-gray-100${
              activeAlert === `/dashboard${alert.link}`
                ? 'border border-[#046C4E] bg-green-50'
                : ''
            }`}>
            {alert.label}
            <ChevronRight className='size-4' />
          </Button>
        ))}
      </TabsContent>
    </Tabs>
  );
};

export default OrganizationTabs;
