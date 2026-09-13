"use client";

import { BookOpen, House } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Recepten", icon: House },
  { href: "/instructies", label: "Gebruiksaanwijzing", icon: BookOpen },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 text-sm font-medium">
      {links.map((link) => {
        const isActive = pathname === link.href;
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive ? "page" : undefined}
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-2 transition-colors sm:px-3 sm:py-1.5 ${
              isActive
                ? "bg-accent-soft text-accent"
                : "text-muted hover:bg-surface-hover hover:text-foreground"
            }`}
          >
            <Icon className="size-4 shrink-0" />
            {/* Icon-only on narrow screens (keeps the header on one line
                without truncating); label appears from sm/640px up. */}
            <span className="sr-only sm:not-sr-only">{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
