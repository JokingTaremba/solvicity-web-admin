import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import type { SortingState } from "@tanstack/react-table";

import { useComments } from "@/features/comments/hooks/use-comments";
import { CommentFilters } from "@/features/comments/components/comment-filters";
import { getCommentColumns } from "@/features/comments/components/comment-columns";
import { CommentEditDialog } from "@/features/comments/components/comment-edit-dialog";
import { DeleteCommentDialog } from "@/features/comments/components/delete-comment-dialog";
import type { CommentResponse } from "@/features/comments/types/comments-types";
import { DataTable } from "@/shared/components/data-table/data-table";
import { DataTablePagination } from "@/shared/components/data-table/data-table-pagination";
import { ListPageShell } from "@/shared/components/layout/list-page-shell";
import { ExportMenu } from "@/shared/components/data-table/export-menu";
import { commentExportColumns } from "@/features/comments/utils/comment-export";
import { fetchAllPages } from "@/shared/utils/export/fetch-all-pages";
import { fetchComments } from "@/features/comments/api/comments-api";

export function CommentsPage() {
  const navigate = useNavigate();

  const [textFilter, setTextFilter] = useState("");
  const [page, setPage] = useState(0);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "createdAt", desc: true },
  ]);

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedComment, setSelectedComment] =
    useState<CommentResponse | null>(null);

  const activeSort = sorting[0];

  const { data, isLoading, isError } = useComments({
    page,
    size: 20,
    text: textFilter || undefined,
    sortBy: (activeSort?.id as "createdAt" | "updatedAt") ?? "createdAt",
    sortDirection: activeSort?.desc ? "DESC" : "ASC",
  });

  function openEditDialog(comment: CommentResponse) {
    setSelectedComment(comment);
    setEditOpen(true);
  }

  function openDeleteDialog(comment: CommentResponse) {
    setSelectedComment(comment);
    setDeleteOpen(true);
  }

  const columns = getCommentColumns({
    onEdit: openEditDialog,
    onDelete: openDeleteDialog,
    onViewReport: (reportId) =>
      navigate({ to: "/reports/$reportId", params: { reportId } }),
  });

  return (
    <>
      <ListPageShell
        header={
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Comentários</h1>
              <p className="text-muted-foreground">
                {data
                  ? `${data.totalElements} ${data.totalElements === 1 ? "comentário" : "comentários"}`
                  : "A carregar..."}
              </p>
            </div>
            <ExportMenu
              columns={commentExportColumns}
              filenameBase="comentarios"
              title="Comentários"
              fetchAll={() =>
                fetchAllPages(fetchComments, {
                  text: textFilter || undefined,
                  sortBy: "createdAt",
                  sortDirection: "DESC",
                })
              }
            />
          </div>
        }
        filters={
          <CommentFilters
            textFilter={textFilter}
            onTextFilterChange={(value) => {
              setTextFilter(value);
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
            Não foi possível carregar os comentários.
          </p>
        )}
        <DataTable
          columns={columns}
          data={data?.content ?? []}
          isLoading={isLoading}
          emptyMessage="Nenhum comentário encontrado."
          sorting={sorting}
          onSortingChange={(updater) => {
            setSorting(updater);
            setPage(0);
          }}
        />
      </ListPageShell>

      <CommentEditDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        comment={selectedComment}
      />
      <DeleteCommentDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        comment={selectedComment}
      />
    </>
  );
}
