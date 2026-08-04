import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import type { UserRole } from "@/features/users/types/users-types";

const roleOptions: { value: UserRole; label: string }[] = [
  { value: "COMMON", label: "Cidadão" },
  { value: "ADMIN", label: "Admin" },
  { value: "SUPERADMIN", label: "Superadmin" },
];

interface UserFiltersProps {
  nameFilter: string;
  onNameFilterChange: (value: string) => void;
  roleFilter: UserRole | "ALL";
  onRoleFilterChange: (value: UserRole | "ALL") => void;
}

export function UserFilters({
  nameFilter,
  onNameFilterChange,
  roleFilter,
  onRoleFilterChange,
}: UserFiltersProps) {
  return (
    <div className="flex items-center gap-3">
      <Input
        placeholder="Pesquisar por nome..."
        value={nameFilter}
        onChange={(e) => onNameFilterChange(e.target.value)}
        className="w-64"
      />
      <Select
        value={roleFilter}
        onValueChange={(value) => {
          if (value) onRoleFilterChange(value as UserRole | "ALL");
        }}
      >
        <SelectTrigger className="w-44">
          <SelectValue>
            {roleFilter === "ALL"
              ? "Todas as roles"
              : roleOptions.find((r) => r.value === roleFilter)?.label}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">Todas as roles</SelectItem>
          {roleOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
