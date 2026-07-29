export type ReportStatus =
  | "PENDING"
  | "UNDER_REVIEW"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "REJECTED";

export const REPORT_STATUS_TRANSITIONS: Record<ReportStatus, ReportStatus[]> = {
  PENDING: ["UNDER_REVIEW", "REJECTED"],
  UNDER_REVIEW: ["IN_PROGRESS", "REJECTED"],
  IN_PROGRESS: ["COMPLETED"],
  COMPLETED: [],
  REJECTED: [],
};

interface UserSummaryResponse {
  id: string;
  name: string;
  avatarUrl: string | null;
}

interface CategorySummaryResponse {
  id: string;
  name: string;
}

interface AddressSummaryResponse {
  id: string;
  street: string;
  number: string | null;
  city: string;
  reference: string | null;
}

export interface ReportSummaryResponse {
  id: string;
  user: UserSummaryResponse;
  category: CategorySummaryResponse;
  title: string;
  status: ReportStatus;
  latitude: number | null;
  longitude: number | null;
  city: string | null;
  createdAt: string;
}

export interface ReportResponse {
  id: string;
  user: UserSummaryResponse;
  category: CategorySummaryResponse;
  address: AddressSummaryResponse;
  title: string;
  description: string | null;
  latitude: number | null;
  longitude: number | null;
  status: ReportStatus;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateReportRequest {
  title?: string;
  description?: string;
  categoryId?: string;
  address?: {
    street?: string;
    number?: string;
    city?: string;
    reference?: string;
  };
}

export interface ChangeStatusHistoryRequest {
  newStatus: ReportStatus;
  note?: string;
}

export interface ReportFilterParams {
  title?: string;
  status?: ReportStatus;
  categoryId?: string;
  userId?: string;
  city?: string;
  page?: number;
  size?: number;
  sortBy?: "createdAt" | "updatedAt" | "title" | "status";
  sortDirection?: "ASC" | "DESC";
}
