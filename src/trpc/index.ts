import { inferRouterInputs } from '@trpc/server';
import { createTRPCRouter } from './init';
import * as authRoutes from './routes/auth';
import dashboardRoutes from './routes/dash';
import orgRoutes from './routes/org';
import * as userRoutes from './routes/user';

export const appRouter = createTRPCRouter({
  auth: authRoutes,
  dash: dashboardRoutes,
  org: orgRoutes,
  user: userRoutes
});

export type AppRouter = typeof appRouter;
export type RouterInputs = inferRouterInputs<AppRouter>;
