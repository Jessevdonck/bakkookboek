/**
 * Core data shapes for the bread machine cookbook.
 *
 * Keep this file as the single source of truth for what a recipe looks
 * like. When you add a field here, TypeScript will point you to every
 * place that needs to handle it.
 *
 * The recipes themselves live as plain YAML files in content/recipes/
 * (see src/lib/recipes.ts for the loader) — no code editing required
 * to add one.
 */

/** A single ingredient line, e.g. "400 g Aveve Classic broodmix". */
export type Ingredient = {
  /** Quantity as printed in the book, e.g. "400 g", "1 eetlepel", "15-20 g". */
  amount: string;
  /** The ingredient itself, e.g. "Aveve Surfina tarwebloem". */
  item: string;
  /** Optional extra info, e.g. "optioneel, voor zachtere kruim". */
  note?: string;
};

/** Settings to punch into the bread machine's control panel. */
export type MachineSettings = {
  /** Menu number + name, e.g. "10 (Frans Brood)". */
  menu: string;
  /** Broodformaat, e.g. "M" or "L". */
  size?: string;
  /** Korstkleur, e.g. "Medium of Dark naar wens". */
  crust?: string;
  /** Any other remark tied to the machine settings (timing, quirks, ...). */
  note?: string;
};

/** A category used to group and filter recipes on the homepage. */
export type Category =
  | "Wit brood"
  | "Volkoren"
  | "Rogge"
  | "Spelt"
  | "Meergranen";

export type Recipe = {
  /**
   * URL-friendly unique id, e.g. "frans-krokant-brood". Derived from the
   * YAML file's name (content/recipes/frans-krokant-brood.yaml) — not a
   * field you set inside the file.
   */
  slug: string;
  title: string;
  category: Category;
  /** Short intro paragraph shown on the card and detail page. */
  description?: string;
  /** What goes in the automatic yeast dispenser. */
  yeast: Ingredient;
  /**
   * A prep step to call out before the ingredient list, e.g. "plaats
   * eerst de roggekneedhaak in het blik".
   */
  panNote?: string;
  /** What goes in the bread pan, in order. */
  panIngredients: Ingredient[];
  machine: MachineSettings;
  /** Optional baker's tip shown in a callout on the detail page. */
  tip?: string;
};
