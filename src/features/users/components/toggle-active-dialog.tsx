import {
  useDeactivateUser,
  useReactivateUser,
} from "@/features/users/hooks/use-users";
import type { UserResponse } from "@/features/users/types/users-types";
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

interface ToggleActiveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserResponse | null;
}

export function ToggleActiveDialog({
  open,
  onOpenChange,
  user,
}: ToggleActiveDialogProps) {
  const deactivateMutation = useDeactivateUser();
  const reactivateMutation = useReactivateUser();
  const isActive = user?.isActive;
  const isPending =
    deactivateMutation.isPending || reactivateMutation.isPending;

  function handleConfirm() {
    if (!user) return;
    const mutation = isActive ? deactivateMutation : reactivateMutation;
    mutation.mutate(user.id, { onSuccess: () => onOpenChange(false) });
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isActive ? "Desactivar conta?" : "Reactivar conta?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isActive
              ? `${user?.name} deixa de conseguir iniciar sessão até ser reactivado.`
              : `${user?.name} volta a conseguir iniciar sessão normalmente.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} disabled={isPending}>
            {isPending
              ? "A processar..."
              : isActive
                ? "Desactivar"
                : "Reactivar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
