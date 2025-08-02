import { cn } from "~/lib/utils";
import type React from "react";

interface ChatMessage {
  id: string;
  component: React.ReactNode;
  sender?: "left" | "right";
  isHighlighted?: boolean;
}

interface ChatUIProps {
  className?: string;
  messages: ChatMessage[];
  title?: string;
}

export function ChatUI({
  className,
  messages,
  title = "Untrusted Channel",
}: ChatUIProps) {
  return (
    <div
      className={cn(
        "min-w-[200px] rounded-lg border border-gray-800 bg-gray-900/50 p-4",
        className,
      )}
    >
      {title && (
        <div className="mb-3 border-b border-gray-800 pb-2 text-center text-xs text-gray-400">
          {title}
        </div>
      )}
      <div className="max-h-32 space-y-2 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.sender === "right" ? "justify-end" : "justify-start",
            )}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-lg p-2 transition-all duration-300",
                message.sender === "right"
                  ? "border border-blue-500/30 bg-blue-500/20"
                  : "border border-gray-600/50 bg-gray-700/50",
                message.isHighlighted &&
                  "border-red-500/30 bg-red-500/10 ring-2 ring-red-400/50",
              )}
            >
              {message.component}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
