import { useState } from "react";

import { useChangeReportStatus } from "@/features/reports/hooks/use-reports";
import {
  REPORT_STATUS_TRANSITIONS,
  type ReportStatus,
  type ReportSummaryResponse,
} from "@/features/reports/types/reports-types";
import { ReportStatusBadge } from "@/features/reports/components/report-status-badge";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/components/ui/dialog";
import { statusButtonStyles } from "./status-button-style";

const statusLabels: Record<ReportStatus, string> = {
  PENDING: "Pendente",
  UNDER_REVIEW: "Em análise",
  IN_PROGRESS: "Em progresso",
  COMPLETED: "Concluído",
  REJECTED: "Rejeitado",
};

interface ChangeStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  report: ReportSummaryResponse | null;
}

export function ChangeStatusDialog({
  open,
  onOpenChange,
  report,
}: ChangeStatusDialogProps) {
  const [note, setNote] = useState("");
  const changeStatusMutation = useChangeReportStatus();

  const availableTransitions = report
    ? REPORT_STATUS_TRANSITIONS[report.status]
    : [];

  function handleChange(newStatus: ReportStatus) {
    if (!report) return;
    changeStatusMutation.mutate(
      { id: report.id, request: { newStatus, note: note || undefined } },
      {
        onSuccess: () => {
          setNote("");
          onOpenChange(false);
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mudar estado do report</DialogTitle>
          <DialogDescription>
            "{report?.title}" - estado actual:{" "}
            {report && <ReportStatusBadge status={report.status} />}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="note" className="text-sm font-medium">
              Nota (opcional)
            </label>
            <Textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Motivo da mudança de estado..."
            />
          </div>

          {availableTransitions.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Este report está num estado final, não pode transitar para outro
              estado.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">Novo estado</p>
              <div className="flex flex-wrap gap-2">
                {availableTransitions.map((status) => (
                  <Button
                    key={status}
                    size="sm"
                    type="button"
                    variant="outline"
                    className={statusButtonStyles[status]}
                    disabled={changeStatusMutation.isPending}
                    onClick={() => handleChange(status)}
                  >
                    {statusLabels[status]}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
