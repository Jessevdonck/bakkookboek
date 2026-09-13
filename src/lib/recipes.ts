import fs from "node:fs";
import path from "node:path";
import { load as loadYaml } from "js-yaml";
import type { Category, Recipe } from "@/types/recipe";

/**
 * Recipes live as plain YAML files in content/recipes/ so adding one
 * doesn't require touching any code — see content/recipes/_TEMPLATE.yaml.
 * This file only reads and validates them; it never needs editing when a
 * recipe is added.
 */
const RECIPES_DIR = path.join(process.cwd(), "content", "recipes");
const REQUIRED_FIELDS = ["title", "category", "yeast", "panIngredients", "machine"] as const;

function slugFromFilename(filename: string): string {
  return filename.replace(/\.ya?ml$/i, "");
}

function loadRecipeFile(filename: string): Recipe {
  const slug = slugFromFilename(filename);
  const raw = fs.readFileSync(path.join(RECIPES_DIR, filename), "utf8");

  let data: unknown;
  try {
    data = loadYaml(raw);
  } catch (cause) {
    throw new Error(
      `content/recipes/${filename} bevat ongeldige YAML. Vergelijk de opmaak met _TEMPLATE.yaml.`,
      { cause },
    );
  }

  if (!data || typeof data !== "object") {
    throw new Error(`content/recipes/${filename} is leeg of geen geldig recept.`);
  }

  const record = data as Record<string, unknown>;
  const missing = REQUIRED_FIELDS.filter((field) => record[field] == null);
  if (missing.length > 0) {
    throw new Error(
      `content/recipes/${filename} mist verplicht(e) veld(en): ${missing.join(", ")}.`,
    );
  }

  return { ...record, slug } as Recipe;
}

let cache: Recipe[] | null = null;

function loadAllRecipes(): Recipe[] {
  if (cache) return cache;

  const filenames = fs
    .readdirSync(RECIPES_DIR)
    .filter((name) => /\.ya?ml$/i.test(name) && !name.startsWith("_"));

  cache = filenames
    .map(loadRecipeFile)
    .sort((a, b) => a.title.localeCompare(b.title, "nl"));
  return cache;
}

/** All recipes, sorted alphabetically by title. */
export function getAllRecipes(): Recipe[] {
  return loadAllRecipes();
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return loadAllRecipes().find((recipe) => recipe.slug === slug);
}

/** Distinct categories that are actually in use, in a fixed display order. */
export function getCategories(): Category[] {
  const order: Category[] = ["Wit brood", "Volkoren", "Rogge", "Spelt", "Meergranen"];
  const used = new Set(loadAllRecipes().map((recipe) => recipe.category));
  return order.filter((category) => used.has(category));
}

export function getRecipesByCategory(category: Category): Recipe[] {
  return loadAllRecipes().filter((recipe) => recipe.category === category);
}
