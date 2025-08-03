import type { ReactNode } from "react";
import { forwardRef } from "react";
import { cn } from "~/lib/utils";
import { Textarea } from "~/components/ui/textarea";

export interface InteractiveTextareaProps {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  readOnly?: boolean;
  disabled?: boolean;
  className?: string;
  backdropClassName?: string;
  // Overlay states
  hasBackdrop?: boolean;
  // backdropVariant?: "emerald" | "blue";
  // overlayPosition?: "center" | "full";
  children?: ReactNode;

  // Additional button in corner
  cornerButton?: ReactNode;
}

// const backdropVariants = {
//   emerald: "outline-emerald-500/30",
//   blue: "outline-blue-500/30",
// };

// const textareaVariants = {
//   emerald: "focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20",
//   blue: "border-blue-500/30",
// };

export const InteractiveTextarea = forwardRef<
  HTMLTextAreaElement,
  InteractiveTextareaProps
>(function InteractiveTextarea(
  {
    value,
    onChange,
    onKeyDown,
    placeholder,
    rows = 4,
    readOnly = false,
    disabled = false,
    className,
    backdropClassName,
    hasBackdrop = false,
    // backdropVariant = "emerald",
    // overlayPosition = "full",
    cornerButton,
    children,
  },
  ref,
) {
  return (
    <div className="relative mb-4">
      <div className="relative">
        <Textarea
          ref={ref}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          rows={rows}
          readOnly={readOnly}
          disabled={disabled}
          className={cn(
            "border-border bg-background text-foreground min-h-[120px] text-lg transition-all duration-300",
            readOnly ? "resize-none" : "resize-y",
            className,
          )}
        />

        {/* Backdrop Blur Layer */}
        {hasBackdrop && (
          <div
            className={cn(
              "outline-border pointer-events-none absolute inset-0 box-content rounded-md outline backdrop-blur-sm transition-all duration-300",
              backdropClassName,
            )}
          />
        )}

        {/* Overlay Content */}
        {children && (
          <div
            className={cn(
              "absolute inset-0 rounded-md",
              "flex items-center justify-center",
            )}
          >
            {children}
          </div>
        )}

        {/* Corner Button */}
        {cornerButton && (
          <div className="absolute right-4 bottom-4">{cornerButton}</div>
        )}
      </div>
    </div>
  );
});
