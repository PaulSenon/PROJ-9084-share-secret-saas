import { Key } from "lucide-react"
import { cn } from "@/lib/utils"

interface KeyIconProps {
  className?: string
  size?: "sm" | "md" | "lg"
  color?: "emerald" | "blue" | "purple" | "gray"
}

export function KeyIcon({ className, size = "md", color = "emerald" }: KeyIconProps) {
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
    <div className={cn("flex items-center justify-center", className)}>
      <Key className={cn(sizeClasses[size], colorClasses[color])} />
    </div>
  )
}
