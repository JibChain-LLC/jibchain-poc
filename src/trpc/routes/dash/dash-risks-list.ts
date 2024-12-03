import { z } from 'zod';
import { MOCK_RISKS } from '#/lib/server/mocks/mocks';
import { RiskLevelEnum } from '#/lib/server/mocks/type';
import { authProcedure } from '#/trpc/init';

const getRisksInput = z
  .object({
    from: z.date().optional(),
    to: z.date().optional()
  })
  .refine(({ from, to }) => {
    if (from && to) return from.getTime() < to.getTime();
    return true;
  }, 'from must be less than to date');

export const getRisks = authProcedure.input(getRisksInput).query((opts) => {
  const from = new Date(opts.input.from ?? Date.now() - 86_400_000).getTime();
  const to = new Date(opts.input.to ?? Date.now()).getTime();

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
