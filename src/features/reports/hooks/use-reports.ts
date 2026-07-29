import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import {
  changeReportStatus,
  deleteReport,
  fetchReportById,
  fetchReports,
  updateReport,
} from "@/features/reports/api/reports-api";
import { getApiErrorMessage } from "@/shared/utils/api-error/api-error-message";
import type {
  ChangeStatusHistoryRequest,
  ReportFilterParams,
  UpdateReportRequest,
} from "@/features/reports/types/reports-types";

export function useReports(filters: ReportFilterParams) {
  return useQuery({
    queryKey: ["reports", filters],
    queryFn: () => fetchReports(filters),
    placeholderData: keepPreviousData,
  });
}

export function useReport(id: string | undefined) {
  return useQuery({
    queryKey: ["reports", id],
    queryFn: () => fetchReportById(id!),
    enabled: !!id,
  });
}

export function useUpdateReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      request,
    }: {
      id: string;
      request: UpdateReportRequest;
    }) => updateReport(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      toast.success("Report actualizado.");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useDeleteReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteReport(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      toast.success("Report apagado.");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useChangeReportStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      request,
    }: {
      id: string;
      request: ChangeStatusHistoryRequest;
    }) => changeReportStatus(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      toast.success("Estado do report actualizado.");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}
