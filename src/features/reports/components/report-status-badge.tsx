import { Badge } from "@/shared/components/ui/badge";
import type { ReportStatus } from "@/features/reports/types/reports-types";

const statusConfig: Record<
  ReportStatus,
  {
    label: string;
    variant: "warning" | "review" | "info" | "success" | "rejected";
  }
> = {
  PENDING: { label: "Pendente", variant: "warning" },
  UNDER_REVIEW: { label: "Em análise", variant: "review" },
  IN_PROGRESS: { label: "Em progresso", variant: "info" },
  COMPLETED: { label: "Concluído", variant: "success" },
  REJECTED: { label: "Rejeitado", variant: "rejected" },
};

export function ReportStatusBadge({ status }: { status: ReportStatus }) {
  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
