import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import type { ReportStatus } from "@/features/reports/types/reports-types";

const statusOptions: { value: ReportStatus; label: string }[] = [
  { value: "PENDING", label: "Pendente" },
  { value: "UNDER_REVIEW", label: "Em análise" },
  { value: "IN_PROGRESS", label: "Em progresso" },
  { value: "COMPLETED", label: "Concluído" },
  { value: "REJECTED", label: "Rejeitado" },
];

interface ReportFiltersProps {
  titleFilter: string;
  onTitleFilterChange: (value: string) => void;
  statusFilter: ReportStatus | "ALL";
  onStatusFilterChange: (value: ReportStatus | "ALL") => void;
}

export function ReportFilters({
  titleFilter,
  onTitleFilterChange,
  statusFilter,
  onStatusFilterChange,
}: ReportFiltersProps) {
  return (
    <div className="flex items-center gap-3">
      <Input
        placeholder="Pesquisar por título..."
        value={titleFilter}
        onChange={(e) => onTitleFilterChange(e.target.value)}
        className="w-64"
      />
      <Select
        value={statusFilter}
        onValueChange={(value) => {
          if (value) onStatusFilterChange(value as ReportStatus | "ALL");
        }}
      >
        <SelectTrigger className="w-48">
          <SelectValue>
            {statusFilter === "ALL"
              ? "Todos os estados"
              : statusOptions.find((option) => option.value === statusFilter)
                  ?.label}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">Todos os estados</SelectItem>
          {statusOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
