"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { generateKeyAndEncrypt } from "~/lib/crypto";
import { useCreateSecret } from "~/hooks/use-secret";
import { api } from "~/trpc/react";

interface SecretResult {
  id: string;
  key: string;
  url: string;
}

export function SecretForm() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<SecretResult | null>(null);
  const queryClient = useQueryClient();

  const createSecret = useCreateSecret();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || createSecret.isPending) return;

    try {
      // Generate key and encrypt the text
      const { ciphertext, key } = await generateKeyAndEncrypt(text);

      // Send only the ciphertext as payload
      const data = await createSecret.mutateAsync({ payload: ciphertext });

      // Create URL with key in fragment
      const url = `${window.location.origin}/${data.id}#${key}`;

      const secretResult = {
        id: data.id,
        key,
        url,
      };

      setResult(secretResult);

      // Pre-populate the cache so owner can preview without hitting server
      const queryKey = getQueryKey(api.secrets.getSecret, { id: data.id });

      // Cache the ciphertext in TanStack Query with infinite settings
      queryClient.setQueryData<string>(queryKey, ciphertext, {
        updatedAt: Date.now(),
      });

      // Set query defaults to prevent any refetching
      queryClient.setQueryDefaults(queryKey, {
        staleTime: Infinity,
        gcTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchInterval: false,
        refetchIntervalInBackground: false,
      });
    } catch (error) {
      console.error("Failed to create secret:", error);
    }
  };

  const copyToClipboard = async () => {
    if (result) {
      await navigator.clipboard.writeText(result.url);
      // You could add a toast notification here
    }
  };

  if (result) {
    return (
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="mb-4 text-center">
          <h2 className="mb-2 text-xl font-semibold text-green-600">
            Secret Created!
          </h2>
          <p className="text-sm text-gray-600">
            Share this URL with your recipient. It can only be viewed once.
          </p>
        </div>

        <div className="mb-4 rounded-md bg-gray-50 p-3">
          <p className="font-mono text-sm break-all">{result.url}</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={copyToClipboard}
            className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            Copy to Clipboard
          </button>
          <button
            onClick={() => {
              setResult(null);
              setText("");
            }}
            className="flex-1 rounded-md bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600"
          >
            Create Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="secret" className="mb-2 block text-sm font-medium">
            Your Secret
          </label>
          <textarea
            id="secret"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your secret message..."
            className="h-32 w-full resize-none rounded-md border p-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            disabled={createSecret.isPending}
            required
          />
        </div>

        <button
          type="submit"
          disabled={!text.trim() || createSecret.isPending}
          className="w-full rounded-md bg-blue-600 px-4 py-3 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {createSecret.isPending ? "Creating Secret..." : "Create Secret"}
        </button>
      </form>
    </div>
  );
}
