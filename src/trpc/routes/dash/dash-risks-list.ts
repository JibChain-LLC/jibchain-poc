import { z } from 'zod';
import { db } from '#/db';
import { authProcedure } from '#/trpc/init';

const includeSchema = z.object({
  metdata: z.boolean().default(false),
  summary: z.boolean().default(false),
  mitigation: z.boolean().default(false),
  justification: z.boolean().default(false),
  financialImpact: z.boolean().default(false),
  scenarioPlanning: z.boolean().default(false)
});

const dateRangeSchema = z
  .object({
    startDate: z.number(),
    endDate: z.number()
  })
  .refine(({ startDate, endDate }) => {
    return startDate < endDate;
  }, 'from must be less than to date');

const getRisksInput = z.object({
  order: z.enum(['asc', 'desc']).optional().default('desc'),
  range: dateRangeSchema.optional(),
  include: includeSchema.partial().optional().default(includeSchema.parse({})),
  offset: z.number().int().gte(0).optional().default(0),
  limit: z.number().int().gte(1).lte(100).optional().default(100)
});

export const getRisks = authProcedure
  .input(getRisksInput.optional())
  .query(async (opts) => {
    const { range, include, order, offset, limit } = {
      ...getRisksInput.parse({}),
      ...opts.input
    };

    const now = Date.now();
    const from = new Date(range?.startDate ?? now - 86_400_000);
    const to = new Date(range?.endDate ?? now);

    const res = await db.query.risks.findMany({
      limit: limit,
      offset: offset,
      orderBy: (r, s) => [s[order](r.articleDate)],
      ...(range
        ? {
            where: (r, { and, gte, lte }) =>
              and(gte(r.articleDate, from), lte(r.articleDate, to))
          }
        : {}),
      columns: {
        id: true,
        riskCategory: true,
        probability: true,
        riskLevel: true,
        verified: true,
        articleDate: true,
        updated: true,
        title: include.metdata,
        url: include.metdata,
        source: include.metdata,
        summary: include.summary,
        mitigation: include.mitigation,
        justification: include.justification,
        finanicalImpact: include.financialImpact
      },
      ...(include.scenarioPlanning ? { with: { scenarios: true } } : {})
    });

    return {
      from,
      to,
      total: res.length,
      data: res
    };
  });
