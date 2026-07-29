import { apiClient } from "@/shared/api/client";
import type {
  CategoryResponse,
  CategoryFilterParams,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "@/features/categories/types/categories-types";
import type { PageResponse } from "@/shared/types/page-response";

export async function fetchCategories(
  filters: CategoryFilterParams,
): Promise<PageResponse<CategoryResponse>> {
  const { data } = await apiClient.get<PageResponse<CategoryResponse>>(
    "/categories",
    {
      params: filters,
    },
  );
  return data;
}

export async function createCategory(
  request: CreateCategoryRequest,
): Promise<CategoryResponse> {
  const { data } = await apiClient.post<CategoryResponse>(
    "/categories",
    request,
  );
  return data;
}

export async function updateCategory(
  id: string,
  request: UpdateCategoryRequest,
): Promise<CategoryResponse> {
  const { data } = await apiClient.patch<CategoryResponse>(
    `/categories/${id}`,
    request,
  );
  return data;
}

export async function deleteCategory(id: string): Promise<void> {
  await apiClient.delete(`/categories/${id}`);
}
