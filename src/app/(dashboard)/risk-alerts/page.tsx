import { redirect } from 'next/navigation';
import { trpc } from '#/trpc/query-clients/server';

export default async function Dashboard() {
  const { data } = await trpc.dash.risks.list();
  redirect(`/risk-alerts/${data[0].id}`);
}
