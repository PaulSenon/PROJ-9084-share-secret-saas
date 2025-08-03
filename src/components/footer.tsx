import Link from "next/link";
import { Github, ExternalLink, HelpCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background/50 border-border/50 mt-auto border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/how-it-works"
              className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
            >
              <HelpCircle className="h-4 w-4" />
              How it works
            </Link>
            <a
              href="https://github.com/PaulSenon/PROJ-9084-share-secret-saas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
            >
              <Github className="h-4 w-4" />
              Source
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <p className="text-muted-foreground text-xs">
            Built with privacy in mind © 2025
          </p>
        </div>
      </div>
    </footer>
  );
}
