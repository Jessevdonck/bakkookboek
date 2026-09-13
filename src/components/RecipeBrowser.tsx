"use client";

import { useState } from "react";
import { CategoryFilter } from "@/components/CategoryFilter";
import { RecipeCard } from "@/components/RecipeCard";
import type { Category, Recipe } from "@/types/recipe";

/** Client-side category filter over an already-loaded recipe list. */
export function RecipeBrowser({
  recipes,
  categories,
}: {
  recipes: Recipe[];
  categories: Category[];
}) {
  const [active, setActive] = useState<Category | undefined>(undefined);
  const visible = recipes.filter((recipe) => !active || recipe.category === active);

  return (
    <div className="flex flex-col gap-6">
      <CategoryFilter categories={categories} active={active} onSelect={setActive} />
      <div className="grid gap-4 sm:grid-cols-2">
        {visible.map((recipe) => (
          <RecipeCard key={recipe.slug} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
