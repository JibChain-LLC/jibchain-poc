import { z } from 'zod';
import { MOCK_RISKS } from '#/lib/server/mocks/mocks';
import { RiskLevelEnum } from '#/lib/server/mocks/types';
import { authProcedure } from '#/trpc/init';

const getRisksInput = z
  .object({
    startDate: z.date(),
    endDate: z.date()
  })
  .refine(({ startDate, endDate }) => {
    return startDate.getTime() < endDate.getTime();
  }, 'from must be less than to date')
  .or(
    z.object({
      startDate: z.undefined(),
      endDate: z.undefined()
    })
  );

export const getRisks = authProcedure
  .input(getRisksInput.optional())
  .query((opts) => {
    const { startDate, endDate } = opts.input || {};

    const from = new Date(startDate ?? Date.now() - 86_400_000).getTime();
    const to = new Date(endDate ?? Date.now()).getTime();

    const res = MOCK_RISKS.filter((item) => {
      const time = item.date.getTime();
      return time >= from && time <= to;
    }).reduce(
      (acc, curr) => {
        const { level, id, category } = curr;
        acc[level].push({ id, category });
        return acc;
      },
      { hi: [], med: [], low: [] } as Record<
        RiskLevelEnum,
        { id: string; category: string }[]
      >
    );

    return {
      from,
      to,
      data: res
    };
  });
