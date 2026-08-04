import { apiClient } from "@/shared/api/client";
import type { PageResponse } from "@/shared/types/page-response";
import type {
  UserFilterParams,
  UserResponse,
} from "@/features/users/types/users-types";

export async function fetchUsers(
  filters: UserFilterParams,
): Promise<PageResponse<UserResponse>> {
  const { data } = await apiClient.get<PageResponse<UserResponse>>("/users", {
    params: filters,
  });
  return data;
}
