import type { ColumnDef } from "@tanstack/react-table";
import {
  Eye,
  MoreHorizontal,
  Pencil,
  SquareMousePointer,
  Trash2,
} from "lucide-react";

import type { CommentResponse } from "@/features/comments/types/comments-types";
import { DataTableColumnHeader } from "@/shared/components/data-table/data-table-column-header";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/shared/components/ui/dropdown-menu";

interface CommentColumnsProps {
  onEdit: (comment: CommentResponse) => void;
  onDelete: (comment: CommentResponse) => void;
  onViewReport: (reportId: string) => void;
}

export function getCommentColumns({
  onEdit,
  onDelete,
  onViewReport,
}: CommentColumnsProps): ColumnDef<CommentResponse>[] {
  return [
    {
      accessorKey: "text",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Comentário" />
      ),
      cell: ({ row }) => (
        <span className="line-clamp-2 max-w-md">{row.original.text}</span>
      ),
    },
    {
      id: "user",
      header: "Autor",
      cell: ({ row }) => row.original.user.name,
    },
    {
      id: "media",
      header: "Imagens",
      cell: ({ row }) =>
        row.original.media.length > 0 ? (
          <Badge variant="outline">{row.original.media.length}</Badge>
        ) : (
          <span className="text-muted-foreground">
            <Badge variant="outline">0</Badge>
          </span>
        ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Data" />
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
        const comment = row.original;
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
                  onClick={() => onViewReport(comment.reportId)}
                >
                  <Eye className="size-4" />
                  Ver report
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(comment)}>
                  <Pencil className="size-4" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => onDelete(comment)}
                >
                  <Trash2 className="size-4" />
                  Apagar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
}
