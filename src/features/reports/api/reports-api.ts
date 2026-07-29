import { apiClient } from "@/shared/api/client";
import type { PageResponse } from "@/shared/types/page-response";
import type {
  ChangeStatusHistoryRequest,
  ReportResponse,
  ReportFilterParams,
  ReportSummaryResponse,
  UpdateReportRequest,
} from "@/features/reports/types/reports-types";

export async function fetchReports(
  filters: ReportFilterParams,
): Promise<PageResponse<ReportSummaryResponse>> {
  const { data } = await apiClient.get<PageResponse<ReportSummaryResponse>>(
    "/reports",
    {
      params: filters,
    },
  );
  return data;
}

export async function fetchReportById(id: string): Promise<ReportResponse> {
  const { data } = await apiClient.get<ReportResponse>(`/reports/${id}`);
  return data;
}

export async function updateReport(
  id: string,
  request: UpdateReportRequest,
): Promise<ReportResponse> {
  const { data } = await apiClient.patch<ReportResponse>(
    `/reports/${id}`,
    request,
  );
  return data;
}

export async function deleteReport(id: string): Promise<void> {
  await apiClient.delete(`/reports/${id}`);
}

export async function changeReportStatus(
  id: string,
  request: ChangeStatusHistoryRequest,
): Promise<void> {
  await apiClient.post(`/reports/${id}/status-history`, request);
}
