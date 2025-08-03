"use client";

import { useState, useEffect } from "react";
import { Unlock, Eye, EyeOff, Info, AlertCircle } from "lucide-react";
import { cn } from "~/lib/utils";

import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import {
  StepAnimation,
  type Step,
  type StepStatus,
} from "~/components/step-animation";
import { StatusHeader } from "~/components/ui/status-header";
import { InteractiveTextarea } from "~/components/ui/interactive-textarea";
import { CopyButton } from "~/components/ui/copy-button";

import { importKeyAndDecrypt } from "~/lib/crypto";
import { useGetSecret } from "~/hooks/use-secret";

const getDecryptionSteps = (isCached: boolean): Step[] => [
  {
    id: "download",
    label: isCached ? "Loading offline payload" : "Downloading payload",
    status: "pending" as StepStatus,
  },
  {
    id: "delete",
    label: "Deleting from server",
    status: "pending" as StepStatus,
  },
  {
    id: "save",
    label: "Storing locally",
    status: "pending" as StepStatus,
  },
  {
    id: "decrypt",
    label: "Decrypting message",
    status: "pending" as StepStatus,
  },
];

interface SecretViewerProps {
  secretId: string;
}

export function SecretViewer({ secretId }: SecretViewerProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [text, setText] = useState<string>("");
  const [encryptionKey, setEncryptionKey] = useState<string | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [steps, setSteps] = useState<Step[]>([]);

  const { getSecret, isSecretCached } = useGetSecret();

  const runDecryption = async () => {
    if (isProcessing) return;

    setIsProcessing(true);
    setError(null);

    // Check if we have the secret cached to show proper step labels
    const isCached = isSecretCached(secretId);
    const decryptionSteps = getDecryptionSteps(isCached);

    // Reset all steps to pending
    setCurrentStepIndex(0);
    setSteps(
      decryptionSteps.map((step) => ({
        ...step,
        status: "initial",
      })),
    );

    try {
      // Step 1: Get secret (from cache or server)
      setCurrentStepIndex(0);
      setSteps((prev) =>
        prev.map((step, index) =>
          index === 0 ? { ...step, status: "loading" } : step,
        ),
      );
      const ciphertext = await getSecret(secretId);
      setSteps((prev) =>
        prev.map((step, index) =>
          index === 0 ? { ...step, status: "success" } : step,
        ),
      );

      // Step 2: Delete from server (automatic when fetching)
      setCurrentStepIndex(1);
      setSteps((prev) =>
        prev.map((step, index) =>
          index === 1 ? { ...step, status: "loading" } : step,
        ),
      );
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSteps((prev) =>
        prev.map((step, index) =>
          index === 1 ? { ...step, status: "success" } : step,
        ),
      );

      // Step 3: Store locally (automatic via TanStack Query)
      setCurrentStepIndex(2);
      setSteps((prev) =>
        prev.map((step, index) =>
          index === 2 ? { ...step, status: "loading" } : step,
        ),
      );
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSteps((prev) =>
        prev.map((step, index) =>
          index === 2 ? { ...step, status: "success" } : step,
        ),
      );

      // Step 4: Decrypt message
      setCurrentStepIndex(3);
      setSteps((prev) =>
        prev.map((step, index) =>
          index === 3 ? { ...step, status: "loading" } : step,
        ),
      );

      if (!encryptionKey) {
        throw new Error("No encryption key found in URL");
      }

      const decryptedText = await importKeyAndDecrypt(
        ciphertext,
        encryptionKey,
      );
      setText(decryptedText);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSteps((prev) =>
        prev.map((step, index) =>
          index === 3 ? { ...step, status: "success" } : step,
        ),
      );

      setIsProcessing(false);
      setIsCompleted(true);
    } catch (error) {
      console.error("Decryption failed:", error);
      setError(
        error instanceof Error ? error.message : "Failed to decrypt secret",
      );
      setIsProcessing(false);
    }
  };

  // Extract key from URL fragment on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hashKey = window.location.hash.substring(1);
      if (hashKey) {
        setEncryptionKey(hashKey);
      } else {
        setError("No encryption key found in URL");
      }
    }
  }, []);

  // Auto-start decryption when component mounts and we have the key
  useEffect(() => {
    if (encryptionKey && !isProcessing && !isCompleted && !error) {
      void runDecryption();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [encryptionKey]);

  const revealText = () => {
    if (isCompleted) {
      setIsRevealed(true);
    }
  };

  const hideText = () => {
    if (isCompleted) {
      setIsRevealed(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="mb-8 text-center">
        <div
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-4 py-2",
            "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
          )}
        >
          <Unlock className="h-4 w-4" />
          <span className="text-sm font-medium">Access Secret</span>
        </div>
      </div>
      <StatusHeader
        title="Someone shared a secret with you"
        description="End-to-end client encryption, one-time read, no data retention."
      />

      {/* Message Display */}
      <InteractiveTextarea
        value={text}
        readOnly
        className={cn(isProcessing && "text-muted-foreground")}
        hasBackdrop={isProcessing || (isCompleted && !isRevealed)}
      >
        {error ? (
          <div className="flex h-full w-full items-center justify-center p-4">
            <div className="flex items-center gap-3">
              <div className="text-destructive flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Error</span>
                <span className="text-sm font-medium">{error}</span>
              </div>
            </div>
          </div>
        ) : isProcessing ? (
          <StepAnimation
            steps={steps}
            currentStepIndex={currentStepIndex}
            className="h-full w-full"
          />
        ) : isCompleted && !isRevealed ? (
          <div className="flex h-full w-full items-center justify-center p-4">
            <div className="flex items-center gap-3">
              <div
                className="bg-background/70 hover:bg-background/80 cursor-pointer rounded-lg border px-4 py-2 transition-colors"
                onClick={revealText}
              >
                <div className="text-muted-foreground flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span className="text-sm font-medium">Reveal message</span>
                </div>
              </div>
              <CopyButton
                text={text}
                className="bg-background/70 hover:bg-background/80"
                successMessage="Secret copied to clipboard!"
              />
            </div>
          </div>
        ) : undefined}
      </InteractiveTextarea>

      {/* Privacy Notice - Reserved Space */}
      <div className="mb-4 flex min-h-[24px] items-center">
        {isCompleted && (
          <div className="animate-in slide-in-from-bottom-4 flex items-center gap-2 duration-500">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-muted-foreground/80 flex cursor-help items-center gap-1.5 text-xs">
                    <Info className="h-4 w-4" />
                    <span>Stored securely locally, deleted from server</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-sm p-3">
                  <p className="text-xs leading-relaxed">
                    This message has been permanently deleted from our servers
                    and is now securely stored in your browser&apos;s local
                    storage for offline access. This means you (and the secret
                    creator) are guaranteed to be the only people able to access
                    this secret link ever again. If the link is opened by
                    someone else or in another browser, it will show a 404 error
                    page.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>

      {/* Action Buttons - Reserved Space */}
      <div className="mb-6 min-h-[40px]">
        {isCompleted && isRevealed && (
          <div className="animate-in slide-in-from-bottom-4 flex items-center gap-2 duration-500">
            <Button onClick={hideText} size="sm" variant="ghost">
              <EyeOff className="mr-2 h-4 w-4" />
              Hide
            </Button>
            <CopyButton
              text={text}
              successMessage="Secret copied to clipboard!"
            />
          </div>
        )}
      </div>
    </>
  );
}
