import { RecipeBrowser } from "@/components/RecipeBrowser";
import { getAllRecipes, getCategories } from "@/lib/recipes";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Mijn Panasonic Bakkookboek
        </h1>
        <p className="mt-2 max-w-2xl text-muted">
          Ambachtelijke broodrecepten op maat van Aveve ingrediënten voor de
          SD-YR2550SXE.
        </p>
      </div>

      <RecipeBrowser recipes={getAllRecipes()} categories={getCategories()} />
    </div>
  );
}
