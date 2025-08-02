import { Bug } from "lucide-react"
import { cn } from "@/lib/utils"

interface BugIconProps {
  className?: string
  size?: "sm" | "md" | "lg"
  animated?: boolean
}

export function BugIcon({ className, size = "md", animated = false }: BugIconProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }

  return (
    <div className={cn("flex items-center justify-center text-red-400", animated && "animate-bounce", className)}>
      <Bug className={cn(sizeClasses[size])} />
    </div>
  )
}
