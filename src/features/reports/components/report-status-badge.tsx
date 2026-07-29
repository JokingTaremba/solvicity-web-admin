import { Badge } from "@/shared/components/ui/badge";
import type { ReportStatus } from "@/features/reports/types/reports-types";

const statusConfig: Record<
  ReportStatus,
  {
    label: string;
    variant: "default" | "secondary" | "outline" | "destructive";
  }
> = {
  PENDING: { label: "Pendente", variant: "outline" },
  UNDER_REVIEW: { label: "Em análise", variant: "secondary" },
  IN_PROGRESS: { label: "Em progresso", variant: "default" },
  COMPLETED: { label: "Concluído", variant: "secondary" },
  REJECTED: { label: "Rejeitado", variant: "destructive" },
};

export function ReportStatusBadge({ status }: { status: ReportStatus }) {
  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
