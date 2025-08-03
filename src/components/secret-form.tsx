"use client";

import { useState, useRef, useEffect } from "react";
import { Check, Copy, Lock, CornerDownLeft } from "lucide-react";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import { StepAnimation, type Step } from "~/components/step-animation";
import { StatusHeader } from "~/components/ui/status-header";
import { InteractiveTextarea } from "~/components/ui/interactive-textarea";

import { generateKeyAndEncrypt } from "~/lib/crypto";
import { useCreateSecret } from "~/hooks/use-secret";
import { cn } from "~/lib/utils";
import Link from "next/link";

const encryptionSteps: Step[] = [
  {
    id: "encrypt",
    label: "Encrypting locally",
    status: "initial",
  },
  {
    id: "upload",
    label: "Sending payload to server",
    status: "initial",
  },
  {
    id: "cache",
    label: "Caching payload locally",
    status: "initial",
  },
  {
    id: "generate",
    label: "Generating secure link",
    status: "initial",
  },
];

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

  const { createSecretAndCache, error: createError } = useCreateSecret();

  // Auto-focus textarea on load
  useEffect(() => {
    if (textareaRef.current && !isProcessing && !isCompleted) {
      textareaRef.current.focus();
    }
  }, [isProcessing, isCompleted]);

  const runEncryption = async () => {
    setIsProcessing(true);

    // Reset all steps to pending
    setCurrentStepIndex(0);
    setSteps(
      encryptionSteps.map((step) => ({
        ...step,
        status: "initial",
      })),
    );

    try {
      // Step 1: Encrypt locally
      setCurrentStepIndex(0);
      setSteps((prev) =>
        prev.map((step, index) =>
          index === 0 ? { ...step, status: "loading" } : step,
        ),
      );
      const { ciphertext, key } = await generateKeyAndEncrypt(text);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSteps((prev) =>
        prev.map((step, index) =>
          index === 0 ? { ...step, status: "success" } : step,
        ),
      );

      // Step 2: Create secret and cache automatically
      setCurrentStepIndex(1);
      setSteps((prev) =>
        prev.map((step, index) =>
          index === 1 ? { ...step, status: "loading" } : step,
        ),
      );
      const { id } = await createSecretAndCache(ciphertext);
      setSteps((prev) =>
        prev.map((step, index) =>
          index === 1 ? { ...step, status: "success" } : step,
        ),
      );

      // Step 3: Cache step (automatic, just show progress)
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

      // Step 4: Generate secure link
      setCurrentStepIndex(3);
      setSteps((prev) =>
        prev.map((step, index) =>
          index === 3 ? { ...step, status: "loading" } : step,
        ),
      );
      const url = `${window.location.origin}/${id}#${key}`;
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSteps((prev) =>
        prev.map((step, index) =>
          index === 3 ? { ...step, status: "success" } : step,
        ),
      );

      setIsProcessing(false);
      setIsCompleted(true);

      // Auto-copy link to clipboard
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
      } catch {
        // Silent fail if clipboard not available
      }

      return {
        id,
        key,
        url,
      };
    } catch (error) {
      setIsProcessing(false);
      throw error;
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!text.trim() || isProcessing) return;

    try {
      const secretResult = await runEncryption();
      setGeneratedLink(secretResult.url);
    } catch (error) {
      console.error("Failed to create secret:", error);
      toast.error(
        createError?.message ?? "Failed to create secret. Please try again.",
      );
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
      <div className="mb-8 text-center">
        <div
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-4 py-2",
            "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
          )}
        >
          <Lock className="h-4 w-4" />
          <span className="text-sm font-medium">Zero-Knowledge Encryption</span>
        </div>
      </div>
      <StatusHeader
        title="Share a secret over any chat"
        description="End-to-end client encryption, one-time read, no data retention."
      />

      {/* Textarea Section */}
      <InteractiveTextarea
        ref={textareaRef}
        value={text}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setText(e.target.value)
        }
        onKeyDown={handleKeyPress}
        placeholder="Enter your secret..."
        disabled={isProcessing || isCompleted}
        hasBackdrop={isProcessing || isCompleted}
        cornerButton={
          !isProcessing && !isCompleted ? (
            <Button
              type="submit"
              size="sm"
              onClick={() => void handleSubmit()}
              className="border border-emerald-500/30 bg-emerald-500/20 text-emerald-300 shadow-lg transition-all duration-200 hover:bg-emerald-500/30 hover:text-emerald-200"
              disabled={!text.trim()}
            >
              Encrypt & Share
              <CornerDownLeft className="h-4 w-4" />
            </Button>
          ) : undefined
        }
        backdropClassName={cn(isCompleted && "outline-emerald-500/30")}
        className="focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20"
      >
        {isProcessing ? (
          <StepAnimation
            steps={steps}
            currentStepIndex={currentStepIndex}
            className="h-full w-full"
          />
        ) : isCompleted && !isProcessing && generatedLink ? (
          <div className="flex h-full w-full items-center justify-center p-4">
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
        ) : undefined}
      </InteractiveTextarea>

      {/* Simple Steps */}
      <div className="mt-12 text-center">
        <div className="text-muted-foreground mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-2 text-xs">
          {[
            "Write secret",
            "Press Enter",
            "Encrypt locally",
            "Share link",
            "Auto-delete",
          ].map((step, index, array) => (
            <div key={index} className="flex items-center gap-2">
              <span className="font-medium">{step}</span>
              {index < array.length - 1 && (
                <span className="text-muted-foreground/50">→</span>
              )}
            </div>
          ))}
        </div>
        <div className="text-muted-foreground mx-auto mt-4 flex max-w-2xl flex-wrap items-center justify-center gap-2 text-xs">
          <span className="font-small">
            <Link
              href="/how-it-works"
              className="text-emerald-400 hover:underline"
            >
              Learn more
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}
