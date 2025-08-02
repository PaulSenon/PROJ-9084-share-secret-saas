import { cn } from "~/lib/utils";

interface UrlComponentProps {
  className?: string;
  path: string;
  fragment: string;
  animated?: boolean;
  highlightFragment?: boolean;
}

export function UrlComponent({
  className,
  path,
  fragment,
  animated = false,
  highlightFragment = false,
}: UrlComponentProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-gray-700 bg-gray-800/50 p-3 font-mono text-sm",
        animated && "animate-in slide-in-from-bottom-2 duration-300",
        className,
      )}
    >
      <div className="flex items-center">
        <span className="text-gray-400">{path}</span>
        <span
          className={cn(
            "transition-colors duration-300",
            highlightFragment
              ? "rounded bg-emerald-500/10 px-1 text-emerald-400"
              : "text-purple-400",
          )}
        >
          #{fragment}
        </span>
      </div>
      <div className="mt-2 flex items-center gap-2 border-t border-gray-700 pt-2 text-xs">
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-gray-400"></div>
          <span className="text-gray-400">Path</span>
        </div>
        <div className="flex items-center gap-1">
          <div
            className={cn(
              "h-2 w-2 rounded-full",
              highlightFragment ? "bg-emerald-400" : "bg-purple-400",
            )}
          ></div>
          <span
            className={cn(
              highlightFragment ? "text-emerald-400" : "text-purple-400",
            )}
          >
            Fragment (Key)
          </span>
        </div>
      </div>
    </div>
  );
}
