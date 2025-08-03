import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";

export interface CopyButtonProps {
  text: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showText?: boolean;
  successMessage?: string;
  errorMessage?: string;
  disabled?: boolean;
}

export function CopyButton({
  text,
  variant = "outline",
  size = "sm",
  className,
  showText = true,
  successMessage = "Copied to clipboard!",
  errorMessage = "Failed to copy to clipboard",
  disabled = false,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    if (disabled) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(successMessage);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(errorMessage);
    }
  };

  return (
    <Button
      onClick={copyToClipboard}
      variant={variant}
      size={size}
      className={className}
      disabled={disabled}
    >
      {copied ? (
        <Check className={showText ? "mr-2 h-4 w-4" : "h-4 w-4"} />
      ) : (
        <Copy className={showText ? "mr-2 h-4 w-4" : "h-4 w-4"} />
      )}
      {showText && (copied ? "Copied" : "Copy")}
    </Button>
  );
}
