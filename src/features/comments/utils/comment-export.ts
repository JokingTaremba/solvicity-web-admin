import { fetchComments } from "@/features/comments/api/comments-api";
import type {
  CommentResponse,
  CommentFilterParams,
} from "@/features/comments/types/comments-types";
import { fetchAllPages } from "@/shared/utils/export/fetch-all-pages";
import type { ExportColumn } from "@/shared/utils/export/export-data";

export const commentExportColumns: ExportColumn<CommentResponse>[] = [
  { header: "Comentário", accessor: (c) => c.text },
  { header: "Autor", accessor: (c) => c.user.name },
  { header: "Imagens", accessor: (c) => c.media.length },
  {
    header: "Criado em",
    accessor: (c) => new Date(c.createdAt).toLocaleDateString("pt-PT"),
  },
];

export function fetchCommentsForExport(
  filters: Pick<CommentFilterParams, "text">,
) {
  return fetchAllPages(fetchComments, {
    text: filters.text,
    sortBy: "createdAt",
    sortDirection: "DESC",
  });
}
