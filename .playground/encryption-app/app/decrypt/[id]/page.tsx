"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Copy, Check, Download, Trash, Unlock, Eye, EyeOff, Loader2, Shield, Cloud, X, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { useParams } from "next/navigation"

type ProcessStep = {
  id: string
  label: string
  icon: React.ReactNode
}

const decryptionSteps: ProcessStep[] = [
  { id: "download", label: "Downloading payload", icon: <Download className="w-4 h-4" /> },
  { id: "delete", label: "Deleting from server", icon: <Trash className="w-4 h-4" /> },
  { id: "save", label: "Storing locally", icon: <Shield className="w-4 h-4" /> },
  { id: "decrypt", label: "Decrypting message", icon: <Unlock className="w-4 h-4" /> },
]

export default function DecryptPage() {
  const params = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [isDecrypted, setIsDecrypted] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)
  const [decryptedText, setDecryptedText] = useState("")
  const [currentStep, setCurrentStep] = useState(-1)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const [copied, setCopied] = useState(false)
  const [messageSource] = useState<"server" | "local">(Math.random() > 0.5 ? "server" : "local")
  const [badgesLoaded, setBadgesLoaded] = useState(false)

  const simulateDecryption = async () => {
    // Simulate badge loading
    await new Promise((resolve) => setTimeout(resolve, 500))
    setBadgesLoaded(true)

    await new Promise((resolve) => setTimeout(resolve, 300))
    setCurrentStep(0)

    for (let i = 0; i < decryptionSteps.length; i++) {
      setCurrentStep(i)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setCompletedSteps((prev) => new Set([...prev, i]))
      await new Promise((resolve) => setTimeout(resolve, 300))
    }

    // Mock decrypted text
    setDecryptedText(
      "This is your confidential message that was encrypted end-to-end. The content is now securely stored in your browser and accessible only to you.",
    )
    setIsDecrypted(true)
    setIsLoading(false)
    setCurrentStep(-1)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      simulateDecryption()
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(decryptedText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const clearLocalCopy = () => {
    // Mock clearing local storage
    alert("Local copy has been securely deleted from your browser.")
  }

  const revealText = () => {
    setIsRevealed(true)
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8">
              <Unlock className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">Secure Message Access</span>
            </div>
            <h1 className="text-4xl font-light text-white mb-4">Encrypted Message</h1>
            <p className="text-gray-400 text-lg font-light">Decrypting your secure content locally.</p>
          </div>

          {/* Source Badges */}
          <div className="flex justify-start gap-3 mb-6">
            {!badgesLoaded ? (
              <>
                <Badge variant="outline" className="bg-black/50 border-gray-800 text-gray-300">
                  <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />
                  Loading...
                </Badge>
                <Badge variant="outline" className="bg-black/50 border-gray-800 text-gray-300">
                  <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />
                  Verifying...
                </Badge>
              </>
            ) : (
              <>
                <Badge variant="outline" className="bg-black/50 border-gray-800 text-gray-300">
                  {messageSource === "local" ? (
                    <>
                      <Shield className="w-3 h-3 mr-1.5" />
                      Stored Locally
                    </>
                  ) : (
                    <>
                      <Cloud className="w-3 h-3 mr-1.5" />
                      From Server
                    </>
                  )}
                </Badge>
                <Badge className="bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-emerald-500/20 shadow-sm">
                  <Shield className="w-3 h-3 mr-1.5" />
                  Eyes Only
                </Badge>
              </>
            )}
          </div>

          {/* Message Display */}
          <div className="relative mb-6">
            <div
              className={cn(
                "min-h-[120px] bg-gray-900/50 border border-gray-800 rounded-lg p-6 transition-all duration-300 cursor-pointer",
                !isRevealed && isDecrypted && "hover:border-gray-700",
                isRevealed && "border-blue-500/30",
              )}
              onClick={isDecrypted && !isRevealed ? revealText : undefined}
            >
              {/* Loading/Processing Overlay */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm rounded-lg">
                  <div className="flex flex-col items-center gap-4">
                    {decryptionSteps.map((step, index) => (
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
                            <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                          ) : completedSteps.has(index) ? (
                            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center animate-in zoom-in-50 duration-300">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-gray-600" />
                          )}
                        </div>
                        <div
                          className={cn(
                            "text-sm font-medium transition-colors duration-300",
                            index === currentStep && "text-blue-400",
                            completedSteps.has(index) && "text-blue-300",
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

              {/* Decrypted Content */}
              {isDecrypted && (
                <div className="relative">
                  <div
                    className={cn(
                      "text-white text-lg leading-relaxed transition-all duration-500",
                      !isRevealed && "filter blur-sm select-none",
                    )}
                  >
                    {decryptedText}
                  </div>

                  {/* Reveal Overlay */}
                  {!isRevealed && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/70 border border-gray-700 rounded-lg px-4 py-2">
                        <div className="flex items-center gap-2 text-gray-300">
                          <Eye className="w-4 h-4" />
                          <span className="text-sm font-medium">Click to reveal message</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {isRevealed && (
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-800">
                      <Button
                        onClick={copyToClipboard}
                        size="sm"
                        variant="outline"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
                      >
                        {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                        {copied ? "Copied" : "Copy"}
                      </Button>
                      <Button
                        onClick={() => setIsRevealed(false)}
                        size="sm"
                        variant="ghost"
                        className="text-gray-400 hover:text-white hover:bg-gray-800"
                      >
                        <EyeOff className="w-4 h-4 mr-2" />
                        Hide
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Privacy Notice */}
          {isDecrypted && (
            <TooltipProvider>
              <div className="flex items-center justify-between text-sm text-gray-400 animate-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-2">
                  <span>You're reading a copy stored securely locally</span>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-gray-500 hover:text-gray-300 transition-colors" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs bg-gray-900 border-gray-700 text-gray-200">
                      <p className="text-sm">
                        This message has been permanently deleted from our servers and is now stored securely in your
                        browser's local storage. Only you can access it again from this device and browser. No one else
                        can ever access it from the link again, unless they clear their local browser storage.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Button
                  onClick={clearLocalCopy}
                  size="sm"
                  variant="ghost"
                  className="text-gray-500 hover:text-gray-300 hover:bg-gray-900 h-auto p-1"
                >
                  <X className="w-3 h-3 mr-1" />
                  Clear local copy
                </Button>
              </div>
            </TooltipProvider>
          )}
        </div>
      </div>
    </div>
  )
}
