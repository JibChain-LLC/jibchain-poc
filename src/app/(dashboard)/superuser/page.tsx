import { eq } from 'drizzle-orm';
import { DataTable } from '#/components/ui/data-table';
import { db } from '#/db';
import { risks, scenarioPlanning } from '#/db/schema/risks';

export default async function SuperUserPage() {
  const riskRecords = await db
    .select({
      id: risks.id,
      category: risks.riskCategory,
      date: risks.articleDate
    })
    .from(risks)
    .innerJoin(scenarioPlanning, eq(risks.id, scenarioPlanning.riskId));

  console.log(riskRecords);

  return (
    <div>
      <DataTable
        data={riskRecords}
        columns={[
          { id: 'id', accessorKey: 'id' },
          { id: 'category', accessorKey: 'category' }
        ]}
      />
    </div>
  );
}
