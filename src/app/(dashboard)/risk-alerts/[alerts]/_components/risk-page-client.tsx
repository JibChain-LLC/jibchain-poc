'use client';

import { FileText, Globe, ShieldAlert } from 'lucide-react';
import { createElement, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#/components/ui/tabs';
import { RouteOutputs } from '#/trpc/query-clients/client';
import GlobalImpact from './global-impact';
import OverviewComponent from './overview';
import RiskAlertHeader from './risks-alerts-header';
import ScenarioAccordion from './scenario-planning';

const operations = [
  {
    label: 'Overview',
    value: 'overview',
    content: OverviewComponent,
    icon: FileText
  },
  {
    label: 'Global Impact',
    value: 'global-impact',
    content: GlobalImpact,
    icon: Globe
  },
  {
    label: 'Scenario Planning',
    value: 'scenario-planning',
    content: ScenarioAccordion,
    icon: ShieldAlert
  }
] as const;

export type AlertTab = (typeof operations)[number]['value'];

type RiskEntry = RouteOutputs['dash']['risks']['read'];
interface RiskPageClientProps {
  data: RiskEntry;
  totalSuppliers: number;
  tab?: string | string[] | undefined;
}

export default function RiskPageClient({
  data,
  totalSuppliers,
  tab
}: RiskPageClientProps) {
  const [activeTab, setActiveTab] = useState<AlertTab>(
    tab && !Array.isArray(tab) && operations.some((o) => o.value === tab)
      ? (tab as AlertTab)
      : 'overview'
  );

  return (
    <div className='flex h-full flex-col'>
      <RiskAlertHeader
        date={data.articleDate!}
        level={data.riskLevel!}
        probability={data.probability!}
        category={data.riskCategory!}
      />
      <Tabs
        className='flex w-full flex-col overflow-hidden'
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as AlertTab)}>
        <TabsList className='grid h-auto w-full grid-cols-3'>
          {operations.map(({ value, label, icon }) => (
            <TabsTrigger key={value} value={value}>
              {createElement(icon, { className: 'mr-1 size-5' })}
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className='h-auto overflow-y-auto'>
          {operations.map(({ value, content: Content }) => (
            <TabsContent value={value} key={value}>
              <Content
                riskEntry={data}
                totalSuppliers={totalSuppliers}
                setActiveTab={setActiveTab}
              />
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
