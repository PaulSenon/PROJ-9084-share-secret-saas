"use client";

import Link from "next/link";
import { Shield, Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ThemeToggle } from "~/components/theme-toggle";

export function Header() {
  return (
    <header className="bg-background/80 sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <Link
            href="/"
            className="text-foreground hover:text-muted-foreground flex items-center gap-2 transition-colors"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/20">
              <Shield className="h-4 w-4 text-emerald-400" />
            </div>
            <span className="font-medium">SecretShare</span>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Secret
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
