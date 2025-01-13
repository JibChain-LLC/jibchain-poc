import { desc, getTableColumns, sql } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '#/db';
import { risks, supplierExposure, suppliers } from '#/db/schema/risks';
import { authProcedure } from '#/trpc/init';

const getSuppliersInputs = z.object({
  limit: z.number().int().gte(0).lte(100).default(100),
  offset: z.number().int().gte(0).default(0)
});

type InnerRisk = Pick<
  typeof supplierExposure.$inferSelect,
  'id' | 'exposure'
> & {
  risk: Pick<typeof risks.$inferSelect, 'id' | 'riskCategory' | 'riskLevel'>;
};

export const getSuppliers = authProcedure
  .input(getSuppliersInputs)
  .query(async (opts) => {
    const { limit, offset } = opts.input;

    const t = await db
      .select({
        ...getTableColumns(suppliers),
        riskEvents: sql<InnerRisk[]>`array_agg(
          json_build_object(
            'id', exposures.id, 
            'exposure', exposures.exposure, 
            'risk', json_build_object(
              'id', sub_risks.id, 
              'riskCategory', sub_risks.risk_category, 
              'riskLevel', sub_risks.risk_level
              )
            )
          )`.as('riskEvents')
      })
      .from(suppliers)
      .innerJoin(
        db
          .select()
          .from(supplierExposure)
          .orderBy(desc(supplierExposure.exposure))
          .as('exposures'),
        sql`exposures.supplier_id = ${suppliers.id}`
      )
      .innerJoin(
        db
          .select()
          .from(risks)
          .orderBy(desc(risks.articleDate), desc(risks.riskLevel))
          .limit(4)
          .as('sub_risks'),
        sql`sub_risks.id = exposures.risk_id`
      )
      .limit(limit)
      .offset(offset)
      .groupBy(suppliers.id);

    return t;
  });
