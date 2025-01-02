import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { db } from '#/db';
import { authProcedure } from '#/trpc/init';

export const readRisk = authProcedure
  .input(z.string().uuid())
  .query(async (opts) => {
    const riskId = opts.input;

    const res = await db.query.risks.findFirst({
      where: (r, { eq }) => eq(r.id, riskId),
      with: { scenarios: true }
    });

    if (!res)
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'No such risk item exist'
      });

    return res;
  });
