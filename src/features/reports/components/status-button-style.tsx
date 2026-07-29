import type { ReportStatus } from "../types/reports-types";

export const statusButtonStyles: Record<ReportStatus, string> = {
  PENDING:
    "border-orange-200/60 text-orange-700 hover:bg-orange-50/70 hover:border-orange-300 dark:border-orange-800/50 dark:text-orange-400 dark:hover:bg-orange-950/30 dark:hover:border-orange-700",

  UNDER_REVIEW:
    "border-primary/25 text-primary hover:bg-primary/10 hover:border-primary/40 dark:border-primary/30 dark:hover:bg-primary/15 dark:hover:border-primary/40",

  IN_PROGRESS:
    "border-violet-200/70 text-violet-700 hover:bg-violet-50 hover:border-violet-300 dark:border-violet-800/60 dark:text-violet-400 dark:hover:bg-violet-950/30 dark:hover:border-violet-700",

  COMPLETED:
    "border-success/25 text-success hover:bg-success/10 hover:border-success/40 dark:border-success/30 dark:hover:bg-success/15 dark:hover:border-success/40",

  REJECTED:
    "border-destructive/25 text-destructive hover:bg-destructive/10 hover:border-destructive/40 dark:border-destructive/30 dark:hover:bg-destructive/15 dark:hover:border-destructive/40",
};
