import { Lock, Unlock } from "lucide-react";
import { cn } from "~/lib/utils";

interface LockIconProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: "emerald" | "blue" | "purple" | "gray" | "red";
  isLocked?: boolean;
  animated?: boolean;
}

export function LockIcon({
  className,
  size = "md",
  color = "emerald",
  isLocked = true,
  animated = false,
}: LockIconProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const colorClasses = {
    emerald: "text-emerald-400",
    blue: "text-blue-400",
    purple: "text-purple-400",
    gray: "text-gray-400",
    red: "text-red-400",
  };

  const IconComponent = isLocked ? Lock : Unlock;

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        animated && "transition-all duration-300",
        className,
      )}
    >
      <IconComponent className={cn(sizeClasses[size], colorClasses[color])} />
    </div>
  );
}
