import { useDeleteReport } from "@/features/reports/hooks/use-reports";
import type { ReportSummaryResponse } from "@/features/reports/types/reports-types";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/shared/components/ui/alert-dialog";

interface DeleteReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  report: ReportSummaryResponse | null;
}

export function DeleteReportDialog({
  open,
  onOpenChange,
  report,
}: DeleteReportDialogProps) {
  const deleteMutation = useDeleteReport();
  const canDelete = report?.status === "PENDING";

  function handleConfirm() {
    if (!report) return;
    deleteMutation.mutate(report.id, { onSuccess: () => onOpenChange(false) });
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apagar report?</AlertDialogTitle>
          <AlertDialogDescription>
            {canDelete
              ? `Vais apagar o report "${report?.title}". Esta acção não pode ser desfeita.`
              : "Este report já não está pendente — não pode ser apagado."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          {canDelete && (
            <AlertDialogAction
              onClick={handleConfirm}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "A apagar..." : "Apagar"}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
