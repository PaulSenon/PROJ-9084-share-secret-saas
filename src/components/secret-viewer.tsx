"use client";

import { useState, useEffect } from "react";
import { Download, Trash, Unlock, Eye, EyeOff, Loader2, Shield, Cloud, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "~/lib/utils";

import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";

import { importKeyAndDecrypt } from "~/lib/crypto";
import { useSecret } from "~/hooks/use-secret";

interface ProcessStep {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const decryptionSteps: ProcessStep[] = [
  { id: "download", label: "Downloading payload", icon: <Download className="w-4 h-4" /> },
  { id: "delete", label: "Deleting from server", icon: <Trash className="w-4 h-4" /> },
  { id: "save", label: "Storing locally", icon: <Shield className="w-4 h-4" /> },
  { id: "decrypt", label: "Decrypting message", icon: <Unlock className="w-4 h-4" /> },
];

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
  const [currentStep, setCurrentStep] = useState(-1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [copied, setCopied] = useState(false);
  const [badgesLoaded, setBadgesLoaded] = useState(false);
  
  const { data: ciphertext, error, isCached } = useSecret(secretId);

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
        // Simulate badge loading
        await new Promise((resolve) => setTimeout(resolve, 500));
        setBadgesLoaded(true);

        await new Promise((resolve) => setTimeout(resolve, 300));
        setCurrentStep(0);

        for (let i = 0; i < decryptionSteps.length; i++) {
          setCurrentStep(i);
          
          if (i === decryptionSteps.length - 1) {
            // Last step: decrypt
            const decryptedText = await importKeyAndDecrypt(ciphertext, encryptionKey);
            setState({ type: "ready", text: decryptedText, isRevealed: false });
            await new Promise((resolve) => setTimeout(resolve, 800));
          } else {
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }

          setCompletedSteps((prev) => new Set([...prev, i]));
          await new Promise((resolve) => setTimeout(resolve, 300));
        }

        setCurrentStep(-1);
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
    }
  }, [error]);

  const revealText = () => {
    if (state.type === "ready") {
      setState({ ...state, isRevealed: true });
    }
  };

  const hideText = () => {
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

  if (state.type === "error") {
    return (
      <>
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-8">
            <Unlock className="w-4 h-4 text-red-400" />
            <span className="text-red-400 text-sm font-medium">Access Error</span>
          </div>
          <h1 className="text-4xl font-light text-foreground mb-4">Secret Not Found</h1>
          <p className="text-muted-foreground text-lg font-light">This secret may have already been accessed or deleted.</p>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8">
          <Unlock className="w-4 h-4 text-blue-400" />
          <span className="text-blue-400 text-sm font-medium">Secure Message Access</span>
        </div>
        <h1 className="text-4xl font-light text-foreground mb-4">Encrypted Message</h1>
        <p className="text-muted-foreground text-lg font-light">Decrypting your secure content locally.</p>
      </div>

      {/* Source Badges */}
      <div className="flex justify-start gap-3 mb-6">
        {!badgesLoaded ? (
          <>
            <Badge variant="outline" className="bg-background/50">
              <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />
              Loading...
            </Badge>
            <Badge variant="outline" className="bg-background/50">
              <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />
              Verifying...
            </Badge>
          </>
        ) : (
          <>
            <Badge variant="outline" className="bg-background/50">
              {isCached ? (
                <>
                  <Shield className="w-3 h-3 mr-1.5" />
                  Stored Locally
                </>
              ) : (
                <>
                  <Cloud className="w-3 h-3 mr-1.5" />
                  From Server
                </>
              )}
            </Badge>
            <Badge className="bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-emerald-500/20 shadow-sm">
              <Shield className="w-3 h-3 mr-1.5" />
              Eyes Only
            </Badge>
          </>
        )}
      </div>

      {/* Message Display */}
      <div className="relative mb-6">
        <div
          className={cn(
            "min-h-[120px] bg-card border rounded-lg p-6 transition-all duration-300 cursor-pointer",
            state.type === "ready" && !state.isRevealed && "hover:border-gray-700",
            state.type === "ready" && state.isRevealed && "border-blue-500/30",
          )}
          onClick={state.type === "ready" && !state.isRevealed ? revealText : undefined}
        >
          {/* Loading/Processing Overlay */}
          {state.type === "loading" && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm rounded-lg">
              <div className="flex flex-col items-center gap-4">
                {decryptionSteps.map((step, index) => (
                  <div
                    key={step.id}
                    className={cn(
                      "flex items-center gap-3 transition-all duration-500 transform",
                      index === currentStep && "scale-100 opacity-100",
                      index < currentStep && completedSteps.has(index) && "scale-75 opacity-60 -translate-y-2",
                      index > currentStep && "scale-90 opacity-30 translate-y-2",
                    )}
                  >
                    <div className="relative">
                      {index === currentStep ? (
                        <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                      ) : completedSteps.has(index) ? (
                        <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center animate-in zoom-in-50 duration-300">
                          <Check className="w-3 h-3 text-foreground" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-600" />
                      )}
                    </div>
                    <div
                      className={cn(
                        "text-sm font-medium transition-colors duration-300",
                        index === currentStep && "text-blue-400",
                        completedSteps.has(index) && "text-blue-300",
                        index > currentStep && "text-muted-foreground/50",
                      )}
                    >
                      {step.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Decrypted Content */}
          {state.type === "ready" && (
            <div className="relative">
              <div
                className={cn(
                  "text-foreground text-lg leading-relaxed transition-all duration-500",
                  !state.isRevealed && "filter blur-sm select-none",
                )}
              >
                {state.text}
              </div>

              {/* Reveal Overlay */}
              {!state.isRevealed && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-background/70 border rounded-lg px-4 py-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm font-medium">Click to reveal message</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {state.isRevealed && (
                <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                  <Button
                    onClick={copyToClipboard}
                    size="sm"
                    variant="outline"
                  >
                    {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    {copied ? "Copied" : "Copy"}
                  </Button>
                  <Button
                    onClick={hideText}
                    size="sm"
                    variant="ghost"
                  >
                    <EyeOff className="w-4 h-4 mr-2" />
                    Hide
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Privacy Notice */}
      {state.type === "ready" && (
        <div className="flex items-center justify-between text-sm text-muted-foreground animate-in slide-in-from-bottom-4 duration-500">
          <span>You&apos;re reading a copy stored securely locally</span>
        </div>
      )}
    </>
  );
}
