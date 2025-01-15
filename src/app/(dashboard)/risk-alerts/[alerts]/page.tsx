import 'server-only';
import { db } from '#/db';
import { suppliers } from '#/db/schema/risks';
import { trpc } from '#/trpc/query-clients/server';
import RiskPageClient from './_components/risk-page-client';

interface RiskPageServerProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ alerts: string }>;
}

export default async function RiskPageServer(props: RiskPageServerProps) {
  const { alerts } = await props.params;
  const { tab } = await props.searchParams;

  const data = await trpc.dash.risks
    .read(alerts)
    .then((r) => ({
      ...r,
      articleDate: r.articleDate?.toDateString() ?? null,
      created: r.created?.toDateString() ?? null,
      updated: r.updated?.toDateString() ?? null
    }))
    .catch(() => null);

  if (data === null) return <p>No such risk event</p>;

  const totalSuppliers = await db.$count(suppliers);

  return (
    <RiskPageClient data={data} totalSuppliers={totalSuppliers} tab={tab} />
  );
}
