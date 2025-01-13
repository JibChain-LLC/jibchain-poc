import { TRPCError } from '@trpc/server';
import { sql } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '#/db';
import { suppliers } from '#/db/schema/risks';
import { authProcedure } from '#/trpc/init';

export const readRisk = authProcedure
  .input(z.string().uuid())
  .query(async (opts) => {
    const riskId = opts.input;

    const res = await db.query.risks
      .findFirst({
        where: (r, { eq }) => eq(r.id, riskId),

        with: {
          scenarios: true,
          impactedSuppliers: {
            with: {
              supplier: {
                columns: { name: true, regions: true, category: true },
                extras: {
                  x: sql<number>`ST_X(${suppliers.coord})`.as('x'),
                  y: sql<number>`ST_Y(${suppliers.coord})`.as('y')
                }
              }
            }
          }
        }
      })
      .catch((e) => console.error(e));

    if (!res)
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'No such risk item exist'
      });

    return res;
  });
