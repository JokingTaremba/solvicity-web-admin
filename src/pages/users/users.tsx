import { useState } from "react";
import type { SortingState } from "@tanstack/react-table";

import { useUsers } from "@/features/users/hooks/use-users";
import { UserFilters } from "@/features/users/components/user-filters";
import { getUserColumns } from "@/features/users/components/user-columns";
import { UserDetailDialog } from "@/features/users/components/user-detail-dialog";
import { ChangeRoleDialog } from "@/features/users/components/change-role-dialog";
import { ToggleActiveDialog } from "@/features/users/components/toggle-active-dialog";
import { DeleteUserDialog } from "@/features/users/components/delete-user-dialog";
import type {
  UserResponse,
  UserRole,
} from "@/features/users/types/users-types";
import { useAuthStore } from "@/shared/stores/auth-store";
import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import { ListPageShell } from "@/shared/components/layout/list-page-shell";

export function UsersPage() {
  const currentUser = useAuthStore((s) => s.user);

  const [nameFilter, setNameFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "ALL">("ALL");
  const [page, setPage] = useState(0);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "createdAt", desc: true },
  ]);

  const [detailOpen, setDetailOpen] = useState(false);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [toggleActiveOpen, setToggleActiveOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);

  const activeSort = sorting[0];

  const { data, isLoading, isError } = useUsers({
    page,
    size: 20,
    name: nameFilter || undefined,
    role: roleFilter === "ALL" ? undefined : roleFilter,
    sortBy:
      (activeSort?.id as "name" | "email" | "createdAt" | "role") ??
      "createdAt",
    sortDirection: activeSort?.desc ? "DESC" : "ASC",
  });

  const columns = currentUser
    ? getUserColumns({
        currentUserId: currentUser.id,
        currentUserRole: currentUser.role,
        onChangeRole: (user) => {
          setSelectedUser(user);
          setRoleDialogOpen(true);
        },
        onToggleActive: (user) => {
          setSelectedUser(user);
          setToggleActiveOpen(true);
        },
        onDelete: (user) => {
          setSelectedUser(user);
          setDeleteOpen(true);
        },
      })
    : [];

  return (
    <>
      <ListPageShell
        header={
          <div>
            <h1 className="text-2xl font-semibold">Utilizadores</h1>
            <p className="text-muted-foreground">
              {data
                ? `${data.totalElements} ${data.totalElements === 1 ? "utilizador" : "utilizadores"}`
                : "A carregar..."}
            </p>
          </div>
        }
        filters={
          <UserFilters
            nameFilter={nameFilter}
            onNameFilterChange={(value) => {
              setNameFilter(value);
              setPage(0);
            }}
            roleFilter={roleFilter}
            onRoleFilterChange={(value) => {
              setRoleFilter(value);
              setPage(0);
            }}
          />
        }
        footer={
          <DataTablePagination
            page={page}
            totalPages={data?.totalPages ?? 0}
            totalElements={data?.totalElements ?? 0}
            isLastPage={data?.last ?? true}
            onPageChange={setPage}
          />
        }
      >
        {isError && (
          <p className="p-4 text-sm text-destructive">
            Não foi possível carregar os utilizadores.
          </p>
        )}
        <DataTable
          columns={columns}
          data={data?.content ?? []}
          isLoading={isLoading}
          emptyMessage="Nenhum utilizador encontrado."
          sorting={sorting}
          onSortingChange={(updater) => {
            setSorting(updater);
            setPage(0);
          }}
          onRowClick={(user) => {
            setSelectedUser(user);
            setDetailOpen(true);
          }}
        />
      </ListPageShell>

      <UserDetailDialog
        open={detailOpen}
        onOpenChange={setDetailOpen}
        user={selectedUser}
      />
      <ChangeRoleDialog
        open={roleDialogOpen}
        onOpenChange={setRoleDialogOpen}
        user={selectedUser}
      />
      <ToggleActiveDialog
        open={toggleActiveOpen}
        onOpenChange={setToggleActiveOpen}
        user={selectedUser}
      />
      <DeleteUserDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        user={selectedUser}
      />
    </>
  );
}
