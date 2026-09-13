import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { categoryIcons } from "@/lib/category-icons";
import type { Recipe } from "@/types/recipe";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const Icon = categoryIcons[recipe.category];

  return (
    <Link
      href={`/recepten/${recipe.slug}`}
      className="group flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg hover:shadow-black/5"
    >
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent">
          <Icon className="size-3.5" />
          {recipe.category}
        </span>
        <ArrowRight className="size-4 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <h2 className="font-display text-lg font-semibold leading-snug group-hover:text-accent">
        {recipe.title}
      </h2>
      {recipe.description && (
        <p className="line-clamp-2 text-sm text-muted">{recipe.description}</p>
      )}
      <p className="mt-auto pt-1 text-xs font-medium text-muted">
        Menu {recipe.machine.menu}
      </p>
    </Link>
  );
}
