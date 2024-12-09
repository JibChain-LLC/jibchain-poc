'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createTRPCClient,
  httpBatchLink,
  httpLink,
  splitLink,
  TRPCLink
} from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import { useState } from 'react';
import { AppRouter } from '..';
import { makeQueryClient } from './make-query-client';

const links: TRPCLink<AppRouter>[] = [
  splitLink({
    condition(opts) {
      return !opts.path.startsWith('auth');
    },
    true: httpBatchLink({
      url: getUrl()
    }),
    false: httpLink({
      url: getUrl()
    })
  })
];

export const trpc = createTRPCReact<AppRouter>();
export const vanillaTRPC = createTRPCClient<AppRouter>({
  links
});

let clientQueryClientSingleton: QueryClient;
function getQueryClient() {
  if (typeof window === 'undefined') {
    return makeQueryClient();
  }

  return (clientQueryClientSingleton ??= makeQueryClient());
}

function getUrl() {
  const base = (() => {
    if (typeof window !== 'undefined') return '';
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return 'http://localhost:3000';
  })();
  return `${base}/api/trpc`;
}

export default function Provider(props: { children: React.ReactNode }) {
  const { children } = props;

  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
