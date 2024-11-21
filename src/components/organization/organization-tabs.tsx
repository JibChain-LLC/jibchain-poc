'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { cn } from '#/lib/utils';
import {
  criticalRiskAlerts,
  lowRiskAlerts,
  mediumRiskAlerts
} from '#/utils/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

function CustomTabTrigger({
  title,
  amount
}: {
  title: string;
  amount: number;
}) {
  return (
    <div className='flex flex-col gap-0'>
      <span className='text-xs font-medium leading-tight'>{title}</span>
      <span className='text-3xl font-semibold leading-tight'>{amount}</span>
    </div>
  );
}

function NavLink(
  props: React.ComponentProps<typeof Link> & { isActive?: boolean }
) {
  const { children, className, isActive, ...rest } = props;

  return (
    <Link
      {...rest}
      className={cn(
        'border border-transparent border-b-gray-100 px-2.5 py-3 text-base font-normal transition-colors hover:rounded-md hover:bg-gray-100',
        isActive &&
          'pointer-events-none rounded-md border-gray-300 bg-gray-100',
        className
      )}>
      {children}
    </Link>
  );
}

export default function OrganizationTabs() {
  const pathname = usePathname();

  return (
    <Tabs defaultValue='high' className='w-full'>
      <TabsList className='grid h-auto w-full grid-cols-3'>
        <TabsTrigger value='high' variant={'destructive'}>
          <CustomTabTrigger title='High Threat' amount={3} />
        </TabsTrigger>
        <TabsTrigger value='med' variant={'warning'}>
          <CustomTabTrigger title='Med. Threat' amount={7} />
        </TabsTrigger>
        <TabsTrigger value='low'>
          <CustomTabTrigger title='Low Threat' amount={10} />
        </TabsTrigger>
      </TabsList>
      <TabsContent value='high' className='flex flex-col'>
        {criticalRiskAlerts.map((alert, index) => (
          <NavLink
            href={`/risk-alerts${alert.link}`}
            key={index}
            isActive={pathname.endsWith(alert.link)}>
            {alert.label}
          </NavLink>
        ))}
      </TabsContent>
      <TabsContent value='med' className='flex flex-col'>
        {mediumRiskAlerts.map((alert, index) => (
          <NavLink
            href={`/risk-alerts${alert.link}`}
            key={index}
            isActive={pathname.endsWith(alert.link)}>
            {alert.label}
          </NavLink>
        ))}
      </TabsContent>
      <TabsContent value='low' className='flex flex-col'>
        {lowRiskAlerts.map((alert, index) => (
          <NavLink
            href={`/risk-alerts${alert.link}`}
            key={index}
            isActive={pathname.endsWith(alert.link)}>
            {alert.label}
          </NavLink>
        ))}
      </TabsContent>
    </Tabs>
  );
}
