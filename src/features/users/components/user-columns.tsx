import type { ColumnDef } from "@tanstack/react-table";

import type { UserResponse } from "@/features/users/types/users-types";
import { UserRoleBadge } from "@/features/users/components/user-role-badge";
import { DataTableColumnHeader } from "@/shared/components/data-table/data-table-column-header";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/shared/components/ui/avatar";

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function getUserColumns(): ColumnDef<UserResponse>[] {
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
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      cell: ({ row }) => row.original.email,
    },
    {
      id: "phone",
      header: "Telefone",
      cell: ({ row }) => row.original.phone ?? "—",
    },
    {
      accessorKey: "role",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Role" />
      ),
      cell: ({ row }) => <UserRoleBadge role={row.original.role} />,
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
  ];
}
