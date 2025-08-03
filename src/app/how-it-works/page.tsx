import Link from "next/link";
import {
  Lock,
  Shield,
  Eye,
  Key,
  MessageSquare,
  AlertTriangle,
  ExternalLink,
  Info,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function HowItWorksPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-16 text-center">
            <div className="bg-secondary/50 mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-2">
              <Shield className="text-primary h-4 w-4" />
              <span className="text-sm font-medium">Security & Privacy</span>
            </div>
            <h1 className="text-foreground mb-4 text-4xl font-light">
              How It Works
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Understanding the security and privacy features that protect your
              sensitive information
            </p>
          </div>

          {/* Use Case Card */}
          <Card className="mb-16">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 border-primary/20 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border">
                  <MessageSquare className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-foreground mb-3 text-xl font-medium">
                    Perfect for Sensitive Communications
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    When you need to share sensitive information quickly over
                    untrusted communication channels like email, SMS, chat apps,
                    or social media, our platform provides a secure solution.
                    Share a link containing an end-to-end encrypted secret that
                    can be decoded once (guaranteed), then disappears from our
                    servers forever. The recipient gets secure access while
                    maintaining complete privacy.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Free Service Notice */}
          <div className="mb-16 text-center">
            <p className="text-muted-foreground flex items-center justify-center gap-2 text-sm">
              <Info className="h-4 w-4" />
              This service is completely free — low operational costs mean no
              ads, no premium plans, just secure secret sharing.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="hover:bg-accent/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-emerald-500/10 p-2">
                    <Lock className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <CardTitle className="text-base">
                    End-to-End Encryption
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Military-grade AES-256-GCM encryption ensures your data is
                  protected with the highest security standards.
                </CardDescription>
                <a
                  href="https://en.wikipedia.org/wiki/Galois/Counter_Mode"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 inline-flex items-center gap-1 text-sm transition-colors"
                >
                  Learn more <ExternalLink className="h-3 w-3" />
                </a>
              </CardContent>
            </Card>

            <Card className="hover:bg-accent/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-500/10 p-2">
                    <Eye className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-base">One-Time Access</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Once someone reads the message, it&apos;s permanently deleted
                  from our servers. Only the sender and receiver retain local
                  copies.
                </CardDescription>
                <span className="text-primary text-sm font-medium">
                  Guaranteed privacy
                </span>
              </CardContent>
            </Card>

            <Card className="hover:bg-accent/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-purple-500/10 p-2">
                    <Key className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle className="text-base">Zero-Knowledge</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Encryption keys are stored in URL fragments (#), never sent to
                  our servers. We literally cannot decrypt your data.
                </CardDescription>
                <a
                  href="https://en.wikipedia.org/wiki/URI_fragment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 inline-flex items-center gap-1 text-sm transition-colors"
                >
                  How it works <ExternalLink className="h-3 w-3" />
                </a>
              </CardContent>
            </Card>

            <Card className="hover:bg-accent/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-orange-500/10 p-2">
                    <Shield className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <CardTitle className="text-base">Open Source</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Fully auditable code ensures transparency and builds trust
                  through community verification.
                </CardDescription>
                <a
                  href="https://github.com/PaulSenon/PROJ-9084-share-secret-saas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 inline-flex items-center gap-1 text-sm transition-colors"
                >
                  View source <ExternalLink className="h-3 w-3" />
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Security Process Steps */}
          <div className="mb-16">
            <h2 className="text-foreground mb-8 text-center text-2xl font-medium">
              Security Process
            </h2>
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  title: "Client-Side Encryption",
                  description:
                    "When you enter your secret, a unique AES-256-GCM encryption key is generated in your browser. Your plaintext is encrypted locally before any data is transmitted.",
                },
                {
                  id: 2,
                  title: "Secure Transmission",
                  description:
                    "Only the encrypted ciphertext is sent to our servers. The encryption key remains in your browser and is embedded in the shareable URL fragment (by design, never accessible by server at any point in time).",
                },
                {
                  id: 3,
                  title: "URL Generation & Local Caching",
                  description:
                    "A unique URL is created containing the secret ID and the encryption key in the URL fragment (#key). The encrypted secret is also cached locally in the creator's browser for preview purposes.",
                },
                {
                  id: 4,
                  title: "Share over Untrusted Channel",
                  description:
                    "The link can then be shared in any third party communication channel to the receiver that simply clicks on it on their side.",
                },
                {
                  id: 5,
                  title: "First Access & Server Deletion",
                  description:
                    "When the recipient first opens the URL, the encrypted data is fetched from our servers and immediately deleted. The decryption happens entirely in their browser, and the decrypted content is cached locally for them as well.",
                },
                {
                  id: 6,
                  title: "Subsequent Access from Owner and Receiver",
                  description:
                    "Both the creator and the first recipient can revisit the URL and view the secret again, but it will be loaded from their local browser cache only. No additional server requests are made, and the secret remains accessible only to these two parties in their respective browsers.",
                },
                {
                  id: 7,
                  title: "Malicious Access if Link Leaks",
                  description:
                    "Any other malicious person accessing this same link later, will request the server for the secret payload (that no longer exists) and will show a 404 error page.",
                  isWarning: true,
                },
              ].map((step) => (
                <div key={step.id} className="flex items-start gap-4 py-2">
                  <div className="bg-primary/10 text-primary flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-sm font-medium">
                    {step.isWarning ? (
                      <AlertTriangle className="h-4 w-4" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-foreground mb-1 font-medium">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What We Store vs Don't Store */}
          <div className="mb-16 grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                  What We Store
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-600 dark:text-green-400">
                      ✓
                    </span>
                    <span className="text-foreground">
                      Encrypted ciphertext only
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-600 dark:text-green-400">
                      ✓
                    </span>
                    <span className="text-foreground">
                      Unique secret identifier
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-600 dark:text-green-400">
                      ✓
                    </span>
                    <span className="text-foreground">
                      Timestamp for auto-deletion
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  What We Never Store
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-red-600 dark:text-red-400">✗</span>
                    <span className="text-foreground">
                      Your plaintext secrets
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-red-600 dark:text-red-400">✗</span>
                    <span className="text-foreground">Encryption keys</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-red-600 dark:text-red-400">✗</span>
                    <span className="text-foreground">
                      Personal information
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-red-600 dark:text-red-400">✗</span>
                    <span className="text-foreground">
                      Access logs or metadata
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Technical Resources */}
          <Card className="mb-16">
            <CardHeader>
              <CardTitle className="text-xl">Technical Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h4 className="text-foreground mb-4 font-medium">
                    Encryption & Security
                  </h4>
                  <div className="space-y-3">
                    <a
                      href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground block text-sm transition-colors"
                    >
                      Web Crypto API →
                    </a>
                    <a
                      href="https://en.wikipedia.org/wiki/Advanced_Encryption_Standard"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground block text-sm transition-colors"
                    >
                      AES Encryption Standard →
                    </a>
                    <a
                      href="https://en.wikipedia.org/wiki/End-to-end_encryption"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground block text-sm transition-colors"
                    >
                      End-to-End Encryption →
                    </a>
                  </div>
                </div>
                <div>
                  <h4 className="text-foreground mb-4 font-medium">
                    Web Technologies
                  </h4>
                  <div className="space-y-3">
                    <a
                      href="https://developer.mozilla.org/en-US/docs/Web/API/URL/hash"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground block text-sm transition-colors"
                    >
                      URL Hash/Fragment →
                    </a>
                    <a
                      href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground block text-sm transition-colors"
                    >
                      Local Storage API →
                    </a>
                    <a
                      href="https://en.wikipedia.org/wiki/Client-side_encryption"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground block text-sm transition-colors"
                    >
                      Client-Side Encryption →
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center">
            <Button asChild size="lg">
              <Link href="/">Start Sharing Secrets Securely</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
