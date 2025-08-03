"use client";

import { useQueryClient } from "@tanstack/react-query";
import { api } from "~/trpc/react";
import { getQueryKey } from "@trpc/react-query";

/**
 * Hook for creating secrets and pre-caching them
 */
export function useCreateSecret() {
  const queryClient = useQueryClient();
  const mutation = api.secrets.setSecret.useMutation();

  const createSecretAndCache = async (payload: string): Promise<{ id: string; ciphertext: string }> => {
    // 1. Create the secret on server
    const { id } = await mutation.mutateAsync({ payload });
    
    // 2. Pre-cache the secret so creator can preview without burning it
    const queryKey = getQueryKey(api.secrets.getSecret, { id });
    
    queryClient.setQueryData<string>(queryKey, payload);
    queryClient.setQueryDefaults(queryKey, {
      staleTime: Infinity,
      gcTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
      refetchIntervalInBackground: false,
    });

    return { id, ciphertext: payload };
  };

  return {
    createSecretAndCache,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
}

/**
 * Hook for fetching secrets (imperative - you control when it runs)
 */
export function useGetSecret() {
  const queryClient = useQueryClient();
  const utils = api.useUtils();

  const getSecret = async (secretId: string): Promise<string> => {
    const queryKey = getQueryKey(api.secrets.getSecret, { id: secretId });

    // First check cache
    const cachedData = queryClient.getQueryData<string>(queryKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      // Fetch from server (this deletes it from server)
      const result = await utils.secrets.getSecret.fetch({ id: secretId });

      if (!result) {
        throw new Error("Secret not found or already consumed");
      }

      // Cache it infinitely
      queryClient.setQueryData<string>(queryKey, result);
      queryClient.setQueryDefaults(queryKey, {
        staleTime: Infinity,
        gcTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchInterval: false,
        refetchIntervalInBackground: false,
      });

      return result;
    } catch (error) {
      console.error("Failed to fetch secret:", error);
      throw error;
    }
  };

  const isSecretCached = (secretId: string): boolean => {
    const queryKey = getQueryKey(api.secrets.getSecret, { id: secretId });
    return Boolean(queryClient.getQueryData<string>(queryKey));
  };

  return {
    getSecret,
    isSecretCached,
  };
}