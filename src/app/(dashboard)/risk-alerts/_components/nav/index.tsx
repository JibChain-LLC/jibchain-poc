'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import TimeFrame, {
  TimeValue
} from '#/components/defaul-components/time-frame';
import { Card, CardContent } from '#/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#/components/ui/tabs';
import { RiskLevelEnum } from '#/enums';
import { trpc, RouteOutputs } from '#/trpc/query-clients/client';
import CustomTabTrigger from './custom-tab-trigger';
import NavLink from './nav-link';
import OrganizationRisk from './organization-risk';

type RiskListRes = RouteOutputs['dash']['risks']['list'];

interface RiskNavProps {
  timeValue?: TimeValue;
  startDate: number;
  endDate: number;
}

const riskLabels: Record<
  RiskLevelEnum,
  {
    label: string;
    variant: React.ComponentProps<typeof TabsTrigger>['variant'];
  }
> = {
  hi: {
    label: 'High',
    variant: 'destructive'
  },
  med: {
    label: 'Medium',
    variant: 'warning'
  },
  low: {
    label: 'Low',
    variant: 'default'
  }
} as const;

const ONE_DAY_MS = 86_400_000;

export default function RiskNav(props: RiskNavProps) {
  const { timeValue: t, startDate: s, endDate } = props;

  const path = usePathname();
  const [startDate, setStartDate] = useState<number>(s);
  const [timeValue, setTimeValue] = useState<TimeValue>(t ?? 'live');
  const [riskList, setRiskList] = useState<RiskListRes>();
  const [selectedTab, setSelectedTab] = useState<RiskLevelEnum>(
    RiskLevelEnum.HI
  );

  const { data } = trpc.dash.risks.list.useQuery({
    startDate,
    endDate
  });

  const map = useMemo(
    () =>
      riskList?.data.reduce(
        (acc, curr) => {
          const { level, id, category } = curr;
          acc[level].push({ id, category });
          return acc;
        },
        { hi: [], med: [], low: [] } as Record<
          RiskLevelEnum,
          { id: string; category: string }[]
        >
      ),
    [riskList]
  );

  useEffect(() => {
    let start = endDate;

    switch (timeValue) {
      case '48-hours':
        start = start - ONE_DAY_MS * 2;
        break;
      case '4-days':
        start = start - ONE_DAY_MS * 4;
        break;
      case 'this-month':
        start = start - ONE_DAY_MS * 30;
        break;
      default:
        start = start - ONE_DAY_MS;
        break;
    }

    // refetch()

    setStartDate(start);
  }, [timeValue, endDate]);

  useEffect(() => {
    if (!data) return;
    setRiskList(data);
  }, [data]);

  return (
    <Card className='shrink grow overflow-y-hidden'>
      <CardContent className='flex h-full flex-col gap-6'>
        <TimeFrame onValueChange={(v) => setTimeValue(v)} />
        {riskList && (
          <OrganizationRisk
            data={riskList.data}
            selected={selectedTab as RiskLevelEnum}
          />
        )}
        <Tabs
          value={selectedTab}
          className='flex w-full flex-col overflow-hidden'
          onValueChange={(v) => setSelectedTab(v as RiskLevelEnum)}>
          <TabsList className='grid h-auto w-full grid-cols-3'>
            {riskList &&
              map &&
              Object.entries(riskLabels).map((item) => {
                const [key, { label, variant }] = item;
                const list = map[key as RiskLevelEnum] ?? [];

                return (
                  <TabsTrigger key={key} value={key} variant={variant}>
                    <CustomTabTrigger
                      title={`${label} Threat`}
                      amount={list.length}
                    />
                  </TabsTrigger>
                );
              })}
          </TabsList>
          <div className='h-auto overflow-y-auto'>
            {riskList &&
              Object.entries(map ?? {}).map((risks) => {
                const [key, list] = risks;

                return (
                  <TabsContent value={key} key={key} className='flex flex-col'>
                    {list.map(({ category, id }) => (
                      <NavLink
                        href={`/risk-alerts/${id}`}
                        key={id}
                        isActive={path.endsWith(id)}>
                        {category}
                      </NavLink>
                    ))}
                  </TabsContent>
                );
              })}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
