interface UserSummaryResponse {
  id: string;
  name: string;
  avatarUrl: string | null;
}

interface MediaResponse {
  id: string;
  url: string;
}

export interface CommentResponse {
  id: string;
  user: UserSummaryResponse;
  reportId: string;
  text: string;
  media: MediaResponse[];
  createdAt: string;
  updatedAt: string;
}

export interface UpdateCommentRequest {
  text: string;
}

export interface CommentFilterParams {
  reportId?: string;
  userId?: string;
  text?: string;
  page?: number;
  size?: number;
  sortBy?: "createdAt" | "updatedAt";
  sortDirection?: "ASC" | "DESC";
}
