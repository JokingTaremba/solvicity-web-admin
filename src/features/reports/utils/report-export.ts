import { fetchReports } from "@/features/reports/api/reports-api";
import type {
  ReportSummaryResponse,
  ReportFilterParams,
  ReportStatus,
} from "@/features/reports/types/reports-types";
import { fetchAllPages } from "@/shared/utils/export/fetch-all-pages";
import type { ExportColumn } from "@/shared/utils/export/export-data";

const statusLabels: Record<ReportStatus, string> = {
  PENDING: "Pendente",
  UNDER_REVIEW: "Em análise",
  IN_PROGRESS: "Em progresso",
  COMPLETED: "Concluído",
  REJECTED: "Rejeitado",
};

export const reportExportColumns: ExportColumn<ReportSummaryResponse>[] = [
  { header: "Título", accessor: (r) => r.title },
  { header: "Categoria", accessor: (r) => r.category.name },
  { header: "Estado", accessor: (r) => statusLabels[r.status] },
  { header: "Cidade", accessor: (r) => r.city ?? "—" },
  { header: "Utilizador", accessor: (r) => r.user.name },
  {
    header: "Criado em",
    accessor: (r) => new Date(r.createdAt).toLocaleDateString("pt-PT"),
  },
];

export function fetchReportsForExport(
  filters: Pick<ReportFilterParams, "title" | "status">,
) {
  return fetchAllPages(fetchReports, {
    title: filters.title,
    status: filters.status,
    sortBy: "createdAt",
    sortDirection: "DESC",
  });
}
