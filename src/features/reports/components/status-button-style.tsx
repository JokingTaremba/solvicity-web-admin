import type { ReportStatus } from "../types/reports-types";

export const statusButtonStyles: Record<ReportStatus, string> = {
  PENDING:
    "border-warning text-warning hover:bg-warning hover:text-warning-foreground",
  UNDER_REVIEW:
    "border-tertiary text-tertiary hover:bg-tertiary hover:text-tertiary-foreground",
  IN_PROGRESS:
    "border-primary text-primary hover:bg-primary hover:text-primary-foreground",
  COMPLETED:
    "border-success text-success hover:bg-success hover:text-success-foreground",
  REJECTED:
    "border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground",
};
