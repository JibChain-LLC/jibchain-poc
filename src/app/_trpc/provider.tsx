'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { trpc } from './client';

export default function Provider(props: { children: React.ReactNode }) {
  const { children } = props;

  const [queryClient] = useState(() => new QueryClient({}));
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: []
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
