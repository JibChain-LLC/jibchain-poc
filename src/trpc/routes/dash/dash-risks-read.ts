import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { MOCK_RISKS } from '#/lib/server/mocks/mocks';
import { authProcedure } from '#/trpc/init';

export const readRisk = authProcedure.input(z.string().uuid()).query((opts) => {
  const riskId = opts.input;

  const r = MOCK_RISKS.find((i) => i.id === riskId);
  if (!r)
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'No such risk item exist'
    });
  return r;
});
