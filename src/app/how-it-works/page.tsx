import Link from "next/link";
import { ArrowLeft, Lock, Shield, Eye, Zap, Key, Server, Trash2, ExternalLink } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { ThemeToggle } from "~/components/theme-toggle";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="icon">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Lock className="h-4 w-4" />
              </div>
              <h1 className="text-xl font-semibold">SecretShare</h1>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <Badge variant="secondary" className="mb-4">
              Zero-Knowledge Architecture
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
              How It
              <span className="text-primary"> Works</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Understanding the security and privacy features that protect your sensitive information
            </p>
          </div>

          {/* Security Features */}
          <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">End-to-End Encrypted</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Your secrets are encrypted using AES-256-GCM encryption directly in your browser before being sent to our servers.
                </p>
                <a 
                  href="https://en.wikipedia.org/wiki/Galois/Counter_Mode" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  Learn about AES-GCM <ExternalLink className="h-3 w-3" />
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Eye className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">One-Time Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Secrets are automatically deleted after the first view, ensuring they can never be accessed again.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Key className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Client-Side Keys</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Encryption keys never leave your browser and are only shared through URL fragments.
                </p>
                <a 
                  href="https://en.wikipedia.org/wiki/URI_fragment" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  Learn about URL fragments <ExternalLink className="h-3 w-3" />
                </a>
              </CardContent>
            </Card>
          </div>

          {/* How It Works Process */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                The Process
              </CardTitle>
              <CardDescription>
                Step-by-step breakdown of how your secrets are protected
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Client-Side Encryption</h3>
                  <p className="text-sm text-muted-foreground">
                    When you enter your secret, a unique AES-256-GCM encryption key is generated in your browser. 
                    Your plaintext is encrypted locally before any data is transmitted.
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Secure Transmission</h3>
                  <p className="text-sm text-muted-foreground">
                    Only the encrypted ciphertext is sent to our servers. The encryption key remains in your browser 
                    and is embedded in the shareable URL fragment.
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1">URL Generation & Local Caching</h3>
                  <p className="text-sm text-muted-foreground">
                    A unique URL is created containing the secret ID and the encryption key in the 
                    <a href="https://en.wikipedia.org/wiki/URI_fragment" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline mx-1">
                      URL fragment
                    </a> 
                    (#key). The encrypted secret is also cached locally in the creator's browser for preview purposes.
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold mb-1">First Access & Server Deletion</h3>
                  <p className="text-sm text-muted-foreground">
                    When the recipient first opens the URL, the encrypted data is fetched from our servers and immediately deleted. 
                    The decryption happens entirely in their browser, and the decrypted content is cached locally for them as well.
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                  5
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Subsequent Access</h3>
                  <p className="text-sm text-muted-foreground">
                    Both the creator and the first recipient can revisit the URL and view the secret again, but it will be loaded 
                    from their local browser cache only. No additional server requests are made, and the secret remains accessible 
                    only to these two parties in their respective browsers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Details */}
          <div className="grid gap-6 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <Server className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">What We Store</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-600">✓</span>
                  <span>Encrypted ciphertext only</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-600">✓</span>
                  <span>Unique secret identifier</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-red-600">✗</span>
                  <span>Your plaintext secrets</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-red-600">✗</span>
                  <span>Encryption keys</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-red-600">✗</span>
                  <span>Personal information</span>
                </div>
                <div className="mt-4">
                  <a 
                    href="https://en.wikipedia.org/wiki/Zero-knowledge_proof" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    Learn about zero-knowledge architecture <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Trash2 className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Local Caching & Deletion</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-600">✓</span>
                  <span>Server data deleted after first access</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-600">✓</span>
                  <span>Local cache for creator and first viewer</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-600">✓</span>
                  <span>No recovery possible from server</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-600">✓</span>
                  <span>Ephemeral by design</span>
                </div>
                <div className="mt-4">
                  <a 
                    href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    Learn about browser storage <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Technical Resources */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Technical Resources
              </CardTitle>
              <CardDescription>
                Learn more about the cryptographic and web technologies that power SecretShare
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Encryption & Security</h4>
                  <div className="space-y-2">
                    <a 
                      href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      Web Crypto API <ExternalLink className="h-3 w-3" />
                    </a>
                    <a 
                      href="https://en.wikipedia.org/wiki/Advanced_Encryption_Standard" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      AES Encryption Standard <ExternalLink className="h-3 w-3" />
                    </a>
                    <a 
                      href="https://en.wikipedia.org/wiki/End-to-end_encryption" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      End-to-End Encryption <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Web Technologies</h4>
                  <div className="space-y-2">
                    <a 
                      href="https://developer.mozilla.org/en-US/docs/Web/API/URL/hash" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      URL Hash/Fragment <ExternalLink className="h-3 w-3" />
                    </a>
                    <a 
                      href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      Local Storage API <ExternalLink className="h-3 w-3" />
                    </a>
                    <a 
                      href="https://en.wikipedia.org/wiki/Client-side_encryption" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      Client-Side Encryption <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Open Source */}
          <Card className="mt-8 border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <Shield className="h-5 w-5" />
                Open Source & Transparent
              </CardTitle>
              <CardDescription>
                Full transparency through open source code - audit the security yourself
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  SecretShare is completely open source, meaning you can review every line of code that handles your secrets. 
                  This transparency ensures there are no hidden backdoors, logging mechanisms, or security vulnerabilities.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-600">✓</span>
                    <span>100% transparent code</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-600">✓</span>
                    <span>Community auditable</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-600">✓</span>
                    <span>No hidden functionality</span>
                  </div>
                </div>
                <div className="pt-2">
                  <Button asChild variant="outline" size="sm">
                    <a 
                      href="https://github.com/PaulSenon/PROJ-9084-share-secret-saas" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      View Source Code
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href="/">
                Start Sharing Secrets Securely
              </Link>
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              Built with Next.js, Convex, and end-to-end encryption
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Lock className="h-3 w-3" />
                Zero-knowledge
              </span>
              <span className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Client-side encryption
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}