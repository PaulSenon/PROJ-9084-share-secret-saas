"use client"

import { MousePointer } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface CursorPointerProps {
  className?: string
  size?: "sm" | "md" | "lg"
  onTriggerClick?: () => void
  autoClick?: boolean
  clickInterval?: number
}

export function CursorPointer({
  className,
  size = "md",
  onTriggerClick,
  autoClick = false,
  clickInterval = 2000,
}: CursorPointerProps) {
  const [isClicking, setIsClicking] = useState(false)

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }

  const triggerClick = () => {
    setIsClicking(true)
    onTriggerClick?.()
    setTimeout(() => setIsClicking(false), 200)
  }

  // Auto-click functionality
  if (autoClick) {
    setTimeout(() => {
      triggerClick()
    }, clickInterval)
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center cursor-pointer transition-all duration-200",
        isClicking && "scale-90",
        className,
      )}
      onClick={triggerClick}
    >
      <MousePointer className={cn(sizeClasses[size], "text-white", isClicking && "text-blue-400")} />
      {isClicking && <div className="absolute w-4 h-4 bg-blue-400/30 rounded-full animate-ping"></div>}
    </div>
  )
}
