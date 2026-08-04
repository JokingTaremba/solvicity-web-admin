import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/features/users/api/users-api";
import type { UserFilterParams } from "@/features/users/types/users-types";

export function useUsers(filters: UserFilterParams) {
  return useQuery({
    queryKey: ["users", filters],
    queryFn: () => fetchUsers(filters),
    placeholderData: keepPreviousData,
  });
}
