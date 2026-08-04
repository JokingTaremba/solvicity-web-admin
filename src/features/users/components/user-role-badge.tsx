import { Badge } from "@/shared/components/ui/badge";
import type { UserRole } from "@/features/users/types/users-types";

const roleConfig: Record<
  UserRole,
  { label: string; variant: "muted" | "review" | "success" }
> = {
  COMMON: { label: "Cidadão", variant: "muted" },
  ADMIN: { label: "Admin", variant: "review" },
  SUPERADMIN: { label: "Superadmin", variant: "success" },
};

export function UserRoleBadge({ role }: { role: UserRole }) {
  const config = roleConfig[role];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
