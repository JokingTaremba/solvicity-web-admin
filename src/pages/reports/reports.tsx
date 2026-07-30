import { useState } from "react";
import type { SortingState } from "@tanstack/react-table";

import { useReports } from "@/features/reports/hooks/use-reports";
import { ReportFilters } from "@/features/reports/components/report-filters";
import { getReportColumns } from "@/features/reports/components/report-columns";
import { ChangeStatusDialog } from "@/features/reports/components/change-status-dialog";
import { ReportEditDialog } from "@/features/reports/components/report-edit-dialog";
import { DeleteReportDialog } from "@/features/reports/components/delete-report-dialog";
import type {
  ReportStatus,
  ReportSummaryResponse,
} from "@/features/reports/types/reports-types";
import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import { ListPageShell } from "@/shared/components/layout/list-page-shell";
import { Navigate } from "@tanstack/react-router";

export function ReportsPage() {
  const [titleFilter, setTitleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<ReportStatus | "ALL">("ALL");
  const [page, setPage] = useState(0);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "createdAt", desc: true },
  ]);

  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedReport, setSelectedReport] =
    useState<ReportSummaryResponse | null>(null);

  const activeSort = sorting[0];

  const { data, isLoading, isError } = useReports({
    page,
    size: 20,
    title: titleFilter || undefined,
    status: statusFilter === "ALL" ? undefined : statusFilter,
    sortBy:
      (activeSort?.id as "createdAt" | "updatedAt" | "title" | "status") ??
      "createdAt",
    sortDirection: activeSort?.desc ? "DESC" : "ASC",
  });

  function openStatusDialog(report: ReportSummaryResponse) {
    setSelectedReport(report);
    setStatusDialogOpen(true);
  }

  function openEditDialog(report: ReportSummaryResponse) {
    setSelectedReport(report);
    setEditDialogOpen(true);
  }

  function openDeleteDialog(report: ReportSummaryResponse) {
    setSelectedReport(report);
    setDeleteDialogOpen(true);
  }

  const columns = getReportColumns({
    onEdit: openEditDialog,
    onDelete: openDeleteDialog,
    onChangeStatus: openStatusDialog,
  });

  return (
    <>
      <ListPageShell
        header={
          <div>
            <h1 className="text-2xl font-semibold">Reports</h1>
            <p className="text-muted-foreground">
              {data
                ? `${data.totalElements} ${data.totalElements === 1 ? "report" : "reports"}`
                : "A carregar..."}
            </p>
          </div>
        }
        filters={
          <ReportFilters
            titleFilter={titleFilter}
            onTitleFilterChange={(value) => {
              setTitleFilter(value);
              setPage(0);
            }}
            statusFilter={statusFilter}
            onStatusFilterChange={(value) => {
              setStatusFilter(value);
              setPage(0);
            }}
          />
        }
        footer={
          <DataTablePagination
            page={page}
            totalPages={data?.totalPages ?? 0}
            totalElements={data?.totalElements ?? 0}
            isLastPage={data?.last ?? true}
            onPageChange={setPage}
          />
        }
      >
        {isError && (
          <p className="p-4 text-sm text-destructive">
            Não foi possível carregar os reports.
          </p>
        )}
        <DataTable
          columns={columns}
          data={data?.content ?? []}
          isLoading={isLoading}
          emptyMessage="Nenhum report encontrado."
          sorting={sorting}
          onSortingChange={(updater) => {
            setSorting(updater);
            setPage(0);
          }}
          onRowClick={(report) =>
            Navigate({
              to: "/reports/$reportId",
              params: { reportId: report.id },
            })
          }
        />
      </ListPageShell>

      <ChangeStatusDialog
        open={statusDialogOpen}
        onOpenChange={setStatusDialogOpen}
        report={selectedReport}
      />
      <ReportEditDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        report={selectedReport}
      />
      <DeleteReportDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        report={selectedReport}
      />
    </>
  );
}
