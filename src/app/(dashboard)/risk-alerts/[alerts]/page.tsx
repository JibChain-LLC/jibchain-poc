import { FileText, Globe, ShieldAlert } from 'lucide-react';
import { createElement } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#/components/ui/tabs';
import { trpc } from '#/trpc/query-clients/server';
import GlobalImpact from './_components/global-impact';
import OverviewComponent from './_components/overview';
import RiskAlertHeader from './_components/risks-alerts-header';
import ScenarioAccordion from './_components/scenario-planning';

export async function generateStaticParams() {
  return [
    { alerts: 'internal-security' },
    { alerts: 'ransomware-attack' },
    { alerts: 'natural-disaster' },
    { alerts: 'terrorism' },
    { alerts: 'cyber-security' },
    { alerts: 'technological-failure' },
    { alerts: 'internal-security' },
    { alerts: 'labor-strike' },
    { alerts: 'public-health-crisis' },
    { alerts: 'economic-downturn' },
    { alerts: 'environmental' },
    { alerts: 'supply-chain' },
    { alerts: 'regulatory-changes' },
    { alerts: 'political' },
    { alerts: 'counterfeit-parts' },
    { alerts: 'legal-risks' },
    { alerts: 'sdlc-processes' },
    { alerts: 'cloud-service' }
  ];
}

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

interface RiskPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ alerts: string }>;
}

export default async function RiskPage(props: RiskPageProps) {
  const { alerts } = await props.params;
  const { tab } = await props.searchParams;

  const data = await trpc.dash.risks.read(alerts).catch(() => null);
  if (data === null) return <p>No such risk event</p>;

  const defaultTab: (typeof operations)[number]['value'] =
    tab && !Array.isArray(tab) && operations.some((o) => o.value === tab)
      ? (tab as (typeof operations)[number]['value'])
      : 'overview';

  return (
    <div className='flex h-full flex-col'>
      <RiskAlertHeader
        probability={data.probability}
        category={data.category}
      />
      <Tabs
        className='flex w-full flex-col overflow-hidden'
        defaultValue={defaultTab}>
        <TabsList className='grid h-auto w-full grid-cols-3'>
          {operations.map(({ value, label, icon }) => (
            <TabsTrigger key={value} value={value}>
              {createElement(icon, { className: 'mr-1 size-5' })}
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className='h-auto overflow-y-auto after:sticky after:bottom-0 after:block after:h-10 after:w-full after:bg-white after:content-[""] after:[mask-image:linear-gradient(0deg,#000_0%,transparent_100%)]'>
          {operations.map((item) => {
            const { content: Content, value } = item;
            return (
              <TabsContent value={value} key={value}>
                <Content />
              </TabsContent>
            );
          })}
        </div>
      </Tabs>
    </div>
  );
}
