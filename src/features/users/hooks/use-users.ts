import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  fetchUsers,
  changeUserRole,
  deactivateUser,
  deleteUser,
  reactivateUser,
} from "@/features/users/api/users-api";
import type {
  ChangeUserRoleRequest,
  UserFilterParams,
} from "@/features/users/types/users-types";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/shared/utils/api-error/api-error-message";

export function useUsers(filters: UserFilterParams) {
  return useQuery({
    queryKey: ["users", filters],
    queryFn: () => fetchUsers(filters),
    placeholderData: keepPreviousData,
  });
}

export function useChangeUserRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      request,
    }: {
      id: string;
      request: ChangeUserRoleRequest;
    }) => changeUserRole(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Role actualizado.");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useDeactivateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deactivateUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Conta desactivada.");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useReactivateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => reactivateUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Conta reactivada.");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Utilizador apagado.");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}
