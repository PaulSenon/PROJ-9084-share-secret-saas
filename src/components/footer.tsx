import Link from "next/link";
import { Shield, Github, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background/50 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-emerald-500/20 border border-emerald-500/30 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="font-medium text-foreground">SecretShare</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Zero-knowledge, ephemeral secret sharing with client-side encryption. 
              Your data never touches our servers in plaintext.
            </p>
          </div>

          {/* Privacy & Security */}
          <div>
            <h3 className="font-medium text-foreground mb-4">Privacy & Security</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-emerald-400">✓</span>
                <span>End-to-end AES-256-GCM encryption</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-emerald-400">✓</span>
                <span>Zero-knowledge architecture</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-emerald-400">✓</span>
                <span>One-time access, automatic deletion</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-emerald-400">✓</span>
                <span>No data retention or logging</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-medium text-foreground mb-4">Resources</h3>
            <div className="space-y-3">
              <Link 
                href="/how-it-works" 
                className="block text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                How it works
              </Link>
              <a
                href="https://github.com/PaulSenon/PROJ-9084-share-secret-saas"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                <Github className="w-4 h-4" />
                Source Code
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://en.wikipedia.org/wiki/End-to-end_encryption"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Learn about E2E encryption
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2025 SecretShare. Built with privacy-first principles.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>No cookies</span>
            <span>•</span>
            <span>No analytics</span>
            <span>•</span>
            <span>No tracking</span>
          </div>
        </div>
      </div>
    </footer>
  );
}