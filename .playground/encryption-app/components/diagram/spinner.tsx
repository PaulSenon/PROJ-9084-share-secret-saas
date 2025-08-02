import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface SpinnerProps {
  className?: string
  size?: "sm" | "md" | "lg"
  color?: "emerald" | "blue" | "purple" | "gray"
  label?: string
}

export function Spinner({ className, size = "md", color = "blue", label }: SpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }

  const colorClasses = {
    emerald: "text-emerald-400",
    blue: "text-blue-400",
    purple: "text-purple-400",
    gray: "text-gray-400",
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Loader2 className={cn(sizeClasses[size], colorClasses[color], "animate-spin")} />
      {label && <span className={cn("text-sm", colorClasses[color])}>{label}</span>}
    </div>
  )
}
