"use client";

import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { CategoryFilter } from "@/components/CategoryFilter";
import { RecipeCard } from "@/components/RecipeCard";
import type { Category, Recipe } from "@/types/recipe";

/** Client-side search + category filter over an already-loaded recipe list. */
export function RecipeBrowser({
  recipes,
  categories,
}: {
  recipes: Recipe[];
  categories: Category[];
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Category | undefined>(undefined);

  const byCategory = useMemo(
    () => (active ? recipes.filter((r) => r.category === active) : recipes),
    [recipes, active],
  );

  const normalizedQuery = query.trim().toLowerCase();
  const visible = useMemo(() => {
    if (!normalizedQuery) return byCategory;
    return byCategory.filter((recipe) => matchesQuery(recipe, normalizedQuery));
  }, [byCategory, normalizedQuery]);

  const categoryOptions = categories.map((category) => ({
    category,
    count: recipes.filter((r) => r.category === category).length,
  }));

  return (
    <div className="flex flex-col gap-5">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Zoek op naam of ingrediënt..."
          className="w-full rounded-xl border border-border bg-surface py-2.5 pl-10 pr-10 text-sm outline-none transition-colors placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-ring/20"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Zoekopdracht wissen"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      <CategoryFilter categories={categoryOptions} active={active} onSelect={setActive} />

      {visible.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      ) : (
        <EmptyState
          query={query}
          onReset={() => {
            setQuery("");
            setActive(undefined);
          }}
        />
      )}
    </div>
  );
}

function matchesQuery(recipe: Recipe, query: string) {
  const haystack = [
    recipe.title,
    recipe.description,
    recipe.category,
    recipe.yeast.item,
    ...recipe.panIngredients.map((i) => i.item),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

function EmptyState({ query, onReset }: { query: string; onReset: () => void }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border py-16 text-center">
      <p className="font-medium">Geen recepten gevonden{query && ` voor "${query}"`}</p>
      <p className="text-sm text-muted">Probeer een andere zoekterm of categorie.</p>
      <button
        type="button"
        onClick={onReset}
        className="mt-1 text-sm font-medium text-accent hover:underline"
      >
        Toon alle recepten
      </button>
    </div>
  );
}
