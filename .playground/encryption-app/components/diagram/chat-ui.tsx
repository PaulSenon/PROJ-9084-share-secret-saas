import { cn } from "@/lib/utils"
import type React from "react"

interface ChatMessage {
  id: string
  component: React.ReactNode
  sender?: "left" | "right"
  isHighlighted?: boolean
}

interface ChatUIProps {
  className?: string
  messages: ChatMessage[]
  title?: string
}

export function ChatUI({ className, messages, title = "Untrusted Channel" }: ChatUIProps) {
  return (
    <div className={cn("bg-gray-900/50 border border-gray-800 rounded-lg p-4 min-w-[200px]", className)}>
      {title && <div className="text-xs text-gray-400 mb-3 text-center border-b border-gray-800 pb-2">{title}</div>}
      <div className="space-y-2 max-h-32 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className={cn("flex", message.sender === "right" ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[80%] p-2 rounded-lg transition-all duration-300",
                message.sender === "right"
                  ? "bg-blue-500/20 border border-blue-500/30"
                  : "bg-gray-700/50 border border-gray-600/50",
                message.isHighlighted && "ring-2 ring-red-400/50 bg-red-500/10 border-red-500/30",
              )}
            >
              {message.component}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
