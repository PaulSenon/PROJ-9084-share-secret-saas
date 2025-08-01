import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import SuperJSON from "superjson";

// localStorage adapter for async storage persister
const localStorageAdapter = {
  getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key: string, value: string) => Promise.resolve(localStorage.setItem(key, value)),
  removeItem: (key: string) => Promise.resolve(localStorage.removeItem(key)),
};

export const createQueryClient = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 30 * 1000,
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
        retry: (failureCount, error) => {
          // Don't retry secret fetches (they're one-time only)
          if (error?.message?.includes('Secret not found')) {
            return false;
          }
          return failureCount < 3;
        },
      },
      dehydrate: {
        serializeData: SuperJSON.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
      hydrate: {
        deserializeData: SuperJSON.deserialize,
      },
    },
  });

  // Add persistence ONLY on client-side (server ignores this)
  if (typeof window !== "undefined") {
    const persister = createAsyncStoragePersister({
      storage: localStorageAdapter,
      key: "SECRET_SHARE_CACHE",
      throttleTime: 100,
    });

    void persistQueryClient({
      queryClient,
      persister,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days for secrets
    });
  }

  return queryClient;
};

// Singleton for client-side
let clientQueryClientSingleton: QueryClient | undefined = undefined;

export const getQueryClient = () => {
  if (typeof window === "undefined") {
    // Server: always create new (no singleton needed)
    return createQueryClient();
  }
  // Browser: use singleton with persistence
  clientQueryClientSingleton ??= createQueryClient();
  return clientQueryClientSingleton;
};
