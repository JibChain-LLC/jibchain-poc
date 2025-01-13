#!/usr/bin/env node

import assert from 'assert';
import { and, eq, inArray, isNotNull, sql } from 'drizzle-orm';
import { db } from '#/db';
import { risks, supplierExposure } from '#/db/schema/risks';
import { IndustryEnum, RiskCategoryEnum } from '#/enums';
import { exposureMapping } from './_helpers/mappings';

const count = await db.$count(risks, eq(risks.orgMapped, false));
if (count === 0) {
  console.log('Nothing to map');
  process.exit(0);
}

const riskGroups = await db
  .select({
    count: sql<number>`cast(count(${risks.id}) as int)`,
    riskCategory: risks.riskCategory,
    riskIds: sql<string[]>`ARRAY_AGG(${risks.id})`
  })
  .from(risks)
  .where(and(eq(risks.orgMapped, false), isNotNull(risks.riskCategory)))
  .groupBy(risks.riskCategory);

const exposureRecords: (typeof supplierExposure.$inferInsert)[] = [];
for await (const group of riskGroups) {
  const { riskCategory, riskIds } = group;
  console.log(riskCategory);

  const exposedIndustries = exposureMapping[riskCategory as RiskCategoryEnum];

  // get all suppliers that are impacted by this risk type
  const affectedSuppliers = await db.query.suppliers.findMany({
    columns: {
      id: true,
      name: true,
      category: true
    },
    where: (s, { inArray }) =>
      inArray(s.category, Object.keys(exposedIndustries) as IndustryEnum[])
  });
  console.log('Affected Suppliers');
  console.table(affectedSuppliers);

  // iterate and create records in exposure table

  const mergedRecords: (typeof supplierExposure.$inferInsert)[] =
    riskIds.flatMap((riskId) => {
      return affectedSuppliers.map(({ id: supplierId, category }) => {
        const exposure = exposedIndustries[category!]!;
        return { riskId, supplierId, exposure };
      });
    });

  assert(mergedRecords.length === riskIds.length * affectedSuppliers.length);
  exposureRecords.push(...mergedRecords);
}

console.log('Records');
console.table(exposureRecords);

// insert records into db
await db.transaction(async (tx) => {
  const inserted = await tx.insert(supplierExposure).values(exposureRecords);
  const riskIds = Array.from(new Set(exposureRecords.map((e) => e.riskId)));
  const updated = await tx
    .update(risks)
    .set({ orgMapped: true })
    .where(inArray(risks.id, riskIds));

  console.log('Rows inserted:', inserted.rowCount);
  console.log('Row updates:', updated.rowCount);
});

process.exit(0);
