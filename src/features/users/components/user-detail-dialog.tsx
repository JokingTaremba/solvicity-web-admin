import { UserRoleBadge } from "@/features/users/components/user-role-badge";
import type { UserResponse } from "@/features/users/types/users-types";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

interface UserDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserResponse | null;
}

export function UserDetailDialog({
  open,
  onOpenChange,
  user,
}: UserDetailDialogProps) {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes do utilizador</DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-4">
          <Avatar className="size-16">
            <AvatarImage src={user.avatarUrl ?? undefined} />
            <AvatarFallback className="text-lg">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-semibold">{user.name}</p>
            <UserRoleBadge role={user.role} />
          </div>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <div className="flex justify-between border-b border-border pb-2">
            <span className="text-muted-foreground">Estado</span>
            <Badge variant={user.isActive ? "success" : "muted"}>
              {user.isActive ? "Activo" : "Inactivo"}
            </Badge>
          </div>
          <div className="flex justify-between border-b border-border pb-2">
            <span className="text-muted-foreground">Email</span>
            <span>{user.email}</span>
          </div>
          <div className="flex justify-between border-b border-border pb-2">
            <span className="text-muted-foreground">Telefone</span>
            <span>{user.phone ?? "—"}</span>
          </div>
          <div className="flex justify-between border-b border-border pb-2">
            <span className="text-muted-foreground">Registado em</span>
            <span>{new Date(user.createdAt).toLocaleDateString("pt-PT")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Última actualização</span>
            <span>{new Date(user.updatedAt).toLocaleDateString("pt-PT")}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
