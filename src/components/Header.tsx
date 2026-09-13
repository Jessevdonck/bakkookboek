import Link from "next/link";
import { Wheat } from "lucide-react";
import { NavLinks } from "@/components/NavLinks";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <Wheat className="size-4" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Bakkookboek
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <NavLinks />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
