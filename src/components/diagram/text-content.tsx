import { cn } from "~/lib/utils";
import { LockIcon } from "./lock-icon";

interface TextContentProps {
  className?: string;
  content: string;
  encrypted?: boolean;
  animated?: boolean;
  maxLines?: number;
}

export function TextContent({
  className,
  content,
  encrypted = false,
  animated = false,
  maxLines = 3,
}: TextContentProps) {
  const displayContent = encrypted ? content.replace(/\w/g, "*") : content;
  const lines = displayContent.split("\n").slice(0, maxLines);

  return (
    <div
      className={cn(
        "rounded-lg border border-gray-700 bg-gray-800/50 p-3 font-mono text-sm",
        encrypted ? "text-emerald-400" : "text-white",
        animated && "animate-in slide-in-from-bottom-2 duration-300",
        className,
      )}
    >
      {lines.map((line, index) => (
        <div key={index} className="leading-relaxed">
          {line || "\u00A0"}
        </div>
      ))}
      {encrypted && (
        <div className="mt-2 flex items-end gap-1 border-t border-gray-700 pt-2">
          <span className="text-xs text-emerald-400/60">
            <LockIcon />
          </span>
        </div>
      )}
    </div>
  );
}
