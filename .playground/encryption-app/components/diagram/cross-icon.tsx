import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface CrossIconProps {
  className?: string
  size?: "sm" | "md" | "lg"
  animated?: boolean
}

export function CrossIcon({ className, size = "md", animated = false }: CrossIconProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center text-red-400",
        animated && "animate-in zoom-in-50 duration-300",
        className,
      )}
    >
      <X className={cn(sizeClasses[size])} />
    </div>
  )
}
