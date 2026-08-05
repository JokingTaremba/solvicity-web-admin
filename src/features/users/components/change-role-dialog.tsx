import { useEffect, useState } from "react";

import { useChangeUserRole } from "@/features/users/hooks/use-users";
import type {
  UserResponse,
  UserRole,
} from "@/features/users/types/users-types";
import { useAuthStore } from "@/shared/stores/auth-store";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/components/ui/dialog";

const roleLabels: Record<UserRole, string> = {
  COMMON: "Cidadão",
  ADMIN: "Admin",
  SUPERADMIN: "Superadmin",
};

interface ChangeRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserResponse | null;
}

export function ChangeRoleDialog({
  open,
  onOpenChange,
  user,
}: ChangeRoleDialogProps) {
  const currentUser = useAuthStore((s) => s.user);
  const changeRoleMutation = useChangeUserRole();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  useEffect(() => {
    if (open && user) setSelectedRole(user.role);
  }, [open, user]);

  const canAssignSuperadmin = currentUser?.role === "SUPERADMIN";

  function handleConfirm() {
    if (!user || !selectedRole) return;
    changeRoleMutation.mutate(
      { id: user.id, request: { role: selectedRole } },
      { onSuccess: () => onOpenChange(false) },
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mudar role</DialogTitle>
          <DialogDescription>
            A alterar o role de {user?.name}. Isto muda as permissões desta
            conta imediatamente.
          </DialogDescription>
        </DialogHeader>

        <Select
          value={selectedRole ?? undefined}
          onValueChange={(value) => value && setSelectedRole(value as UserRole)}
        >
          <SelectTrigger>
            <SelectValue>
              {selectedRole ? roleLabels[selectedRole] : "Selecciona um role"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="COMMON">Cidadão</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="SUPERADMIN" disabled={!canAssignSuperadmin}>
              Superadmin
              {!canAssignSuperadmin && " (só superadmins podem atribuir)"}
            </SelectItem>
          </SelectContent>
        </Select>

        <DialogFooter>
          <Button
            onClick={handleConfirm}
            disabled={
              changeRoleMutation.isPending || selectedRole === user?.role
            }
          >
            {changeRoleMutation.isPending ? "A guardar..." : "Guardar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
