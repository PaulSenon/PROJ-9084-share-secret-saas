"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, Lock, Send, Link, Loader2, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

type ProcessStep = {
  id: string
  label: string
  icon: React.ReactNode
}

const encryptionSteps: ProcessStep[] = [
  { id: "encrypt", label: "Encrypting locally", icon: <Lock className="w-4 h-4" /> },
  { id: "save", label: "Securing payload", icon: <Shield className="w-4 h-4" /> },
  { id: "send", label: "Uploading to server", icon: <Send className="w-4 h-4" /> },
  { id: "generate", label: "Generating secure link", icon: <Link className="w-4 h-4" /> },
]

export default function HomePage() {
  const [text, setText] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [generatedLink, setGeneratedLink] = useState("")
  const [currentStep, setCurrentStep] = useState(-1)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const simulateEncryption = async () => {
    setIsProcessing(true)
    setCurrentStep(0)
    setCompletedSteps(new Set())

    for (let i = 0; i < encryptionSteps.length; i++) {
      setCurrentStep(i)
      await new Promise((resolve) => setTimeout(resolve, 1200))

      setCompletedSteps((prev) => new Set([...prev, i]))
      await new Promise((resolve) => setTimeout(resolve, 300))
    }

    // Generate mock link
    const mockId = Math.random().toString(36).substring(2, 15)
    const link = `${window.location.origin}/decrypt/${mockId}`
    setGeneratedLink(link)

    setIsCompleted(true)
    setIsProcessing(false)
    setCurrentStep(-1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim() && !isProcessing) {
      simulateEncryption()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && text.trim() && !isProcessing) {
      simulateEncryption()
    }
  }

  const copyToClipboard = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const reset = () => {
    setText("")
    setIsProcessing(false)
    setIsCompleted(false)
    setGeneratedLink("")
    setCurrentStep(-1)
    setCompletedSteps(new Set())
    setCopied(false)
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-8">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm font-medium">Zero-Knowledge Encryption</span>
            </div>
            <h1 className="text-4xl font-light text-white mb-4">Secure Text Sharing</h1>
            <p className="text-gray-400 text-lg font-light">End-to-end encrypted. Zero server knowledge.</p>
          </div>

          {/* Source Badge */}
          <div className="flex justify-start mb-6">
            <Badge variant="outline" className="bg-black/50 border-gray-800 text-gray-300">
              <Shield className="w-3 h-3 mr-1.5" />
              Local Device
            </Badge>
          </div>

          {/* Input Section */}
          <div className="relative mb-8">
            <div className="relative">
              <Input
                ref={inputRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your message..."
                className={cn(
                  "h-16 text-lg bg-black border-gray-800 text-white placeholder:text-gray-500 transition-all duration-300 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20",
                  (isProcessing || isCompleted) && "filter blur-sm",
                  isCompleted && "border-emerald-500/30",
                )}
                disabled={isProcessing || isCompleted}
              />

              {/* Processing Steps Overlay */}
              {isProcessing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm rounded-md">
                  <div className="flex flex-col items-center gap-4">
                    {encryptionSteps.map((step, index) => (
                      <div
                        key={step.id}
                        className={cn(
                          "flex items-center gap-3 transition-all duration-500 transform",
                          index === currentStep && "scale-100 opacity-100",
                          index < currentStep && completedSteps.has(index) && "scale-75 opacity-60 -translate-y-2",
                          index > currentStep && "scale-90 opacity-30 translate-y-2",
                        )}
                      >
                        <div className="relative">
                          {index === currentStep ? (
                            <Loader2 className="w-5 h-5 text-emerald-400 animate-spin" />
                          ) : completedSteps.has(index) ? (
                            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center animate-in zoom-in-50 duration-300">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-gray-600" />
                          )}
                        </div>
                        <div
                          className={cn(
                            "text-sm font-medium transition-colors duration-300",
                            index === currentStep && "text-emerald-400",
                            completedSteps.has(index) && "text-emerald-300",
                            index > currentStep && "text-gray-500",
                          )}
                        >
                          {step.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Encrypted State */}
              {isCompleted && !isProcessing && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-2">
                    <Lock className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 text-sm font-medium">Encrypted & Secured</span>
                  </div>
                </div>
              )}
            </div>

            {!isProcessing && !isCompleted && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <Button
                  type="submit"
                  size="sm"
                  onClick={handleSubmit}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white border-0"
                  disabled={!text.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Generated Link Section */}
          {isCompleted && generatedLink && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              <div className="text-center">
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                  <Check className="w-3 h-3 mr-1" />
                  Secure link generated
                </Badge>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Link className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300 text-sm font-medium">One-time shareable link</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-black border border-gray-800 rounded-md p-3">
                    <p className="text-gray-300 text-sm font-mono truncate">{generatedLink}</p>
                  </div>
                  <Button
                    onClick={() => copyToClipboard(generatedLink)}
                    size="sm"
                    variant="outline"
                    className="shrink-0 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className="text-center">
                <Button onClick={reset} variant="ghost" className="text-gray-400 hover:text-white hover:bg-gray-900">
                  Create another message
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
