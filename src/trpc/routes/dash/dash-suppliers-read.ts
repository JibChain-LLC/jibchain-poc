import { TRPCError } from '@trpc/server';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '#/db';
import { risks, supplierExposure, suppliers } from '#/db/schema/risks';
import { authProcedure } from '#/trpc/init';

type InnerRisk = Pick<
  typeof supplierExposure.$inferSelect,
  'id' | 'exposure'
> & {
  risk: Pick<typeof risks.$inferSelect, 'id' | 'riskCategory' | 'riskLevel'>;
};

export const readSupplier = authProcedure
  .input(z.string().uuid())
  .query(async (opts) => {
    const supplierId = opts.input;

    const res = await db
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
      .where(eq(suppliers.id, supplierId))
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
      .limit(1)
      .groupBy(suppliers.id);

    if (!res || res.length === 0)
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'No such supplier exist'
      });
    return res[0];
  });
