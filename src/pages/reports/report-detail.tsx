import { useState } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, MapPin, RefreshCw, Trash2 } from "lucide-react";

import { useReport } from "@/features/reports/hooks/use-reports";
import { ReportStatusBadge } from "@/features/reports/components/report-status-badge";
import { StatusHistoryTimeline } from "@/features/reports/components/status-history-timeline";
import { MediaGallery } from "@/features/reports/components/media-gallery";
import { CommentList } from "@/features/reports/components/comment-list";
import { ChangeStatusDialog } from "@/features/reports/components/change-status-dialog";
import { DeleteReportDialog } from "@/features/reports/components/delete-report-dialog";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/shared/components/ui/card";

export function ReportDetailPage() {
  const { reportId } = useParams({ from: "/_auth/reports/$reportId" });
  const navigate = useNavigate();
  const { data: report, isLoading, isError } = useReport(reportId);

  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  if (isLoading) {
    return <p className="p-8 text-sm text-muted-foreground">A carregar...</p>;
  }

  if (isError || !report) {
    return (
      <p className="p-8 text-sm text-destructive">
        Não foi possível carregar este report.
      </p>
    );
  }

  const canEditOrDelete = report.status === "PENDING";

  return (
    <div className="flex h-full flex-col gap-6 overflow-y-auto pb-8">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate({ to: "/reports" })}
          >
            <ArrowLeft className="size-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold">{report.title}</h1>
              <ReportStatusBadge status={report.status} />
            </div>
            <p className="text-sm text-muted-foreground">
              Reportado por {report.user.name} ·{" "}
              {new Date(report.createdAt).toLocaleString("pt-PT")}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setStatusDialogOpen(true)}>
            <RefreshCw className="size-4" />
            Mudar estado
          </Button>
          {canEditOrDelete && (
            <Button
              variant="outline"
              className="text-destructive"
              onClick={() => setDeleteDialogOpen(true)}
            >
              <Trash2 className="size-4" />
              Apagar
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Detalhes do report</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-sm leading-relaxed">
                {report.description || "Sem descrição fornecida."}
              </p>

              <div className="grid grid-cols-1 gap-4 border-t border-border pt-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    Imagens ({report.media.length})
                  </p>

                  <MediaGallery media={report.media} />
                </div>

                <div className="flex h-72 flex-col gap-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    Comentários ({report.comments.length})
                  </p>

                  <div className="flex-1 overflow-y-auto pr-1">
                    <CommentList comments={report.comments} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Detalhes</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Categoria</span>
                <Badge variant="outline">{report.category.name}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Última actualização
                </span>
                <span>
                  {new Date(report.updatedAt).toLocaleDateString("pt-PT")}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="size-4" />
                Morada
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p>
                {report.address.street}
                {report.address.number ? `, ${report.address.number}` : ""}
              </p>
              <p className="text-muted-foreground">{report.address.city}</p>
              {report.address.reference && (
                <p className="mt-2 text-muted-foreground">
                  {report.address.reference}
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Histórico de estado</CardTitle>
            </CardHeader>
            <CardContent>
              <StatusHistoryTimeline history={report.statusHistory} />
            </CardContent>
          </Card>
        </div>
      </div>

      <ChangeStatusDialog
        open={statusDialogOpen}
        onOpenChange={setStatusDialogOpen}
        report={report}
      />
      <DeleteReportDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        report={report}
      />
    </div>
  );
}
