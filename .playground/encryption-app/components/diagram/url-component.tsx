import { cn } from "@/lib/utils"

interface UrlComponentProps {
  className?: string
  path: string
  fragment: string
  animated?: boolean
  highlightFragment?: boolean
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
        "bg-gray-800/50 border border-gray-700 rounded-lg p-3 font-mono text-sm",
        animated && "animate-in slide-in-from-bottom-2 duration-300",
        className,
      )}
    >
      <div className="flex items-center">
        <span className="text-gray-400">{path}</span>
        <span
          className={cn(
            "transition-colors duration-300",
            highlightFragment ? "text-emerald-400 bg-emerald-500/10 px-1 rounded" : "text-purple-400",
          )}
        >
          #{fragment}
        </span>
      </div>
      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-700 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          <span className="text-gray-400">Path</span>
        </div>
        <div className="flex items-center gap-1">
          <div className={cn("w-2 h-2 rounded-full", highlightFragment ? "bg-emerald-400" : "bg-purple-400")}></div>
          <span className={cn(highlightFragment ? "text-emerald-400" : "text-purple-400")}>Fragment (Key)</span>
        </div>
      </div>
    </div>
  )
}
