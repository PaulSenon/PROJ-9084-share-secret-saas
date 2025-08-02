"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Lock,
  Shield,
  Github,
  ExternalLink,
  User,
  Server,
  MessageSquare,
  Key,
  Eye,
  Trash2,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  {
    id: 1,
    title: "Client-Side Encryption",
    description:
      "When you enter your secret, a unique AES-256-GCM encryption key is generated in your browser. Your plaintext is encrypted locally before any data is transmitted.",
    highlight: "encryption",
  },
  {
    id: 2,
    title: "Secure Transmission",
    description:
      "Only the encrypted ciphertext is sent to our servers. The encryption key remains in your browser and is embedded in the shareable URL fragment (by design, never accessible by server at any point in time).",
    highlight: "transmission",
  },
  {
    id: 3,
    title: "URL Generation & Local Caching",
    description:
      "A unique URL is created containing the secret ID and the encryption key in the URL fragment (#key). The encrypted secret is also cached locally in the creator's browser for preview purposes.",
    highlight: "url-generation",
  },
  {
    id: 4,
    title: "Share over Untrusted Channel",
    description:
      "The link can then be shared in any third party communication channel to the receiver that simply clicks on it on their side.",
    highlight: "sharing",
  },
  {
    id: 5,
    title: "First Access & Server Deletion",
    description:
      "When the recipient first opens the URL, the encrypted data is fetched from our servers and immediately deleted. The decryption happens entirely in their browser, and the decrypted content is cached locally for them as well.",
    highlight: "first-access",
  },
  {
    id: 6,
    title: "Subsequent Access from Owner and Receiver",
    description:
      "Both the creator and the first recipient can revisit the URL and view the secret again, but it will be loaded from their local browser cache only. No additional server requests are made, and the secret remains accessible only to these two parties in their respective browsers.",
    highlight: "subsequent-access",
  },
  {
    id: 7,
    title: "Malicious Access if Link Leaks",
    description:
      "Any other malicious person accessing this same link later, will request the server for the secret payload (that no longer exists) and will show a 404 error page.",
    highlight: "malicious-access",
  },
]

