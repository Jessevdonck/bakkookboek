import { Leaf, Sprout, Wheat, type LucideIcon } from "lucide-react";
import type { Category } from "@/types/recipe";

/** One consistent icon per category, reused across cards, filters and detail pages. */
export const categoryIcons: Record<Category, LucideIcon> = {
  "Wit brood": Wheat,
  Volkoren: Sprout,
  Rogge: Leaf,
  Spelt: Sprout,
  Meergranen: Wheat,
};
