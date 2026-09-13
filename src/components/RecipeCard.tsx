import Link from "next/link";
import type { Recipe } from "@/types/recipe";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link
      href={`/recepten/${recipe.slug}`}
      className="group flex flex-col gap-2 rounded-2xl border border-card-border bg-card p-5 transition-shadow hover:shadow-md hover:shadow-black/5"
    >
      <span className="w-fit rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent">
        {recipe.category}
      </span>
      <h2 className="font-display text-lg font-semibold leading-snug group-hover:text-accent">
        {recipe.title}
      </h2>
      {recipe.description && (
        <p className="line-clamp-2 text-sm text-muted">{recipe.description}</p>
      )}
      <p className="mt-1 text-xs text-muted">Menu {recipe.machine.menu}</p>
    </Link>
  );
}
