import { Circle } from "lucide-react";
import type { Ingredient } from "@/types/recipe";

export function IngredientList({
  title,
  note,
  ingredients,
}: {
  title: string;
  /** Optional prep instruction shown between the title and the list. */
  note?: string;
  ingredients: Ingredient[];
}) {
  return (
    <div>
      <h3 className="font-display text-base font-semibold">{title}</h3>
      {note && (
        <p className="mt-2 rounded-lg bg-accent-soft px-3 py-2 text-sm font-medium text-accent">
          {note}
        </p>
      )}
      <ul className="mt-3 flex flex-col divide-y divide-border overflow-hidden rounded-xl border border-border">
        {ingredients.map((ingredient, index) => (
          <li
            key={index}
            className="flex items-start gap-2.5 bg-surface px-4 py-3 text-sm leading-relaxed"
          >
            <Circle className="mt-1 size-2 shrink-0 fill-accent text-accent" />
            <span>
              <span className="font-medium">{ingredient.amount}</span>{" "}
              {ingredient.item}
              {ingredient.note && (
                <span className="text-muted"> ({ingredient.note})</span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
