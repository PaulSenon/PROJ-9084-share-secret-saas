"use client";

import { useQueryClient } from "@tanstack/react-query";
import { api } from "~/trpc/react";
import { getQueryKey } from "@trpc/react-query";

export interface SecretCacheData {
  id: string;
  ciphertext: string;
  key: string;
  url: string;
  createdAt: number;
}

const SECRET_CACHE_PREFIX = "secret_";

export function useSecret(secretId: string) {
  const queryClient = useQueryClient();
  
  // Create query key for this secret
  const queryKey = getQueryKey(api.secrets.getSecret, { id: secretId });
  
  // Check if we have this secret cached locally first
  const cachedData = queryClient.getQueryData<string>(queryKey);
  
  // Use tRPC query with special caching behavior for secrets
  const query = api.secrets.getSecret.useQuery(
    { id: secretId },
    {
      // For secrets, we want to cache forever once fetched - INFINITE
      staleTime: Infinity,
      gcTime: Infinity,
      // Only fetch if not in cache
      enabled: !cachedData,
      // Don't retry secret fetches (they're one-time on server)
      retry: false,
      // Handle the one-time nature of secrets - never refetch
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
      refetchIntervalInBackground: false,
    }
  );

  // Helper to manually cache a secret (for creators who want to preview)
  const cacheSecret = (data: SecretCacheData) => {
    // Cache the ciphertext payload in TanStack Query with infinite settings
    queryClient.setQueryData<string>(queryKey, data.ciphertext, {
      updatedAt: Date.now(),
    });
    
    // Ensure the query state is set to never refetch
    queryClient.setQueryDefaults(queryKey, {
      staleTime: Infinity,
      gcTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
      refetchIntervalInBackground: false,
    });
    
    // Also store full metadata in localStorage for creator preview
    const cacheKey = `${SECRET_CACHE_PREFIX}${secretId}`;
    localStorage.setItem(cacheKey, JSON.stringify(data));
  };

  // Helper to get full secret metadata from localStorage (for creators)
  const getSecretMetadata = (): SecretCacheData | null => {
    try {
      const cacheKey = `${SECRET_CACHE_PREFIX}${secretId}`;
      const cached = localStorage.getItem(cacheKey);
      return cached ? (JSON.parse(cached) as SecretCacheData) : null;
    } catch {
      return null;
    }
  };

  // Helper to check if we have the secret cached (either in TanStack or localStorage)
  const isCached = () => {
    return Boolean(cachedData ?? getSecretMetadata());
  };

  return {
    data: query.data ?? cachedData,
    isLoading: query.isLoading && !cachedData,
    error: query.error,
    isCached: isCached(),
    cacheSecret,
    getSecretMetadata,
    // Expose query for advanced usage
    query,
  };
}

export function useCreateSecret() {
  const mutation = api.secrets.setSecret.useMutation();
  return mutation;
}