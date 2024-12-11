import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { MOCK_SUPPLIERS } from '#/lib/server/mocks/mocks';
import { authProcedure } from '#/trpc/init';

export const readSupplier = authProcedure
  .input(z.string().uuid())
  .query((opts) => {
    const supplierId = opts.input;

    const r = MOCK_SUPPLIERS.find((i) => i.id === supplierId);
    if (!r)
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'No such supplier exist'
      });
    return r;
  });
