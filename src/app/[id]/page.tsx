import Link from "next/link";
import { ArrowLeft, Lock, HelpCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ThemeToggle } from "~/components/theme-toggle";
import { SecretViewer } from "~/components/secret-viewer";

interface SecretPageProps {
  params: Promise<{ id: string }>;
}

export default async function SecretPage({ params }: SecretPageProps) {
  const { id } = await params;
  
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
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/how-it-works">
                <HelpCircle className="mr-2 h-4 w-4" />
                How it works
              </Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Header - Minimal */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Secret
              <span className="text-primary"> Message</span>
            </h1>
            <p className="mx-auto max-w-xl text-lg text-muted-foreground">
              This message can only be viewed once.
            </p>
          </div>

          {/* Secret Viewer */}
          <div className="flex justify-center">
            <SecretViewer secretId={id} />
          </div>
        </div>
      </main>

      {/* Footer - Minimal */}
      <footer className="border-t bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <p className="text-sm text-muted-foreground">
              End-to-end encrypted • Zero-knowledge architecture
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Enable SSG for all secret pages
export function generateStaticParams() {
  return [];
}

export const dynamicParams = true;
