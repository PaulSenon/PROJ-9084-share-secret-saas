import { QueryClient } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

// Create QueryClient with long cache time for secret caching
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, // Never consider cached secrets stale
      gcTime: Infinity, // Never garbage collect (was cacheTime in v4)
      retry: false, // Don't retry secret fetches (they're one-time only)
    },
  },
});

// Create localStorage persister for secret caching
if (typeof window !== "undefined") {
  const localStoragePersister = createSyncStoragePersister({
    storage: window.localStorage,
    key: "SECRET_CACHE",
    throttleTime: 100, // Fast throttling for immediate secret caching
  });

  // Persist the query client with localStorage
  void persistQueryClient({
    queryClient,
    persister: localStoragePersister,
    maxAge: Infinity, // Never expire cached secrets
  });
}
