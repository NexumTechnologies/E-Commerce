"use client";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";
import { notifyError } from "@/lib/notifications";
import { ToastProvider } from "@/components/ui/ToastProvider";
import GlobalApiLoader from "@/components/GlobalApiLoader";

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => {
            notifyError(error);
          },
        }),
        mutationCache: new MutationCache({
          onError: (error) => {
            notifyError(error);
          },
        }),
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <GlobalApiLoader />
        {children}
      </ToastProvider>
    </QueryClientProvider>
  );
}
