import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import {
  deleteComment,
  fetchComments,
  updateComment,
} from "@/features/comments/api/comments-api";
import { getApiErrorMessage } from "@/shared/utils/api-error/api-error-message";
import type {
  CommentFilterParams,
  UpdateCommentRequest,
} from "@/features/comments/types/comments-types";

export function useComments(filters: CommentFilterParams) {
  return useQuery({
    queryKey: ["comments", filters],
    queryFn: () => fetchComments(filters),
    placeholderData: keepPreviousData,
  });
}

export function useUpdateComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      request,
    }: {
      id: string;
      request: UpdateCommentRequest;
    }) => updateComment(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      toast.success("Comentário actualizado.");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      toast.success("Comentário apagado.");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}
