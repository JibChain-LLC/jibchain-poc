import { redirect } from 'next/navigation';
import { db } from '#/db';

export default async function Dashboard() {
  const newest = await db.query.risks.findFirst({
    columns: { id: true },
    orderBy: (r, { desc }) => [desc(r.articleDate)]
  });

  redirect(`/risk-alerts/${newest?.id ?? 'none'}`);
}
