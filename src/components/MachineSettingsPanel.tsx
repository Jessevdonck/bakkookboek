import { Palette, Ruler, Settings2, type LucideIcon } from "lucide-react";
import type { MachineSettings } from "@/types/recipe";

export function MachineSettingsPanel({ machine }: { machine: MachineSettings }) {
  const rows: { label: string; value?: string; icon: LucideIcon }[] = [
    { label: "Menu", value: machine.menu, icon: Settings2 },
    { label: "Formaat", value: machine.size, icon: Ruler },
    { label: "Korst", value: machine.crust, icon: Palette },
  ].filter((row) => row.value);

  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <h3 className="font-display text-base font-semibold">Machine-instellingen</h3>
      <dl className="mt-3 flex flex-col divide-y divide-border">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4 py-2.5 text-sm first:pt-0 last:pb-0">
            <dt className="flex items-center gap-2 text-muted">
              <row.icon className="size-4" />
              {row.label}
            </dt>
            <dd className="text-right font-medium">{row.value}</dd>
          </div>
        ))}
      </dl>
      {machine.note && (
        <p className="mt-3 border-t border-border pt-3 text-sm text-muted">
          {machine.note}
        </p>
      )}
    </div>
  );
}
