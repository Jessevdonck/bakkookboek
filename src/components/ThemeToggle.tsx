"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  // Undefined until mounted, so we render nothing on the server and avoid
  // a hydration mismatch with the inline theme-init script.
  const [isDark, setIsDark] = useState<boolean>();

  useEffect(() => {
    // One-time sync with the DOM class the inline theme-init script (see
    // ThemeScript) already applied before hydration — not state that
    // changes from within React, so this can't cascade.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Wissel tussen licht en donker thema"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {isDark === undefined ? null : isDark ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}
