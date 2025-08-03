import Link from "next/link";
import { Lock, Shield, Eye, Key, MessageSquare, AlertTriangle, ExternalLink } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

export default function HowItWorksPage() {
  return (
    <div className="bg-background">
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
                  Once someone reads the message, it&apos;s permanently deleted from our servers. Only the sender and
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
                  href="https://en.wikipedia.org/wiki/URI_fragment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-purple-400 text-sm hover:text-purple-300 transition-colors"
                >
                  How it works <ExternalLink className="w-3 h-3" />
                </a>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-5 h-5 text-orange-400" />
                  <h3 className="font-medium text-white">Open Source</h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Fully auditable code ensures transparency and builds trust through community verification.
                </p>
                <a
                  href="https://github.com/PaulSenon/PROJ-9084-share-secret-saas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-orange-400 text-sm hover:text-orange-300 transition-colors"
                >
                  View source <ExternalLink className="w-3 h-3" />
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Security Process Steps */}
          <div className="mb-16">
            <h2 className="text-2xl font-medium text-white mb-8 text-center">Security Process</h2>
            <div className="space-y-6">
              {[
                {
                  id: 1,
                  title: "Client-Side Encryption",
                  description: "When you enter your secret, a unique AES-256-GCM encryption key is generated in your browser. Your plaintext is encrypted locally before any data is transmitted.",
                  color: "emerald"
                },
                {
                  id: 2,
                  title: "Secure Transmission",
                  description: "Only the encrypted ciphertext is sent to our servers. The encryption key remains in your browser and is embedded in the shareable URL fragment (by design, never accessible by server at any point in time).",
                  color: "blue"
                },
                {
                  id: 3,
                  title: "URL Generation & Local Caching", 
                  description: "A unique URL is created containing the secret ID and the encryption key in the URL fragment (#key). The encrypted secret is also cached locally in the creator's browser for preview purposes.",
                  color: "purple"
                },
                {
                  id: 4,
                  title: "Share over Untrusted Channel",
                  description: "The link can then be shared in any third party communication channel to the receiver that simply clicks on it on their side.",
                  color: "orange"
                },
                {
                  id: 5,
                  title: "First Access & Server Deletion",
                  description: "When the recipient first opens the URL, the encrypted data is fetched from our servers and immediately deleted. The decryption happens entirely in their browser, and the decrypted content is cached locally for them as well.",
                  color: "green"
                },
                {
                  id: 6,
                  title: "Subsequent Access from Owner and Receiver",
                  description: "Both the creator and the first recipient can revisit the URL and view the secret again, but it will be loaded from their local browser cache only. No additional server requests are made, and the secret remains accessible only to these two parties in their respective browsers.",
                  color: "cyan"
                },
                {
                  id: 7,
                  title: "Malicious Access if Link Leaks",
                  description: "Any other malicious person accessing this same link later, will request the server for the secret payload (that no longer exists) and will show a 404 error page.",
                  color: "red"
                }
              ].map((step) => (
                <Card key={step.id} className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step.color === 'emerald' ? 'bg-emerald-500/20 text-emerald-400' :
                        step.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                        step.color === 'purple' ? 'bg-purple-500/20 text-purple-400' :
                        step.color === 'orange' ? 'bg-orange-500/20 text-orange-400' :
                        step.color === 'green' ? 'bg-green-500/20 text-green-400' :
                        step.color === 'cyan' ? 'bg-cyan-500/20 text-cyan-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {step.id === 7 ? <AlertTriangle className="w-4 h-4" /> : step.id}
                      </div>
                      <div>
                        <h3 className="font-medium text-white mb-2">{step.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* What We Store vs Don't Store */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  What We Store
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-400">✓</span>
                    <span className="text-gray-300">Encrypted ciphertext only</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-400">✓</span>
                    <span className="text-gray-300">Unique secret identifier</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-400">✓</span>
                    <span className="text-gray-300">Timestamp for auto-deletion</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  What We Never Store
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-red-400">✗</span>
                    <span className="text-gray-300">Your plaintext secrets</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-red-400">✗</span>
                    <span className="text-gray-300">Encryption keys</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-red-400">✗</span>
                    <span className="text-gray-300">Personal information</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-red-400">✗</span>
                    <span className="text-gray-300">Access logs or metadata</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Technical Resources */}
          <Card className="bg-gray-900/50 border-gray-800 mb-16">
            <CardContent className="p-8">
              <h3 className="text-xl font-medium text-white mb-6">Technical Resources</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium text-white mb-4">Encryption & Security</h4>
                  <div className="space-y-3">
                    <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API" target="_blank" rel="noopener noreferrer" className="block text-gray-300 hover:text-white text-sm transition-colors">
                      Web Crypto API →
                    </a>
                    <a href="https://en.wikipedia.org/wiki/Advanced_Encryption_Standard" target="_blank" rel="noopener noreferrer" className="block text-gray-300 hover:text-white text-sm transition-colors">
                      AES Encryption Standard →
                    </a>
                    <a href="https://en.wikipedia.org/wiki/End-to-end_encryption" target="_blank" rel="noopener noreferrer" className="block text-gray-300 hover:text-white text-sm transition-colors">
                      End-to-End Encryption →
                    </a>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-4">Web Technologies</h4>
                  <div className="space-y-3">
                    <a href="https://developer.mozilla.org/en-US/docs/Web/API/URL/hash" target="_blank" rel="noopener noreferrer" className="block text-gray-300 hover:text-white text-sm transition-colors">
                      URL Hash/Fragment →
                    </a>
                    <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" target="_blank" rel="noopener noreferrer" className="block text-gray-300 hover:text-white text-sm transition-colors">
                      Local Storage API →
                    </a>
                    <a href="https://en.wikipedia.org/wiki/Client-side_encryption" target="_blank" rel="noopener noreferrer" className="block text-gray-300 hover:text-white text-sm transition-colors">
                      Client-Side Encryption →
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center">
            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Link href="/">Start Sharing Secrets Securely</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
