import type { Ingredient, Recipe } from "@/types/recipe";

/** Everything needed to write a recipe file, minus the slug (derived from the filename). */
export type RecipeInput = Omit<Recipe, "slug">;

/** Quotes a string as a YAML double-quoted scalar, escaping as needed. */
function q(value: string): string {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function indent(text: string, spaces: number): string {
  const pad = " ".repeat(spaces);
  return text
    .split("\n")
    .map((line) => (line ? pad + line : line))
    .join("\n");
}

/** `amount: "..."` / `item: "..."` / `note: "..."` on their own lines, unindented. */
function ingredientFields(ingredient: Ingredient): string {
  const lines = [`amount: ${q(ingredient.amount)}`, `item: ${q(ingredient.item)}`];
  if (ingredient.note) lines.push(`note: ${q(ingredient.note)}`);
  return lines.join("\n");
}

/** One `- amount: ...` block-sequence entry, with continuation lines aligned under it. */
function ingredientListItem(ingredient: Ingredient): string {
  return ingredientFields(ingredient)
    .split("\n")
    .map((line, i) => (i === 0 ? `- ${line}` : `  ${line}`))
    .join("\n");
}

/**
 * Hand-formats a recipe as YAML, matching the style of
 * content/recipes/_TEMPLATE.yaml — so a file created through the /admin
 * form looks identical to one someone wrote by hand.
 */
export function recipeToYaml(recipe: RecipeInput): string {
  const parts: string[] = [];

  parts.push(`title: ${q(recipe.title)}`);
  parts.push(`category: ${q(recipe.category)}`);
  if (recipe.description) parts.push(`description: ${q(recipe.description)}`);

  parts.push("", "yeast:");
  parts.push(indent(ingredientFields(recipe.yeast), 2));

  if (recipe.panNote) {
    parts.push("", `panNote: ${q(recipe.panNote)}`);
  }

  parts.push("", "panIngredients:");
  for (const ingredient of recipe.panIngredients) {
    parts.push(indent(ingredientListItem(ingredient), 2));
  }

  parts.push("", "machine:");
  parts.push(indent(`menu: ${q(recipe.machine.menu)}`, 2));
  if (recipe.machine.size) parts.push(indent(`size: ${q(recipe.machine.size)}`, 2));
  if (recipe.machine.crust) parts.push(indent(`crust: ${q(recipe.machine.crust)}`, 2));
  if (recipe.machine.note) parts.push(indent(`note: ${q(recipe.machine.note)}`, 2));

  if (recipe.tip) parts.push("", `tip: ${q(recipe.tip)}`);

  return parts.join("\n") + "\n";
}
