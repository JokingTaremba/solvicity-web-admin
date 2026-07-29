import { useState } from "react";
import { MoreHorizontal, Plus } from "lucide-react";

import { useCategories } from "@/features/categories/hooks/use-categories";
import { CategoryFormDialog } from "@/features/categories/components/category-form-dialog";
import { DeleteCategoryDialog } from "@/features/categories/components/delete-category-dialog";
import type { CategoryResponse } from "@/features/categories/types/categories-types";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/shared/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/shared/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/shared/components/ui/dropdown-menu";

export function CategoriesPage() {
  const [nameFilter, setNameFilter] = useState("");
  const [page, setPage] = useState(0);

  const [formOpen, setFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<CategoryResponse | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingCategory, setDeletingCategory] =
    useState<CategoryResponse | null>(null);

  const { data, isLoading, isError } = useCategories({
    page,
    size: 20,
    name: nameFilter || undefined,
    sortBy: "name",
    sortDirection: "ASC",
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

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Categorias</h1>
          <p className="text-muted-foreground">
            Gere as categorias usadas para classificar reports.
          </p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus />
          Nova categoria
        </Button>
      </div>

      <Input
        placeholder="Pesquisar por nome..."
        value={nameFilter}
        onChange={(e) => {
          setNameFilter(e.target.value);
          setPage(0);
        }}
        className="max-w-xs"
      />

      {isError && (
        <p className="text-sm text-destructive">
          Não foi possível carregar as categorias.
        </p>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center text-muted-foreground"
              >
                A carregar...
              </TableCell>
            </TableRow>
          )}

          {!isLoading && data?.content.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center text-muted-foreground"
              >
                Nenhuma categoria encontrada.
              </TableCell>
            </TableRow>
          )}

          {data?.content.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>
                <Badge variant={category.isActive ? "default" : "outline"}>
                  {category.isActive ? "Activa" : "Inactiva"}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={<Button variant="ghost" size="icon" />}
                  >
                    <MoreHorizontal className="size-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => openEditDialog(category)}>
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => openDeleteDialog(category)}
                    >
                      Apagar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Página {data.page + 1} de {data.totalPages} · {data.totalElements}{" "}
            categorias
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={data.last}
              onClick={() => setPage((p) => p + 1)}
            >
              Seguinte
            </Button>
          </div>
        </div>
      )}

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
    </div>
  );
}
