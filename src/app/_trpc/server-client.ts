import { cache } from 'react';
import { appRouter } from '#/trpc';

export const getQueryClient = cache();
const caller = createCall;
