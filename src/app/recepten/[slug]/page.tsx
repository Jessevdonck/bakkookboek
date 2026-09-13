import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IngredientList } from "@/components/IngredientList";
import { MachineSettingsPanel } from "@/components/MachineSettingsPanel";
import { getAllRecipes, getRecipeBySlug } from "@/lib/recipes";

export function generateStaticParams() {
  return getAllRecipes().map((recipe) => ({ slug: recipe.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/recepten/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) return {};
  return {
    title: `${recipe.title} — Bakkookboek`,
    description: recipe.description,
  };
}

export default async function RecipePage({ params }: PageProps<"/recepten/[slug]">) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) notFound();

  return (
    <article className="flex flex-col gap-8">
      <div>
        <Link href="/" className="text-sm font-medium text-muted hover:text-accent">
          ← Alle recepten
        </Link>
        <span className="mt-4 block w-fit rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent">
          {recipe.category}
        </span>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {recipe.title}
        </h1>
        {recipe.description && (
          <p className="mt-3 max-w-2xl text-muted">{recipe.description}</p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-start">
        <div className="flex flex-col gap-6">
          <IngredientList
            title="In de gistdispenser"
            ingredients={[recipe.yeast]}
          />
          <IngredientList
            title="In het bakblik"
            note={recipe.panNote}
            ingredients={recipe.panIngredients}
          />
        </div>

        <div className="flex w-full flex-col gap-4 sm:w-72">
          <MachineSettingsPanel machine={recipe.machine} />
          {recipe.tip && (
            <div className="rounded-2xl border border-card-border bg-accent-soft p-5 text-sm">
              <p className="font-display font-semibold text-accent">Tip</p>
              <p className="mt-1 text-foreground">{recipe.tip}</p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
