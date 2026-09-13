"use server";

import { createFile, fileExists } from "@/lib/github-content";
import { recipeToYaml, type RecipeInput } from "@/lib/recipe-yaml";
import { slugify } from "@/lib/slugify";

export type AddRecipeResult =
  | { ok: true; slug: string }
  | { ok: false; error: string };

/**
 * Validates a recipe submitted through the /admin form, then commits it
 * as a new content/recipes/<slug>.yaml file straight to GitHub. That push
 * triggers a normal redeploy — no database, no extra moving parts.
 */
export async function addRecipe(
  password: string,
  input: RecipeInput,
): Promise<AddRecipeResult> {
  if (!process.env.ADMIN_PASSWORD) {
    return { ok: false, error: "ADMIN_PASSWORD is niet ingesteld op de server." };
  }
  if (password !== process.env.ADMIN_PASSWORD) {
    return { ok: false, error: "Wachtwoord klopt niet." };
  }

  const title = input.title.trim();
  if (!title) return { ok: false, error: "Titel is verplicht." };
  if (!input.yeast.amount.trim() || !input.yeast.item.trim()) {
    return { ok: false, error: "Gist (hoeveelheid en naam) is verplicht." };
  }
  const panIngredients = input.panIngredients.filter(
    (i) => i.amount.trim() && i.item.trim(),
  );
  if (panIngredients.length === 0) {
    return { ok: false, error: "Voeg minstens één bakblik-ingrediënt toe." };
  }
  if (!input.machine.menu.trim()) {
    return { ok: false, error: "Menu-instelling is verplicht." };
  }

  const slug = slugify(title);
  if (!slug) {
    return { ok: false, error: "Kon geen geldige bestandsnaam afleiden uit de titel." };
  }
  const path = `content/recipes/${slug}.yaml`;

  try {
    if (await fileExists(path)) {
      return {
        ok: false,
        error: `Er bestaat al een recept met een vergelijkbare titel (${slug}.yaml). Kies een andere titel.`,
      };
    }

    const yaml = recipeToYaml({ ...input, title, panIngredients });
    await createFile(path, yaml, `Recept toevoegen: ${title}`);

    return { ok: true, slug };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Onbekende fout bij het opslaan.",
    };
  }
}
