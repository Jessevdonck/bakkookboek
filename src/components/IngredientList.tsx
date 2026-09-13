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
      <ul className="mt-2 flex flex-col gap-1.5">
        {ingredients.map((ingredient, index) => (
          <li key={index} className="flex gap-2 text-sm leading-relaxed">
            <span aria-hidden className="text-accent">
              •
            </span>
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
