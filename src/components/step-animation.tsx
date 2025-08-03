"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { cn } from "~/lib/utils";

export type StepStatus = "pending" | "loading" | "success" | "error";

export interface Step {
  id: string;
  label: string;
  icon: React.ReactNode;
  status: StepStatus;
}

interface StepAnimationProps {
  steps: Step[];
  currentStepIndex: number;
  className?: string;
}

export function StepAnimation({
  steps,
  currentStepIndex,
  className,
}: StepAnimationProps) {
  return (
    <div
      className={cn("relative h-full w-full overflow-hidden", className)}
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0px, black 16px, black calc(100% - 16px), transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0px, black 16px, black calc(100% - 16px), transparent 100%)",
      }}
    >
      <div className="relative flex h-full flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {steps.map((step, index) => {
            const offset = index - currentStepIndex;
            const isActive = index === currentStepIndex;
            const isCompleted = step.status === "success";
            const isError = step.status === "error";

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: Math.abs(offset) > 1 ? 0 : isActive ? 1 : 0.3,
                  y: offset * 36,
                  scale: isActive ? 1.02 : 0.98,
                }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 25,
                  duration: 0.4,
                }}
                className="absolute flex items-center gap-3 whitespace-nowrap"
              >
                <div className="relative flex items-center justify-center">
                  {step.status === "loading" ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Loader2 className="h-4 w-4 text-emerald-400" />
                    </motion.div>
                  ) : isCompleted ? (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500"
                    >
                      <Check className="h-2.5 w-2.5 text-white" />
                    </motion.div>
                  ) : isError ? (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500"
                    >
                      <span className="text-xs font-bold text-white">✕</span>
                    </motion.div>
                  ) : (
                    <div className="h-4 w-4 rounded-full border-2 border-gray-600" />
                  )}
                </div>

                <div
                  className={cn(
                    "text-sm font-medium transition-colors duration-300",
                    isActive && "text-emerald-400",
                    isCompleted && "text-emerald-300",
                    isError && "text-red-400",
                    !isActive && !isCompleted && !isError && "text-gray-500",
                  )}
                >
                  {step.label}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
