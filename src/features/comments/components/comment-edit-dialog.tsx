import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUpdateComment } from "@/features/comments/hooks/use-comments";
import {
  commentSchema,
  type CommentFormValues,
} from "@/features/comments/schemas/comment-schema";
import type { CommentResponse } from "@/features/comments/types/comments-types";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/components/ui/dialog";

interface CommentEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  comment: CommentResponse | null;
}

export function CommentEditDialog({
  open,
  onOpenChange,
  comment,
}: CommentEditDialogProps) {
  const updateMutation = useUpdateComment();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormValues>({ resolver: zodResolver(commentSchema) });

  useEffect(() => {
    if (open && comment) {
      reset({ text: comment.text });
    }
  }, [open, comment, reset]);

  function onSubmit(values: CommentFormValues) {
    if (!comment) return;
    updateMutation.mutate(
      { id: comment.id, request: values },
      { onSuccess: () => onOpenChange(false) },
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar comentário</DialogTitle>
          <DialogDescription>
            De {comment?.user.name} ·{" "}
            {comment && new Date(comment.createdAt).toLocaleString("pt-PT")}
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Texto</label>
            <Textarea {...register("text")} rows={4} />
            {errors.text && (
              <p className="text-sm text-destructive">{errors.text.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? "A guardar..." : "Guardar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
