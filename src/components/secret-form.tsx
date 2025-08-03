"use client";

import { useState, useRef, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { Check, Copy, Lock, Send, Link, Shield } from "lucide-react";
import { toast } from "sonner";
import { cn } from "~/lib/utils";

import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import {
  StepAnimation,
  type Step,
  type StepStatus,
} from "~/components/step-animation";

import { generateKeyAndEncrypt } from "~/lib/crypto";
import { useCreateSecret } from "~/hooks/use-secret";
import { api } from "~/trpc/react";

const encryptionSteps: Step[] = [
  {
    id: "encrypt",
    label: "Encrypting locally",
    icon: <Lock className="h-4 w-4" />,
    status: "pending" as StepStatus,
  },
  {
    id: "save",
    label: "Securing payload",
    icon: <Shield className="h-4 w-4" />,
    status: "pending" as StepStatus,
  },
  {
    id: "send",
    label: "Uploading to server",
    icon: <Send className="h-4 w-4" />,
    status: "pending" as StepStatus,
  },
  {
    id: "generate",
    label: "Generating secure link",
    icon: <Link className="h-4 w-4" />,
    status: "pending" as StepStatus,
  },
];

interface SecretResult {
  id: string;
  key: string;
  url: string;
}

export function SecretForm() {
  const [text, setText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [steps, setSteps] = useState<Step[]>(encryptionSteps);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const linkInputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();
  const createSecret = useCreateSecret();

  // Auto-focus textarea on load
  useEffect(() => {
    if (textareaRef.current && !isProcessing && !isCompleted) {
      textareaRef.current.focus();
    }
  }, [isProcessing, isCompleted]);

  const simulateEncryptionSteps = async (
    actualEncryption: () => Promise<SecretResult>,
  ) => {
    setIsProcessing(true);
    setCurrentStepIndex(0);

    // Reset all steps to pending
    setSteps(
      encryptionSteps.map((step) => ({
        ...step,
        status: "pending" as StepStatus,
      })),
    );

    for (let i = 0; i < encryptionSteps.length; i++) {
      setCurrentStepIndex(i);

      // Set current step to loading
      setSteps((prev) =>
        prev.map((step, index) =>
          index === i ? { ...step, status: "loading" as StepStatus } : step,
        ),
      );

      if (i === 0) {
        // Step 1: Encrypting locally - do actual encryption
        await actualEncryption().then((result) => {
          setGeneratedLink(result.url);
        });
        await new Promise((resolve) => setTimeout(resolve, 800));
      } else if (i === encryptionSteps.length - 1) {
        // Last step: Generate link and copy to clipboard
        await new Promise((resolve) => setTimeout(resolve, 600));
      } else {
        // Other steps
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      // Set current step to success
      setSteps((prev) =>
        prev.map((step, index) =>
          index === i ? { ...step, status: "success" as StepStatus } : step,
        ),
      );
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    setIsCompleted(true);
    setIsProcessing(false);
    setCurrentStepIndex(-1);

    // Auto-copy link to clipboard
    try {
      await navigator.clipboard.writeText(generatedLink);
      toast.success("Link copied to clipboard!");
    } catch {
      // Silent fail if clipboard not available
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!text.trim() || isProcessing) return;

    const actualEncryption = async (): Promise<SecretResult> => {
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

      return secretResult;
    };

    try {
      await simulateEncryptionSteps(actualEncryption);
    } catch (error) {
      console.error("Failed to create secret:", error);
      toast.error("Failed to create secret. Please try again.");
      setIsProcessing(false);
      setCurrentStepIndex(-1);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && text.trim() && !isProcessing) {
      e.preventDefault();
      void handleSubmit();
    }
    // Shift+Enter should add new line (default behavior)
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  const selectAllText = () => {
    if (linkInputRef.current) {
      linkInputRef.current.select();
    }
  };

  return (
    <>
      {/* Header */}
      <div className="mb-16 text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
          <Lock className="h-4 w-4 text-emerald-400" />
          <span className="text-sm font-medium text-emerald-400">
            Zero-Knowledge Encryption
          </span>
        </div>
        <h1 className="text-foreground mb-4 text-4xl font-light">
          Share a secret over any chat
        </h1>
        <p className="text-muted-foreground text-lg font-light">
          End-to-end client encryption, one-time read, no data retention.
        </p>
      </div>

      {/* Textarea Section */}
      <div className="relative mb-8">
        <div className="relative">
          <Textarea
            ref={textareaRef}
            value={text}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setText(e.target.value)
            }
            onKeyDown={handleKeyPress}
            placeholder="Enter your secret..."
            rows={4}
            className={cn(
              "border-border bg-background text-foreground placeholder:text-muted-foreground min-h-[120px] resize-y text-lg transition-all duration-300 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20",
              isCompleted && "border-emerald-500/30",
            )}
            disabled={isProcessing || isCompleted}
          />

          {/* Backdrop Blur Layer */}
          {(isProcessing || isCompleted) && (
            <div
              className={cn(
                "bg-background/10 outline-border pointer-events-none absolute inset-0 box-content rounded-md outline backdrop-blur-sm transition-all duration-300",
                isCompleted && "outline-emerald-500/30",
              )}
            />
          )}

          {/* Processing Steps Overlay */}
          {isProcessing && (
            <div className="absolute inset-0 rounded-md">
              <StepAnimation
                steps={steps}
                currentStepIndex={currentStepIndex}
                className="h-full w-full"
              />
            </div>
          )}

          {/* Encrypted State with URL */}
          {isCompleted && !isProcessing && generatedLink && (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="mx-4 flex w-full max-w-full items-center rounded-lg border border-emerald-500/20 bg-emerald-500/10">
                <div className="flex flex-shrink-0 items-center gap-2 px-3 py-2">
                  <Lock className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="border-border bg-background mx-1 my-1 min-w-0 flex-1 rounded-md border">
                  <input
                    ref={linkInputRef}
                    value={generatedLink}
                    readOnly
                    onClick={selectAllText}
                    className="text-foreground hover:bg-muted/50 w-full cursor-pointer truncate border-none bg-transparent px-3 py-2 font-mono text-xs transition-colors outline-none"
                    placeholder="Secure link generated..."
                  />
                </div>
                <button
                  onClick={copyToClipboard}
                  className="border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground mx-1 flex-shrink-0 rounded-md border p-2 transition-all duration-200"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {!isProcessing && !isCompleted && (
          <div className="absolute right-4 bottom-4">
            <Button
              type="submit"
              size="sm"
              onClick={() => void handleSubmit()}
              className="border border-emerald-500/30 bg-emerald-500/20 text-emerald-300 shadow-lg transition-all duration-200 hover:bg-emerald-500/30 hover:text-emerald-200"
              disabled={!text.trim()}
            >
              <Lock className="mr-2 h-4 w-4" />
              Encrypt
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
