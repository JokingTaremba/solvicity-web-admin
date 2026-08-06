import { fetchUsers } from "@/features/users/api/users-api";
import type {
  UserResponse,
  UserFilterParams,
  UserRole,
} from "@/features/users/types/users-types";
import { fetchAllPages } from "@/shared/utils/export/fetch-all-pages";
import type { ExportColumn } from "@/shared/utils/export/export-data";

const roleLabels: Record<UserRole, string> = {
  COMMON: "Cidadão",
  ADMIN: "Admin",
  SUPERADMIN: "Superadmin",
};

export const userExportColumns: ExportColumn<UserResponse>[] = [
  { header: "Nome", accessor: (u) => u.name },
  { header: "Email", accessor: (u) => u.email },
  { header: "Telefone", accessor: (u) => u.phone ?? "—" },
  { header: "Role", accessor: (u) => roleLabels[u.role] },
  { header: "Estado", accessor: (u) => (u.isActive ? "Activo" : "Inactivo") },
  {
    header: "Registado em",
    accessor: (u) => new Date(u.createdAt).toLocaleDateString("pt-PT"),
  },
];

export function fetchUsersForExport(
  filters: Pick<UserFilterParams, "name" | "role">,
) {
  return fetchAllPages(fetchUsers, {
    name: filters.name,
    role: filters.role,
    sortBy: "createdAt",
    sortDirection: "DESC",
  });
}
