import { cn } from "~/lib/utils";

interface IdBadgeProps {
  className?: string;
  id: string;
  color?: "emerald" | "blue" | "purple" | "gray";
  animated?: boolean;
}

export function IdBadge({
  className,
  id,
  color = "blue",
  animated = false,
}: IdBadgeProps) {
  const colorClasses = {
    emerald: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
    blue: "bg-blue-500/10 border-blue-500/30 text-blue-400",
    purple: "bg-purple-500/10 border-purple-500/30 text-purple-400",
    gray: "bg-gray-500/10 border-gray-500/30 text-gray-400",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-sm",
        colorClasses[color],
        animated && "animate-in fade-in-0 duration-300",
        className,
      )}
    >
      <span className="text-xs opacity-60">ID:</span>
      <span>{id}</span>
    </div>
  );
}
