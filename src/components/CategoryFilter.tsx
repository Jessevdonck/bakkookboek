import { categoryIcons } from "@/lib/category-icons";
import type { Category } from "@/types/recipe";

export function CategoryFilter({
  categories,
  active,
  onSelect,
}: {
  categories: { category: Category; count: number }[];
  active?: Category;
  onSelect: (category?: Category) => void;
}) {
  const total = categories.reduce((sum, c) => sum + c.count, 0);

  return (
    <div className="scrollbar-thin -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
      <FilterPill label="Alle recepten" count={total} isActive={!active} onClick={() => onSelect(undefined)} />
      {categories.map(({ category, count }) => (
        <FilterPill
          key={category}
          label={category}
          count={count}
          icon={categoryIcons[category]}
          isActive={active === category}
          onClick={() => onSelect(category)}
        />
      ))}
    </div>
  );
}

function FilterPill({
  label,
  count,
  icon: Icon,
  isActive,
  onClick,
}: {
  label: string;
  count: number;
  icon?: (typeof categoryIcons)[Category];
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors sm:py-1.5 ${
        isActive
          ? "border-accent bg-accent text-accent-foreground"
          : "border-border bg-surface text-muted hover:border-accent/50 hover:text-foreground"
      }`}
    >
      {Icon && <Icon className="size-3.5" />}
      {label}
      <span className={isActive ? "text-accent-foreground/70" : "text-muted/70"}>
        {count}
      </span>
    </button>
  );
}
