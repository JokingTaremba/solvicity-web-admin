import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from "@/features/categories/api/categories-api";
import { getApiErrorMessage } from "@/shared/utils/api-error/api-error-message";
import type {
  CategoryFilterParams,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "@/features/categories/types/categories-types";

export function useCategories(filters: CategoryFilterParams) {
  return useQuery({
    queryKey: ["categories", filters],
    queryFn: () => fetchCategories(filters),
    placeholderData: keepPreviousData,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: CreateCategoryRequest) => createCategory(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Categoria criada com sucesso.");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      request,
    }: {
      id: string;
      request: UpdateCategoryRequest;
    }) => updateCategory(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Categoria actualizada.");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Categoria apagada.");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}
