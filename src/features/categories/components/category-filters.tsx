import { Input } from "@/shared/components/ui/input";

interface CategoryFiltersProps {
  nameFilter: string;
  onNameFilterChange: (value: string) => void;
}

export function CategoryFilters({
  nameFilter,
  onNameFilterChange,
}: CategoryFiltersProps) {
  return (
    <div className="flex items-center gap-3">
      <Input
        placeholder="Pesquisar por nome..."
        value={nameFilter}
        onChange={(e) => onNameFilterChange(e.target.value)}
        className="max-w-xs"
      />
    </div>
  );
}
