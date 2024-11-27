import 'server-only';

import { createHydrationHelpers } from '@trpc/react-query/rsc';
import { cache } from 'react';
import { AppRouter, appRouter } from '..';
import { createTRPCContext } from '../context';
import { createCallerFactory } from '../trpc';
import { makeQueryClient } from './make-query-client';

export const getQueryClient = cache(makeQueryClient);
const caller = createCallerFactory(appRouter)(createTRPCContext);

export const { trpc, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient
);
