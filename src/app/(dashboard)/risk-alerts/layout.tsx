import 'server-only';

import OrgCard from '#/components/organization-card';
import { Card, CardContent } from '#/components/ui/card';
import { HydrateClient, trpc } from '#/trpc/query-clients/server';
import RiskNav from './_components/nav';

interface RiskAlertsLayoutProps {
  children: React.ReactNode;
}

export default async function RiskAlertsLayout(props: RiskAlertsLayoutProps) {
  const { children } = props;

  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 1);

  await trpc.dash.risks.list.prefetch({
    range: { startDate: startDate.getTime(), endDate: endDate.getTime() }
  });

  return (
    <div className='grid h-[calc(100vh-2.5rem)] grid-cols-[336px_1fr] grid-rows-1 gap-4'>
      <div className='flex flex-col gap-4'>
        <OrgCard />
        <HydrateClient>
          <RiskNav
            startDate={startDate.getTime()}
            endDate={endDate.getTime()}
          />
        </HydrateClient>
      </div>
      <Card>
        <CardContent className='h-full px-8 py-7'>{children}</CardContent>
      </Card>
    </div>
  );
}
