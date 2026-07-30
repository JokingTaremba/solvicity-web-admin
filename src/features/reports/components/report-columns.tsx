import type { ColumnDef } from "@tanstack/react-table";
import {
  MoreHorizontal,
  Pencil,
  RefreshCw,
  SquareMousePointer,
  Trash2,
} from "lucide-react";

import type { ReportSummaryResponse } from "@/features/reports/types/reports-types";
import { ReportStatusBadge } from "@/features/reports/components/report-status-badge";
import { DataTableColumnHeader } from "@/shared/components/data-table/data-table-column-header";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/shared/components/ui/dropdown-menu";
import { Badge } from "@/shared/components/ui/badge";

interface ReportColumnsProps {
  onEdit: (report: ReportSummaryResponse) => void;
  onDelete: (report: ReportSummaryResponse) => void;
  onChangeStatus: (report: ReportSummaryResponse) => void;
}

export function getReportColumns({
  onEdit,
  onDelete,
  onChangeStatus,
}: ReportColumnsProps): ColumnDef<ReportSummaryResponse>[] {
  return [
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Título" />
      ),
      cell: ({ row }) => (
        <span className="font-medium">{row.original.title}</span>
      ),
    },
    {
      id: "category",
      header: "Categoria",
      cell: ({ row }) => (
        <Badge variant="outline">{row.original.category.name}</Badge>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Estado" />
      ),
      cell: ({ row }) => <ReportStatusBadge status={row.original.status} />,
    },
    {
      id: "city",
      header: "Cidade",
      cell: ({ row }) => row.original.city ?? "—",
    },
    {
      id: "user",
      header: "Utilizador",
      cell: ({ row }) => row.original.user.name,
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Data" />
      ),
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {new Date(row.original.createdAt).toLocaleDateString("pt-PT")}
        </span>
      ),
    },
    {
      id: "actions",
      header: () => (
        <div className="flex justify-center">
          <SquareMousePointer className="size-4" />
        </div>
      ),
      cell: ({ row }) => {
        const report = row.original;
        return (
          <div
            className="flex justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="ghost" size="icon" />}
              >
                <MoreHorizontal className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onChangeStatus(report)}>
                  <RefreshCw className="size-4" />
                  Estado
                </DropdownMenuItem>
                {report.status === "PENDING" && (
                  <DropdownMenuItem onClick={() => onEdit(report)}>
                    <Pencil className="size-4" />
                    Editar
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => onDelete(report)}
                >
                  <Trash2 className="size-4" />
                  Apagar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
}
