import type { MachineSettings } from "@/types/recipe";

export function MachineSettingsPanel({ machine }: { machine: MachineSettings }) {
  const rows = [
    { label: "Menu", value: machine.menu },
    { label: "Formaat", value: machine.size },
    { label: "Korst", value: machine.crust },
  ].filter((row) => row.value);

  return (
    <div className="rounded-2xl border border-card-border bg-card p-5">
      <h3 className="font-display text-base font-semibold">Machine-instellingen</h3>
      <dl className="mt-3 flex flex-col gap-2">
        {rows.map((row) => (
          <div key={row.label} className="flex justify-between gap-4 text-sm">
            <dt className="text-muted">{row.label}</dt>
            <dd className="text-right font-medium">{row.value}</dd>
          </div>
        ))}
      </dl>
      {machine.note && (
        <p className="mt-3 border-t border-card-border pt-3 text-sm text-muted">
          {machine.note}
        </p>
      )}
    </div>
  );
}
