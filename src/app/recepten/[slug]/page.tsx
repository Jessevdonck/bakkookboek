import { ArrowLeft, Lightbulb } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IngredientList } from "@/components/IngredientList";
import { MachineSettingsPanel } from "@/components/MachineSettingsPanel";
import { PrintButton } from "@/components/PrintButton";
import { categoryIcons } from "@/lib/category-icons";
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

  const Icon = categoryIcons[recipe.category];

  return (
    <article className="flex flex-col gap-8">
      <div className="no-print flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-accent"
        >
          <ArrowLeft className="size-4" />
          Alle recepten
        </Link>
        <PrintButton />
      </div>

      <div>
        <span className="flex w-fit items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent">
          <Icon className="size-3.5" />
          {recipe.category}
        </span>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {recipe.title}
        </h1>
        {recipe.description && (
          <p className="mt-3 max-w-2xl text-muted">{recipe.description}</p>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_18rem] lg:items-start">
        <div className="flex flex-col gap-6">
          <IngredientList title="In de gistdispenser" ingredients={[recipe.yeast]} />
          <IngredientList
            title="In het bakblik"
            note={recipe.panNote}
            ingredients={recipe.panIngredients}
          />
        </div>

        <div className="flex flex-col gap-4 lg:sticky lg:top-24">
          <MachineSettingsPanel machine={recipe.machine} />
          {recipe.tip && (
            <div className="flex gap-3 rounded-2xl border border-border bg-accent-soft p-5 text-sm">
              <Lightbulb className="size-5 shrink-0 text-accent" />
              <div>
                <p className="font-display font-semibold text-accent">Tip</p>
                <p className="mt-1 text-foreground">{recipe.tip}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
