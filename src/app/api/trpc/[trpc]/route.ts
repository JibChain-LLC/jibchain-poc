import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '#/trpc';
import { createTRPCContext } from '#/trpc/init';

const handler = (req: Request) => {
  const res = fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: createTRPCContext
  });

  return res;
};

export { handler as GET, handler as POST };
