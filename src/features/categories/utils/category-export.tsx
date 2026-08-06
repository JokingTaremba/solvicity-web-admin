import { fetchCategories } from "@/features/categories/api/categories-api";
import type {
  CategoryResponse,
  CategoryFilterParams,
} from "@/features/categories/types/categories-types";
import { fetchAllPages } from "@/shared/utils/export/fetch-all-pages";
import type { ExportColumn } from "@/shared/utils/export/export-data";

export const categoryExportColumns: ExportColumn<CategoryResponse>[] = [
  { header: "Nome", accessor: (c) => c.name },
  { header: "Estado", accessor: (c) => (c.isActive ? "Activa" : "Inactiva") },
  {
    header: "Criado em",
    accessor: (c) => new Date(c.createdAt).toLocaleDateString("pt-PT"),
  },
];

export function fetchCategoriesForExport(
  filters: Pick<CategoryFilterParams, "name">,
) {
  return fetchAllPages(fetchCategories, {
    name: filters.name,
    sortBy: "name",
    sortDirection: "ASC",
  });
}
