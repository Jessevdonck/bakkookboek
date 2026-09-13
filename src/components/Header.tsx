import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-card-border bg-card/60 backdrop-blur">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-4 py-5 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden>
            🍞
          </span>
          <span className="font-display text-xl font-semibold tracking-tight">
            Bakkookboek
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium text-muted">
          <Link href="/" className="transition-colors hover:text-accent">
            Recepten
          </Link>
          <Link href="/instructies" className="transition-colors hover:text-accent">
            Gebruiksaanwijzing
          </Link>
        </nav>
      </div>
    </header>
  );
}
