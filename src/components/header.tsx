"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock, Plus, BookOpen } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ThemeToggle } from "~/components/theme-toggle";
import { cn } from "~/lib/utils";

export function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isHowItWorksPage = pathname === "/how-it-works";

  return (
    <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link 
            href="/" 
            className="flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors"
          >
            <div className="w-8 h-8 bg-emerald-500/20 border border-emerald-500/30 rounded-lg flex items-center justify-center">
              <Lock className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="font-medium">SecretShare</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/how-it-works"
              className={cn(
                "flex items-center gap-2 text-sm transition-colors hover:text-foreground",
                isHowItWorksPage ? "text-foreground" : "text-muted-foreground"
              )}
            >
              <BookOpen className="w-4 h-4" />
              How it works
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {!isHomePage && (
              <Button asChild size="sm" variant="ghost">
                <Link href="/">
                  <Plus className="w-4 h-4 mr-2" />
                  New Secret
                </Link>
              </Button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}