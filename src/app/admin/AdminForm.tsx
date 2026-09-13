"use client";

import { Loader2, Minus, Plus } from "lucide-react";
import { useState } from "react";
import type { Category } from "@/types/recipe";
import { addRecipe } from "./actions";

const CATEGORIES: Category[] = ["Wit brood", "Volkoren", "Rogge", "Spelt", "Meergranen"];

type IngredientRow = { amount: string; item: string; note: string };
const emptyRow = (): IngredientRow => ({ amount: "", item: "", note: "" });

type Status = { kind: "idle" } | { kind: "submitting" } | { kind: "error"; message: string } | { kind: "success"; slug: string };

export function AdminForm() {
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category>("Wit brood");
  const [description, setDescription] = useState("");
  const [yeast, setYeast] = useState<IngredientRow>(emptyRow());
  const [panNote, setPanNote] = useState("");
  const [panIngredients, setPanIngredients] = useState<IngredientRow[]>([
    emptyRow(),
    emptyRow(),
    emptyRow(),
  ]);
  const [menu, setMenu] = useState("");
  const [size, setSize] = useState("");
  const [crust, setCrust] = useState("");
  const [machineNote, setMachineNote] = useState("");
  const [tip, setTip] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  function updatePanIngredient(index: number, field: keyof IngredientRow, value: string) {
    setPanIngredients((rows) =>
      rows.map((row, i) => (i === index ? { ...row, [field]: value } : row)),
    );
  }

  function addPanIngredientRow() {
    setPanIngredients((rows) => [...rows, emptyRow()]);
  }

  function removePanIngredientRow(index: number) {
    setPanIngredients((rows) => rows.filter((_, i) => i !== index));
  }

  function resetContentFields() {
    setTitle("");
    setDescription("");
    setYeast(emptyRow());
    setPanNote("");
    setPanIngredients([emptyRow(), emptyRow(), emptyRow()]);
    setMenu("");
    setSize("");
    setCrust("");
    setMachineNote("");
    setTip("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ kind: "submitting" });

    const result = await addRecipe(password, {
      title,
      category,
      description: description.trim() || undefined,
      yeast: { amount: yeast.amount, item: yeast.item, note: yeast.note.trim() || undefined },
      panNote: panNote.trim() || undefined,
      panIngredients: panIngredients
        .filter((row) => row.amount.trim() && row.item.trim())
        .map((row) => ({ amount: row.amount, item: row.item, note: row.note.trim() || undefined })),
      machine: {
        menu,
        size: size.trim() || undefined,
        crust: crust.trim() || undefined,
        note: machineNote.trim() || undefined,
      },
      tip: tip.trim() || undefined,
    });

    if (result.ok) {
      setStatus({ kind: "success", slug: result.slug });
      resetContentFields();
    } else {
      setStatus({ kind: "error", message: result.error });
    }
  }

  const isSubmitting = status.kind === "submitting";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <Field label="Wachtwoord" required>
        <TextInput
          type="password"
          value={password}
          onChange={setPassword}
          required
          autoComplete="off"
        />
      </Field>

      <Section title="Basis">
        <Field label="Titel" required>
          <TextInput value={title} onChange={setTitle} required placeholder="Frans Krokant Brood" />
        </Field>
        <Field label="Categorie" required>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className={inputClass}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Omschrijving" hint="optioneel, 1-2 zinnen">
          <TextArea value={description} onChange={setDescription} rows={2} />
        </Field>
      </Section>

      <Section title="Gistdispenser">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Field label="Hoeveelheid" required>
            <TextInput value={yeast.amount} onChange={(v) => setYeast({ ...yeast, amount: v })} required placeholder="5 g" />
          </Field>
          <Field label="Gist" required>
            <TextInput value={yeast.item} onChange={(v) => setYeast({ ...yeast, item: v })} required placeholder="Bruggeman gist" />
          </Field>
          <Field label="Extra info" hint="optioneel">
            <TextInput value={yeast.note} onChange={(v) => setYeast({ ...yeast, note: v })} />
          </Field>
        </div>
      </Section>

      <Section title="Bakblik">
        <Field label="Instructie vooraf" hint="optioneel, bv. 'Plaats eerst de roggekneedhaak!'">
          <TextInput value={panNote} onChange={setPanNote} />
        </Field>

        <div className="flex flex-col gap-3">
          {panIngredients.map((row, index) => (
            <div key={index} className="grid grid-cols-[1fr_1fr_1fr_auto] items-end gap-2">
              <Field label={index === 0 ? "Hoeveelheid" : undefined}>
                <TextInput
                  value={row.amount}
                  onChange={(v) => updatePanIngredient(index, "amount", v)}
                  placeholder="500 g"
                />
              </Field>
              <Field label={index === 0 ? "Ingrediënt" : undefined}>
                <TextInput
                  value={row.item}
                  onChange={(v) => updatePanIngredient(index, "item", v)}
                  placeholder="Aveve Surfina tarwebloem"
                />
              </Field>
              <Field label={index === 0 ? "Extra info" : undefined}>
                <TextInput value={row.note} onChange={(v) => updatePanIngredient(index, "note", v)} />
              </Field>
              <button
                type="button"
                onClick={() => removePanIngredientRow(index)}
                disabled={panIngredients.length <= 1}
                aria-label="Ingrediënt verwijderen"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-40"
              >
                <Minus className="size-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addPanIngredientRow}
          className="flex w-fit items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-accent"
        >
          <Plus className="size-4" />
          Ingrediënt toevoegen
        </button>
      </Section>

      <Section title="Machine-instellingen">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Field label="Menu" required>
            <TextInput value={menu} onChange={setMenu} required placeholder="1 (Basisbrood)" />
          </Field>
          <Field label="Formaat" hint="optioneel">
            <TextInput value={size} onChange={setSize} placeholder="L" />
          </Field>
          <Field label="Korst" hint="optioneel">
            <TextInput value={crust} onChange={setCrust} placeholder="Medium" />
          </Field>
        </div>
        <Field label="Opmerking" hint="optioneel, bv. baktijd">
          <TextInput value={machineNote} onChange={setMachineNote} />
        </Field>
      </Section>

      <Section title="Extra">
        <Field label="Baktip" hint="optioneel">
          <TextArea value={tip} onChange={setTip} rows={2} />
        </Field>
      </Section>

      {status.kind === "error" && (
        <p className="rounded-xl border border-accent/40 bg-accent-soft px-4 py-3 text-sm text-accent">
          {status.message}
        </p>
      )}
      {status.kind === "success" && (
        <p className="rounded-xl border border-accent/40 bg-accent-soft px-4 py-3 text-sm text-accent">
          Recept opgeslagen als <code>{status.slug}.yaml</code>. De site herbouwt
          automatisch — binnen ongeveer een minuut staat het live op /recepten/{status.slug}.
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover disabled:opacity-60"
      >
        {isSubmitting && <Loader2 className="size-4 animate-spin" />}
        Recept opslaan
      </button>
    </form>
  );
}

const inputClass =
  "w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-ring/20";

function TextInput({
  value,
  onChange,
  type = "text",
  ...rest
}: {
  value: string;
  onChange: (value: string) => void;
  type?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "type">) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={inputClass}
      {...rest}
    />
  );
}

function TextArea({
  value,
  onChange,
  rows = 3,
}: {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className={inputClass}
    />
  );
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      {label && (
        <span className="text-sm font-medium">
          {label}
          {required && <span className="text-accent"> *</span>}
          {hint && <span className="ml-1.5 font-normal text-muted">({hint})</span>}
        </span>
      )}
      {children}
    </label>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5">
      <legend className="px-1 font-display text-base font-semibold">{title}</legend>
      {children}
    </fieldset>
  );
}
