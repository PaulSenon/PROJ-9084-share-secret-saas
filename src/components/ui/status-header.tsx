import { BookOpen } from "lucide-react";
import Link from "next/link";
import { cn } from "~/lib/utils";

export interface StatusHeaderProps {
  title: string;
  description: string;
  className?: string;
  showHowItWorksLink?: boolean;
}

export function StatusHeader({
  title,
  description,
  className,
  showHowItWorksLink = true,
}: StatusHeaderProps) {
  return (
    <div className={cn("mb-12 text-center", className)}>
      <h1 className="text-foreground mb-4 text-4xl font-light">{title}</h1>
      <p className="text-muted-foreground text-lg font-light">{description}</p>
      {showHowItWorksLink && (
        <div className="mt-4">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-1 text-sm text-emerald-400 transition-colors hover:underline"
          >
            <BookOpen className="h-3 w-3" />
            How does it work?
          </Link>
        </div>
      )}
    </div>
  );
}
