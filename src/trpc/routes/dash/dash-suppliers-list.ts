import { MOCK_SUPPLIERS } from '#/lib/server/mocks/mocks';
import { authProcedure } from '#/trpc/init';

export const getSuppliers = authProcedure.query(() => {
  return MOCK_SUPPLIERS;
});
