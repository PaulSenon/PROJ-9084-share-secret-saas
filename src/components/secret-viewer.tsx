"use client";

import { useState, useEffect } from "react";
import { api } from "~/trpc/react";
import { importKeyAndDecrypt } from "~/lib/crypto";

interface SecretViewerProps {
  secretId: string;
}

type ViewState =
  | { type: "loading"; message: string }
  | { type: "error"; message: string }
  | { type: "ready"; text: string; isRevealed: boolean };

export function SecretViewer({ secretId }: SecretViewerProps) {
  const [state, setState] = useState<ViewState>({
    type: "loading",
    message: "Fetching encrypted payload and deleting from server...",
  });
  const [encryptionKey, setEncryptionKey] = useState<string | null>(null);

  // Extract key from URL fragment on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hashKey = window.location.hash.substring(1);
      if (hashKey) {
        setEncryptionKey(hashKey);
      } else {
        setState({ type: "error", message: "No encryption key found in URL" });
      }
    }
  }, []);

  // Use tRPC mutation to fetch and delete the secret (one-time operation)
  // tRPC + React Query will handle caching automatically
  const getSecret = api.secrets.getSecret.useMutation({
    onSuccess: async (payload) => {
      if (!payload) {
        setState({
          type: "error",
          message: "Secret not found or already accessed",
        });
        return;
      }

      if (!encryptionKey) {
        setState({ type: "error", message: "No encryption key available" });
        return;
      }

      try {
        setState({ type: "loading", message: "Decrypting secret locally..." });

        // Decrypt using the key from URL fragment and ciphertext from server
        const decryptedText = await importKeyAndDecrypt(payload, encryptionKey);

        setState({ type: "ready", text: decryptedText, isRevealed: false });
      } catch (error) {
        console.error("Decryption failed:", error);
        setState({
          type: "error",
          message: "Failed to decrypt secret. Invalid key or corrupted data.",
        });
      }
    },
    onError: (error) => {
      console.error("Failed to fetch secret:", error);
      setState({
        type: "error",
        message: "Secret not found or already deleted",
      });
    },
  });

  // Fetch the secret when we have the key
  useEffect(() => {
    if (
      encryptionKey &&
      !getSecret.data &&
      !getSecret.isPending &&
      !getSecret.error
    ) {
      getSecret.mutate({ id: secretId });
    }
  }, [encryptionKey, secretId, getSecret]);

  const revealSecret = () => {
    if (state.type === "ready") {
      setState({ ...state, isRevealed: true });
    }
  };

  const copyToClipboard = async () => {
    if (state.type === "ready") {
      await navigator.clipboard.writeText(state.text);
      // You could add a toast notification here
    }
  };

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      {state.type === "loading" && (
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-600">{state.message}</p>
        </div>
      )}

      {state.type === "error" && (
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-5 w-5 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="mb-2 text-xl font-semibold text-red-600">Error</h2>
          <p className="text-gray-600">{state.message}</p>
        </div>
      )}

      {state.type === "ready" && (
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="mb-2 text-xl font-semibold text-green-600">
              Secret Retrieved
            </h2>
            <p className="text-sm text-gray-600">
              This secret has been deleted from the server and decrypted locally
              in your browser.
            </p>
          </div>

          <div className="rounded-md bg-gray-50 p-4">
            {state.isRevealed ? (
              <p className="break-words whitespace-pre-wrap text-gray-900">
                {state.text}
              </p>
            ) : (
              <div className="text-center">
                <div className="mb-4 flex h-20 items-center justify-center rounded bg-gray-300">
                  <p className="text-sm text-gray-600">
                    Secret is hidden - click to reveal
                  </p>
                </div>
                <button
                  onClick={revealSecret}
                  className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                >
                  Reveal Secret
                </button>
              </div>
            )}
          </div>

          {state.isRevealed && (
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="flex-1 rounded-md bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
              >
                Copy to Clipboard
              </button>
              <button
                onClick={() => setState({ ...state, isRevealed: false })}
                className="flex-1 rounded-md bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600"
              >
                Hide Secret
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
