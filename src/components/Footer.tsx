import { machineModel } from "@/data/general-info";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-muted sm:px-6">
        Recepten op maat van {machineModel} &middot; Aveve ingrediënten
      </div>
    </footer>
  );
}
