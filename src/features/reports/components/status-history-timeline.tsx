import type { StatusHistoryResponse } from "@/features/reports/types/reports-types";
import { ReportStatusBadge } from "@/features/reports/components/report-status-badge";

export function StatusHistoryTimeline({
  history,
}: {
  history: StatusHistoryResponse[];
}) {
  if (history.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Ainda sem mudanças de estado.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {history.map((entry) => (
        <div key={entry.id} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="size-2 rounded-full bg-primary" />
            <div className="w-px flex-1 bg-border" />
          </div>
          <div className="flex-1 pb-4">
            <div className="flex items-center gap-2 text-sm">
              <ReportStatusBadge status={entry.previousStatus} />
              <span className="text-muted-foreground">→</span>
              <ReportStatusBadge status={entry.newStatus} />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {entry.changedBy.name} ·{" "}
              {new Date(entry.createdAt).toLocaleString("pt-PT")}
            </p>
            {entry.note && <p className="mt-1 text-sm">{entry.note}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
