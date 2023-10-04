'use client';
import { QueryClientProvider, QueryClient } from 'react-query';
import { PropsWithChildren } from 'react';

function Providers({ children }: PropsWithChildren) {
  const client = new QueryClient();

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export default Providers;
