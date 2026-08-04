import { Input } from "@/shared/components/ui/input";

interface CommentFiltersProps {
  textFilter: string;
  onTextFilterChange: (value: string) => void;
}

export function CommentFilters({
  textFilter,
  onTextFilterChange,
}: CommentFiltersProps) {
  return (
    <div className="flex items-center gap-3">
      <Input
        placeholder="Pesquisar pelo comentário..."
        value={textFilter}
        onChange={(e) => onTextFilterChange(e.target.value)}
        className="w-64"
      />
    </div>
  );
}
