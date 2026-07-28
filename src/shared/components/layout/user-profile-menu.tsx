import { useState } from "react";
import { LogOut, Settings, User } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

import { useAuthStore } from "@/shared/stores/auth-store";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function UserProfileMenu() {
  const user = useAuthStore((s) => s.user);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const navigate = useNavigate();

  const [confirmOpen, setConfirmOpen] = useState(false);

  function handleLogout() {
    clearAuth();
    navigate({ to: "/login" });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <button
              className="
                flex w-full items-center gap-3
                rounded-lg p-2
                hover:bg-accent
                transition-colors"
            >
              <Avatar className="size-10">
                <AvatarImage src={user?.avatarUrl ?? undefined} />

                <AvatarFallback>
                  {user?.name ? getInitials(user.name) : "?"}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1 text-left">
                <p className="truncate text-sm font-semibold">{user?.name}</p>

                <p className="truncate text-xs text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </button>
          }
        />

        <DropdownMenuContent>
          <div className="flex items-center gap-3 px-3 py-3">
            <Avatar className="size-10">
              <AvatarImage src={user?.avatarUrl ?? undefined} />
              <AvatarFallback>
                {user?.name ? getInitials(user.name) : "?"}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{user?.name}</p>

              <p className="truncate text-xs text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </div>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <User className="size-4" />
            Perfil
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Settings className="size-4" />
            Configurações
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="text-destructive"
            onClick={() => setConfirmOpen(true)}
          >
            <LogOut className="mr-2 size-4" />
            Terminar sessão
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Terminar sessão?</AlertDialogTitle>

            <AlertDialogDescription>
              Vais ser desconectado da conta {user?.email}. Podes iniciar sessão
              novamente a qualquer momento.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>

            <AlertDialogAction onClick={handleLogout}>
              Terminar sessão
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
