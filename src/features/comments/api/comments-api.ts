import { apiClient } from "@/shared/api/client";
import type { PageResponse } from "@/shared/types/page-response";
import type {
  CommentFilterParams,
  CommentResponse,
  UpdateCommentRequest,
} from "@/features/comments/types/comments-types";

export async function fetchComments(
  filters: CommentFilterParams,
): Promise<PageResponse<CommentResponse>> {
  const { data } = await apiClient.get<PageResponse<CommentResponse>>(
    "/comments",
    {
      params: filters,
    },
  );
  return data;
}

export async function updateComment(
  id: string,
  request: UpdateCommentRequest,
): Promise<CommentResponse> {
  const { data } = await apiClient.patch<CommentResponse>(
    `/comments/${id}`,
    request,
  );
  return data;
}

export async function deleteComment(id: string): Promise<void> {
  await apiClient.delete(`/comments/${id}`);
}
