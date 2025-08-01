"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { TRPCReactProvider } from "~/trpc/react";
import { queryClient } from "~/lib/query-client";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <TRPCReactProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </TRPCReactProvider>
  );
}