export default function HowItWorksPage() {
  const [activeStep, setActiveStep] = useState(1)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev >= steps.length ? 1 : prev + 1))
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const handleStepClick = (stepId: number) => {
    setActiveStep(stepId)
    setIsAutoPlaying(false)
  }

  const currentStep = steps.find((step) => step.id === activeStep)

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">Security & Privacy</span>
            </div>
            <h1 className="text-4xl font-light text-white mb-4">How It Works</h1>
            <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto">
              Understanding the security and privacy features that protect your sensitive information
            </p>
          </div>

          {/* Use Case Card */}
          <Card className="bg-gray-900/50 border-gray-800 mb-16">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-xl font-medium text-white mb-3">Perfect for Sensitive Communications</h2>
                  <p className="text-gray-300 leading-relaxed">
                    When you need to share sensitive information quickly over untrusted communication channels like
                    email, SMS, chat apps, or social media, our platform provides a secure solution. Share a link
                    containing an end-to-end encrypted secret that can be decoded once (guaranteed), then disappears
                    from our servers forever. The recipient gets secure access while maintaining complete privacy.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-medium text-white">End-to-End Encryption</h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Military-grade AES-256-GCM encryption ensures your data is protected with the highest security
                  standards.
                </p>
                <a
                  href="https://en.wikipedia.org/wiki/Galois/Counter_Mode"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-400 text-sm hover:text-emerald-300 transition-colors"
                >
                  Learn more <ExternalLink className="w-3 h-3" />
                </a>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="w-5 h-5 text-blue-400" />
                  <h3 className="font-medium text-white">One-Time Access</h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Once someone reads the message, it's permanently deleted from our servers. Only the sender and
                  receiver retain local copies.
                </p>
                <span className="text-blue-400 text-sm">Guaranteed privacy</span>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Key className="w-5 h-5 text-purple-400" />
                  <h3 className="font-medium text-white">Zero-Knowledge</h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Encryption keys are stored in URL fragments (#), never sent to our servers. We literally cannot
                  decrypt your data.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-purple-400 text-sm hover:text-purple-300 transition-colors"
                >
                  How it works <ExternalLink className="w-3 h-3" />
                </a>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Github className="w-5 h-5 text-orange-400" />
                  <h3 className="font-medium text-white">Open Source</h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Fully auditable code ensures transparency and builds trust through community verification.
                </p>
                <a
                  href="https://github.com/your-repo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-orange-400 text-sm hover:text-orange-300 transition-colors"
                >
                  View source <ExternalLink className="w-3 h-3" />
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Interactive Diagram Section */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Steps Sidebar */}
            <div className="lg:col-span-1">
              <h2 className="text-xl font-medium text-white mb-6">Security Process</h2>
              <div className="space-y-3">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    onClick={() => handleStepClick(step.id)}
                    className={cn(
                      "p-4 rounded-lg border cursor-pointer transition-all duration-300",
                      activeStep === step.id
                        ? "bg-blue-500/10 border-blue-500/30 text-white"
                        : "bg-gray-900/50 border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-300",
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
                          activeStep === step.id ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-400",
                        )}
                      >
                        {step.id}
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">{step.title}</h3>
                        {activeStep === step.id && (
                          <p className="text-sm text-gray-300 animate-in slide-in-from-top-2 duration-300">
                            {step.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {!isAutoPlaying && (
                <Button
                  onClick={() => setIsAutoPlaying(true)}
                  variant="outline"
                  size="sm"
                  className="mt-4 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
                >
                  Resume auto-play
                </Button>
              )}
            </div>

            {/* Interactive Diagram */}
            <div className="lg:col-span-2">
              <Card className="bg-gray-900/50 border-gray-800 h-[600px]">
                <CardContent className="p-8 h-full">
                  <div className="relative h-full">
                    {/* Actors */}
                    <div className="absolute top-8 left-8">
                      <div
                        className={cn(
                          "flex flex-col items-center gap-2 transition-all duration-500",
                          (currentStep?.highlight === "encryption" ||
                            currentStep?.highlight === "url-generation" ||
                            currentStep?.highlight === "subsequent-access") &&
                            "scale-110 text-blue-400",
                        )}
                      >
                        <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-emerald-400" />
                        </div>
                        <span className="text-xs text-gray-400">Creator</span>
                      </div>
                    </div>

                    <div className="absolute top-8 right-8">
                      <div
                        className={cn(
                          "flex flex-col items-center gap-2 transition-all duration-500",
                          (currentStep?.highlight === "first-access" ||
                            currentStep?.highlight === "subsequent-access") &&
                            "scale-110 text-blue-400",
                        )}
                      >
                        <div className="w-12 h-12 bg-purple-500/20 border border-purple-500/30 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-purple-400" />
                        </div>
                        <span className="text-xs text-gray-400">Receiver</span>
                      </div>
                    </div>

                    <div className="absolute top-8 left-1/2 -translate-x-1/2">
                      <div
                        className={cn(
                          "flex flex-col items-center gap-2 transition-all duration-500",
                          (currentStep?.highlight === "transmission" || currentStep?.highlight === "first-access") &&
                            "scale-110 text-blue-400",
                          currentStep?.highlight === "subsequent-access" && "opacity-30",
                        )}
                      >
                        <div className="w-12 h-12 bg-gray-500/20 border border-gray-500/30 rounded-full flex items-center justify-center">
                          <Server className="w-6 h-6 text-gray-400" />
                        </div>
                        <span className="text-xs text-gray-400">Server</span>
                      </div>
                    </div>

                    <div className="absolute bottom-32 left-1/2 -translate-x-1/2">
                      <div
                        className={cn(
                          "flex flex-col items-center gap-2 transition-all duration-500",
                          (currentStep?.highlight === "sharing" || currentStep?.highlight === "malicious-access") &&
                            "scale-110 text-blue-400",
                        )}
                      >
                        <div
                          className={cn(
                            "w-16 h-10 border rounded-lg flex items-center justify-center transition-colors duration-500",
                            currentStep?.highlight === "malicious-access"
                              ? "bg-red-500/20 border-red-500/30"
                              : "bg-orange-500/20 border-orange-500/30",
                          )}
                        >
                          <MessageSquare
                            className={cn(
                              "w-5 h-5 transition-colors duration-500",
                              currentStep?.highlight === "malicious-access" ? "text-red-400" : "text-orange-400",
                            )}
                          />
                        </div>
                        <span className="text-xs text-gray-400">Untrusted Channel</span>
                      </div>
                    </div>

                    {/* Malicious User (appears in step 7) */}
                    {currentStep?.highlight === "malicious-access" && (
                      <div className="absolute bottom-8 left-8 animate-in fade-in-0 duration-500">
                        <div className="flex flex-col items-center gap-2 text-red-400">
                          <div className="w-12 h-12 bg-red-500/20 border border-red-500/30 rounded-full flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6 text-red-400" />
                          </div>
                          <span className="text-xs">Malicious User</span>
                        </div>
                      </div>
                    )}

                    {/* Dynamic Content Based on Current Step */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {currentStep?.highlight === "encryption" && (
                        <div className="flex items-center gap-4 animate-in fade-in-0 duration-500">
                          <div className="text-white bg-gray-800 px-3 py-2 rounded">Clear Message</div>
                          <div className="text-emerald-400">+</div>
                          <div className="flex items-center gap-2">
                            <Key className="w-5 h-5 text-emerald-400" />
                            <span className="text-emerald-400">AES-256 Key</span>
                          </div>
                          <div className="text-emerald-400">=</div>
                          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-2 rounded">
                            <span className="text-emerald-400">***encrypted***</span>
                            <Lock className="w-4 h-4 text-emerald-400" />
                          </div>
                        </div>
                      )}

                      {currentStep?.highlight === "transmission" && (
                        <div className="flex flex-col items-center gap-4 animate-in fade-in-0 duration-500">
                          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-2 rounded">
                            <span className="text-emerald-400">***encrypted***</span>
                            <Lock className="w-4 h-4 text-emerald-400" />
                          </div>
                          <div className="text-gray-400 text-sm">→ Sent to server</div>
                          <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 px-3 py-2 rounded">
                            <span className="text-blue-400">Secret ID: abc123</span>
                          </div>
                        </div>
                      )}

                      {currentStep?.highlight === "url-generation" && (
                        <div className="flex flex-col items-center gap-4 animate-in fade-in-0 duration-500">
                          <div className="bg-gray-800 border border-gray-700 px-4 py-2 rounded font-mono text-sm text-white">
                            /decrypt/abc123#encryption-key-here
                          </div>
                          <div className="text-gray-400 text-xs">URL with embedded key</div>
                        </div>
                      )}

                      {currentStep?.highlight === "sharing" && (
                        <div className="animate-in fade-in-0 duration-500">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                        </div>
                      )}

                      {currentStep?.highlight === "first-access" && (
                        <div className="flex flex-col items-center gap-4 animate-in fade-in-0 duration-500">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-2 rounded">
                              <span className="text-emerald-400">***encrypted***</span>
                              <Lock className="w-4 h-4 text-emerald-400" />
                            </div>
                            <Trash2 className="w-5 h-5 text-red-400" />
                          </div>
                          <div className="text-white bg-gray-800 px-3 py-2 rounded">Decrypted Message</div>
                        </div>
                      )}

                      {currentStep?.highlight === "subsequent-access" && (
                        <div className="flex items-center gap-4 animate-in fade-in-0 duration-500">
                          <CheckCircle className="w-8 h-8 text-green-400" />
                          <span className="text-green-400">Local Cache Access</span>
                          <XCircle className="w-6 h-6 text-gray-600" />
                          <span className="text-gray-600 line-through">Server Request</span>
                        </div>
                      )}

                      {currentStep?.highlight === "malicious-access" && (
                        <div className="flex items-center gap-4 animate-in fade-in-0 duration-500">
                          <XCircle className="w-8 h-8 text-red-400" />
                          <span className="text-red-400">404 - Not Found</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
