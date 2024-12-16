import { z } from 'zod';
import { MOCK_RISKS } from '#/lib/server/mocks/mocks';
import { authProcedure } from '#/trpc/init';

const getRisksInput = z
  .object({
    startDate: z.number(),
    endDate: z.number()
  })
  .refine(({ startDate, endDate }) => {
    return startDate < endDate;
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

    const now = Date.now();
    const from = new Date(startDate ?? now - 86_400_000).getTime();
    const to = new Date(endDate ?? now).getTime();

    const res = MOCK_RISKS.filter((item) => {
      const time = item.date.getTime();
      return time >= from && time <= to;
    });

    return {
      from,
      to,
      total: res.length,
      data: res
    };
  });
