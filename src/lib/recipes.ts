import { recipes } from "@/data/recipes";
import type { Category, Recipe } from "@/types/recipe";

/** All recipes, sorted by their number in the original book. */
export function getAllRecipes(): Recipe[] {
  return [...recipes].sort((a, b) => a.number - b.number);
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return recipes.find((recipe) => recipe.slug === slug);
}

/** Distinct categories that are actually in use, in a fixed display order. */
export function getCategories(): Category[] {
  const order: Category[] = ["Wit brood", "Volkoren", "Rogge", "Spelt", "Meergranen"];
  const used = new Set(recipes.map((recipe) => recipe.category));
  return order.filter((category) => used.has(category));
}

export function getRecipesByCategory(category: Category): Recipe[] {
  return getAllRecipes().filter((recipe) => recipe.category === category);
}
