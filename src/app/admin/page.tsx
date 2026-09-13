import type { Metadata } from "next";
import { AdminForm } from "./AdminForm";

// Not meant to be found via search — it's reachable by anyone who knows
// the URL, but nothing happens without the password (see actions.ts).
export const metadata: Metadata = {
  title: "Recept toevoegen — Bakkookboek",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Recept toevoegen
        </h1>
        <p className="mt-2 max-w-2xl text-muted">
          Vul het formulier in en klik op opslaan. Het recept wordt
          rechtstreeks als bestand toegevoegd aan de site — geen code nodig.
        </p>
      </div>
      <AdminForm />
    </div>
  );
}
