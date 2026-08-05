import { apiClient } from "@/shared/api/client";
import type { PageResponse } from "@/shared/types/page-response";
import type {
  ChangeUserRoleRequest,
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

export async function changeUserRole(
  id: string,
  request: ChangeUserRoleRequest,
): Promise<UserResponse> {
  const { data } = await apiClient.patch<UserResponse>(
    `/users/${id}/role`,
    request,
  );
  return data;
}

export async function deactivateUser(id: string): Promise<UserResponse> {
  const { data } = await apiClient.patch<UserResponse>(
    `/users/${id}/deactivate`,
  );
  return data;
}

export async function reactivateUser(id: string): Promise<UserResponse> {
  const { data } = await apiClient.patch<UserResponse>(
    `/users/${id}/reactivate`,
  );
  return data;
}

export async function deleteUser(id: string): Promise<void> {
  await apiClient.delete(`/users/${id}`);
}
