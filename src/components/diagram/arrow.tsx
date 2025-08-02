import { ArrowRight, ArrowLeft, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "~/lib/utils";

interface ArrowProps {
  className?: string;
  direction?: "right" | "left" | "up" | "down";
  size?: "sm" | "md" | "lg";
  color?: "emerald" | "blue" | "purple" | "gray" | "red";
  animated?: boolean;
  dashed?: boolean;
}

export function Arrow({
  className,
  direction = "right",
  size = "md",
  color = "gray",
  animated = false,
  dashed = false,
}: ArrowProps) {
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

  const directionComponents = {
    right: ArrowRight,
    left: ArrowLeft,
    up: ArrowUp,
    down: ArrowDown,
  };

  const IconComponent = directionComponents[direction];

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        animated && "animate-pulse",
        dashed && "opacity-60",
        className,
      )}
    >
      <IconComponent className={cn(sizeClasses[size], colorClasses[color])} />
    </div>
  );
}
