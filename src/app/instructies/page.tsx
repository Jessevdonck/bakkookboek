import { CircleDot, ListOrdered, Play, Wheat } from "lucide-react";
import type { Metadata } from "next";
import { machineIntro, machineModel, usageSteps } from "@/data/general-info";

export const metadata: Metadata = {
  title: "Gebruiksaanwijzing — Bakkookboek",
  description: `Algemene gebruiksaanwijzing voor de ${machineModel}.`,
};

const stepIcons = [CircleDot, Wheat, ListOrdered, Play];

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

      <ol className="relative flex flex-col gap-6 border-l border-border pl-8 sm:pl-10">
        {usageSteps.map((step, index) => {
          const Icon = stepIcons[index % stepIcons.length];
          return (
            <li key={step.title} className="relative">
              <span className="absolute -left-[2.6rem] flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground sm:-left-[3.15rem]">
                <Icon className="size-4" />
              </span>
              <h2 className="font-display font-semibold">
                {index + 1}. {step.title}
              </h2>
              <p className="mt-1 text-sm text-muted">{step.description}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
