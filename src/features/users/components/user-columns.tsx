import type { ColumnDef } from "@tanstack/react-table";
import {
  MoreHorizontal,
  Power,
  ShieldCheck,
  SquareMousePointer,
  Trash2,
} from "lucide-react";

import type {
  UserResponse,
  UserRole,
} from "@/features/users/types/users-types";
import { UserRoleBadge } from "@/features/users/components/user-role-badge";
import { DataTableColumnHeader } from "@/shared/components/data-table/data-table-column-header";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/shared/components/ui/dropdown-menu";

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

interface UserColumnsProps {
  currentUserId: string;
  currentUserRole: UserRole;
  onChangeRole: (user: UserResponse) => void;
  onToggleActive: (user: UserResponse) => void;
  onDelete: (user: UserResponse) => void;
}

export function getUserColumns({
  currentUserId,
  currentUserRole,
  onChangeRole,
  onToggleActive,
  onDelete,
}: UserColumnsProps): ColumnDef<UserResponse>[] {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nome" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Avatar className="size-7">
            <AvatarImage src={row.original.avatarUrl ?? undefined} />
            <AvatarFallback className="text-xs">
              {getInitials(row.original.name)}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "isActive",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Estado" />
      ),
      cell: ({ row }) => (
        <Badge variant={row.original.isActive ? "success" : "muted"}>
          {row.original.isActive ? "Activo" : "Inactivo"}
        </Badge>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      cell: ({ row }) => row.original.email,
    },
    {
      accessorKey: "role",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Role" />
      ),
      cell: ({ row }) => <UserRoleBadge role={row.original.role} />,
    },
    {
      id: "phone",
      header: "Telefone",
      cell: ({ row }) => row.original.phone ?? "—",
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Registado em" />
      ),
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {new Date(row.original.createdAt).toLocaleDateString("pt-PT")}
        </span>
      ),
    },
    {
      id: "actions",
      header: () => (
        <div className="flex justify-center">
          <SquareMousePointer className="size-4" />
        </div>
      ),
      cell: ({ row }) => {
        const user = row.original;
        const isSelf = user.id === currentUserId;
        // Alvo é ADMIN/SUPERADMIN? Só um SUPERADMIN pode (des)activar essa conta
        const isTargetPrivileged =
          user.role === "ADMIN" || user.role === "SUPERADMIN";
        const canToggleActive =
          !isSelf && (!isTargetPrivileged || currentUserRole === "SUPERADMIN");
        const canDelete = !isSelf && currentUserRole === "SUPERADMIN";

        return (
          <div
            className="flex justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="ghost" size="icon" />}
              >
                <MoreHorizontal className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  disabled={isSelf}
                  onClick={() => onChangeRole(user)}
                >
                  <ShieldCheck className="size-4" />
                  Mudar role
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={!canToggleActive}
                  onClick={() => onToggleActive(user)}
                >
                  <Power className="size-4" />
                  {user.isActive ? "Desactivar" : "Reactivar"}
                </DropdownMenuItem>
                {canDelete && (
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => onDelete(user)}
                  >
                    <Trash2 className="size-4" />
                    Apagar
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
}
