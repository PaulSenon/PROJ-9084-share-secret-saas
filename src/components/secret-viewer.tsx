"use client";

import { useState, useEffect } from "react";
import { AlertCircle, Check, Copy, Eye, EyeOff, Lock, Loader2, Shield, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";

import { importKeyAndDecrypt } from "~/lib/crypto";
import { useSecret } from "~/hooks/use-secret";

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
    message: "Loading secret...",
  });
  const [encryptionKey, setEncryptionKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  const { data: ciphertext, isLoading, error, isCached } = useSecret(secretId);

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

  // Handle secret decryption when we have both ciphertext and key
  useEffect(() => {
    const decryptSecret = async () => {
      if (!ciphertext || !encryptionKey) return;

      try {
        setState({ type: "loading", message: "Decrypting secret locally..." });
        
        // Decrypt using the key from URL fragment and ciphertext from cache/server
        const decryptedText = await importKeyAndDecrypt(ciphertext, encryptionKey);
        
        setState({ type: "ready", text: decryptedText, isRevealed: false });
      } catch (error) {
        console.error("Decryption failed:", error);
        setState({
          type: "error",
          message: "Failed to decrypt secret. Invalid key or corrupted data.",
        });
      }
    };

    void decryptSecret();
  }, [ciphertext, encryptionKey]);

  // Handle loading and error states from the hook
  useEffect(() => {
    if (error) {
      setState({
        type: "error",
        message: "Secret not found or already deleted",
      });
    } else if (isLoading && !isCached) {
      setState({
        type: "loading",
        message: isCached ? "Loading from cache..." : "Fetching encrypted payload and deleting from server...",
      });
    }
  }, [error, isLoading, isCached]);

  const revealSecret = () => {
    if (state.type === "ready") {
      setState({ ...state, isRevealed: true });
    }
  };

  const hideSecret = () => {
    if (state.type === "ready") {
      setState({ ...state, isRevealed: false });
    }
  };

  const copyToClipboard = async () => {
    if (state.type === "ready") {
      try {
        await navigator.clipboard.writeText(state.text);
        setCopied(true);
        toast.success("Secret copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
      } catch {
        toast.error("Failed to copy to clipboard");
      }
    }
  };

  if (state.type === "loading") {
    return (
      <Card className="w-full max-w-2xl">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Loader2 className="mb-4 h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">{state.message}</p>
        </CardContent>
      </Card>
    );
  }

  if (state.type === "error") {
    return (
      <Card className="w-full max-w-2xl border-destructive">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-destructive">Access Error</CardTitle>
          <CardDescription>{state.message}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-muted p-4">
            <div className="flex items-start gap-3">
              <X className="mt-0.5 h-4 w-4 text-destructive flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Possible reasons:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Secret has already been accessed and deleted</li>
                  <li>• Invalid or corrupted URL</li>
                  <li>• Secret has expired or was manually deleted</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
          <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
        </div>
        <CardTitle className="text-green-600 dark:text-green-400">
          Secret Retrieved Successfully
        </CardTitle>
        <CardDescription>
          {isCached 
            ? "This secret was loaded from your local cache and decrypted in your browser."
            : "This secret has been retrieved from the server, deleted, and decrypted locally in your browser."
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Badge variant="secondary" className="text-xs">
            <Lock className="mr-1 h-3 w-3" />
            Client-side decrypted
          </Badge>
          {isCached ? (
            <Badge variant="outline" className="text-xs">
              Cached locally
            </Badge>
          ) : (
            <Badge variant="destructive" className="text-xs">
              Deleted from server
            </Badge>
          )}
        </div>

        <Separator />

        <div>
          <div className="rounded-lg border bg-card">
            {state.isRevealed ? (
              <div className="p-4">
                <pre className="whitespace-pre-wrap break-words text-sm font-mono">
                  {state.text}
                </pre>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <EyeOff className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="mb-4 text-sm text-muted-foreground text-center">
                  Secret is hidden for privacy. Click below to reveal the content.
                </p>
                <Button onClick={revealSecret} size="lg">
                  <Eye className="mr-2 h-4 w-4" />
                  Reveal Secret
                </Button>
              </div>
            )}
          </div>
        </div>

        {state.isRevealed && (
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button onClick={copyToClipboard} variant="default" size="lg" className="flex-1">
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Secret
                </>
              )}
            </Button>
            <Button onClick={hideSecret} variant="outline" size="lg" className="flex-1">
              <EyeOff className="mr-2 h-4 w-4" />
              Hide Secret
            </Button>
          </div>
        )}

        <Separator />

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Lock className="h-3 w-3" />
          <span>This secret has been permanently deleted from our servers</span>
        </div>
      </CardContent>
    </Card>
  );
}
