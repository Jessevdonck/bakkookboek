"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:border-accent/50 hover:text-foreground"
    >
      <Printer className="size-4" />
      Printen
    </button>
  );
}
