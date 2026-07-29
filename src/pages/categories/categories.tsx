import { useState } from "react";
import { Plus } from "lucide-react";
import type { SortingState } from "@tanstack/react-table";

import { useCategories } from "@/features/categories/hooks/use-categories";
import { CategoryFormDialog } from "@/features/categories/components/category-form-dialog";
import { DeleteCategoryDialog } from "@/features/categories/components/delete-category-dialog";
import { CategoryFilters } from "@/features/categories/components/category-filters";
import { getCategoryColumns } from "@/features/categories/components/category-columns";
import type { CategoryResponse } from "@/features/categories/types/categories-types";
import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import { ListPageShell } from "@/shared/components/layout/list-page-shell";
import { Button } from "@/shared/components/ui/button";

export function CategoriesPage() {
  const [nameFilter, setNameFilter] = useState("");
  const [page, setPage] = useState(0);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "name", desc: false },
  ]);

  const [formOpen, setFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<CategoryResponse | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingCategory, setDeletingCategory] =
    useState<CategoryResponse | null>(null);

  const activeSort = sorting[0];

  const { data, isLoading, isError } = useCategories({
    page,
    size: 20,
    name: nameFilter || undefined,
    sortBy: (activeSort?.id as "name" | "createdAt" | "isActive") ?? "name",
    sortDirection: activeSort?.desc ? "DESC" : "ASC",
  });

  function openCreateDialog() {
    setEditingCategory(null);
    setFormOpen(true);
  }

  function openEditDialog(category: CategoryResponse) {
    setEditingCategory(category);
    setFormOpen(true);
  }

  function openDeleteDialog(category: CategoryResponse) {
    setDeletingCategory(category);
    setDeleteOpen(true);
  }

  const columns = getCategoryColumns({
    onEdit: openEditDialog,
    onDelete: openDeleteDialog,
  });

  return (
    <>
      <ListPageShell
        header={
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Categorias</h1>
              <p className="text-muted-foreground">
                {data
                  ? `${data.totalElements} ${data.totalElements === 1 ? "categoria" : "categorias"}`
                  : "A carregar..."}
              </p>
            </div>
            <Button onClick={openCreateDialog}>
              <Plus />
              Nova categoria
            </Button>
          </div>
        }
        filters={
          <CategoryFilters
            nameFilter={nameFilter}
            onNameFilterChange={(value) => {
              setNameFilter(value);
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
            Não foi possível carregar as categorias.
          </p>
        )}
        <DataTable
          columns={columns}
          data={data?.content ?? []}
          isLoading={isLoading}
          emptyMessage="Nenhuma categoria encontrada."
          sorting={sorting}
          onSortingChange={(updater) => {
            setSorting(updater);
            setPage(0);
          }}
        />
      </ListPageShell>

      <CategoryFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        category={editingCategory}
      />
      <DeleteCategoryDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        category={deletingCategory}
      />
    </>
  );
}
