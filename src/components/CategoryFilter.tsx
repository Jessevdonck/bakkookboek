import type { Category } from "@/types/recipe";

export function CategoryFilter({
  categories,
  active,
  onSelect,
}: {
  categories: Category[];
  active?: Category;
  onSelect: (category?: Category) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <FilterPill label="Alle recepten" isActive={!active} onClick={() => onSelect(undefined)} />
      {categories.map((category) => (
        <FilterPill
          key={category}
          label={category}
          isActive={active === category}
          onClick={() => onSelect(category)}
        />
      ))}
    </div>
  );
}

function FilterPill({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
        isActive
          ? "border-accent bg-accent text-accent-foreground"
          : "border-card-border bg-card text-muted hover:text-accent"
      }`}
    >
      {label}
    </button>
  );
}
