import { User } from "lucide-react"
import { cn } from "@/lib/utils"

interface UserIconProps {
  className?: string
  size?: "sm" | "md" | "lg"
  color?: "emerald" | "blue" | "purple" | "gray" | "red"
  label?: string
  animated?: boolean
}

export function UserIcon({ className, size = "md", color = "gray", label, animated = false }: UserIconProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  const iconSizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }

  const colorClasses = {
    emerald: "bg-emerald-500/20 border-emerald-500/30 text-emerald-400",
    blue: "bg-blue-500/20 border-blue-500/30 text-blue-400",
    purple: "bg-purple-500/20 border-purple-500/30 text-purple-400",
    gray: "bg-gray-500/20 border-gray-500/30 text-gray-400",
    red: "bg-red-500/20 border-red-500/30 text-red-400",
  }

  return (
    <div className={cn("flex flex-col items-center gap-2", animated && "animate-pulse", className)}>
      <div
        className={cn("rounded-full border flex items-center justify-center", sizeClasses[size], colorClasses[color])}
      >
        <User className={iconSizeClasses[size]} />
      </div>
      {label && <span className="text-xs text-gray-400">{label}</span>}
    </div>
  )
}
