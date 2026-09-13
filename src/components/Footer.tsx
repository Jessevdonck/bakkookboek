import { machineModel } from "@/data/general-info";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-card-border">
      <div className="mx-auto max-w-4xl px-4 py-6 text-sm text-muted sm:px-6">
        Recepten op maat van {machineModel} &middot; Aveve ingrediënten
      </div>
    </footer>
  );
}
