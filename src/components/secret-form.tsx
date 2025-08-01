"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { Check, Copy, Lock, RotateCcw, Info } from "lucide-react";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

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
  const [copied, setCopied] = useState(false);
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

      toast.success("Secret created successfully!");
    } catch (error) {
      console.error("Failed to create secret:", error);
      toast.error("Failed to create secret. Please try again.");
    }
  };

  const copyToClipboard = async () => {
    if (result) {
      try {
        await navigator.clipboard.writeText(result.url);
        setCopied(true);
        toast.success("URL copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error("Failed to copy to clipboard:", error);
        toast.error("Failed to copy to clipboard");
      }
    }
  };

  const resetForm = () => {
    setResult(null);
    setText("");
    setCopied(false);
  };

  if (result) {
    return (
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
            <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-green-600 dark:text-green-400">
            Secret Created Successfully!
          </CardTitle>
          <CardDescription>
            Share this URL with your recipient. The secret can only be viewed
            once.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Secret URL</Label>
            <div className="bg-muted mt-2 rounded-md border p-3">
              <code className="font-mono text-sm break-all">{result.url}</code>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button onClick={copyToClipboard} className="flex-1" size="lg">
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy URL
                </>
              )}
            </Button>
            <Button
              onClick={resetForm}
              variant="outline"
              size="lg"
              className="flex-1"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Create Another
            </Button>
          </div>

          <Separator />

          <div className="text-muted-foreground flex items-center justify-center gap-2 text-sm">
            <Lock className="h-4 w-4" />
            <span>End-to-end encrypted • Zero-knowledge architecture</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <TooltipProvider>
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Create Secret
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-5 w-5 text-muted-foreground">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-sm">
                  Your secret is encrypted in your browser using AES-256-GCM before being sent to our servers. 
                  Only you and the recipient can decrypt it.
                </p>
              </TooltipContent>
            </Tooltip>
          </CardTitle>
          <CardDescription>
            Share sensitive information securely. One-time access only.
          </CardDescription>
        </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="secret">Your Secret Message</Label>
            <Textarea
              id="secret"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your secret message, password, or sensitive information..."
              className="min-h-[120px] resize-none"
              disabled={createSecret.isPending}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              <Lock className="mr-1 h-3 w-3" />
              AES-256-GCM Encrypted
            </Badge>
            <Badge variant="secondary" className="text-xs">
              One-time access
            </Badge>
          </div>

          <Button
            type="submit"
            disabled={!text.trim() || createSecret.isPending}
            className="w-full"
            size="lg"
          >
            {createSecret.isPending ? (
              <>
                <div className="border-background mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                Creating Secret...
              </>
            ) : (
              <>
                <Lock className="mr-2 h-4 w-4" />
                Create Secret
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
    </TooltipProvider>
  );
}
