import type { Metadata } from "next";
import { machineIntro, machineModel, usageSteps } from "@/data/general-info";

export const metadata: Metadata = {
  title: "Gebruiksaanwijzing — Bakkookboek",
  description: `Algemene gebruiksaanwijzing voor de ${machineModel}.`,
};

export default function InstructiesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Algemene Gebruiksaanwijzing
        </h1>
        <p className="mt-2 text-sm font-medium text-accent">Mijn {machineModel}</p>
        <p className="mt-3 max-w-2xl text-muted">{machineIntro}</p>
      </div>

      <ol className="flex flex-col gap-4">
        {usageSteps.map((step, index) => (
          <li
            key={step.title}
            className="flex gap-4 rounded-2xl border border-card-border bg-card p-5"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-display text-sm font-semibold text-accent-foreground">
              {index + 1}
            </span>
            <div>
              <h2 className="font-display font-semibold">{step.title}</h2>
              <p className="mt-1 text-sm text-muted">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
