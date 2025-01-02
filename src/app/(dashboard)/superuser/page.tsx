import { formatDistanceToNow } from 'date-fns';
import { eq } from 'drizzle-orm';
import { db } from '#/db';
import { risks } from '#/db/schema/risks';
import { HydrateClient, trpc } from '#/trpc/query-clients/server';
import OverviewCard from '../risk-alerts/[alerts]/_components/overview/overview-card';
import RiskTable from './_components/risk-table';

export default async function SuperUserPage() {
  await trpc.dash.risks.list.prefetch({
    include: { metdata: true },
    order: 'desc'
  });

  const lastCreated = await db.query.risks.findFirst({
    orderBy: (r, { desc }) => [desc(r.created)]
  });
  const totalCount = await db.$count(risks);
  const totalVerified = await db.$count(risks, eq(risks.verified, true));

  return (
    <HydrateClient>
      <div>
        <div className='mb-4 grid grid-cols-3 gap-4'>
          <OverviewCard
            header='Last Pipeline Run'
            subHeader={
              formatDistanceToNow(lastCreated?.created as Date) + ' ago'
            }
          />
          <OverviewCard
            header='Total Risk Records'
            subHeader={totalCount.toString()}
          />
          <OverviewCard
            header='Percentage Verified'
            subHeader={`${Math.ceil(totalVerified / totalCount) * 100}%`}
          />
        </div>
        <RiskTable />
      </div>
    </HydrateClient>
  );
}
