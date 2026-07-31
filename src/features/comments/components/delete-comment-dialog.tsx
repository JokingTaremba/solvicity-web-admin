import { useDeleteComment } from "@/features/comments/hooks/use-comments";
import type { CommentResponse } from "@/features/comments/types/comments-types";
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

interface DeleteCommentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  comment: CommentResponse | null;
}

export function DeleteCommentDialog({
  open,
  onOpenChange,
  comment,
}: DeleteCommentDialogProps) {
  const deleteMutation = useDeleteComment();

  function handleConfirm() {
    if (!comment) return;
    deleteMutation.mutate(comment.id, { onSuccess: () => onOpenChange(false) });
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apagar comentário?</AlertDialogTitle>
          <AlertDialogDescription>
            Vais apagar o comentário de {comment?.user.name}. Esta acção não
            pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "A apagar..." : "Apagar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
