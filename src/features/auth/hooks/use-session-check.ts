import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { getMe } from "@/features/auth/api/auth-api";
import { useAuthStore } from "@/shared/stores/auth-store";

export function useSessionCheck() {
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ["auth", "me"],
    queryFn: getMe,
    retry: false,
    staleTime: 60_000,
  });

  useEffect(() => {
    if (query.isError) {
      clearAuth();
      navigate({ to: "/login" });
    }
  }, [query.isError, clearAuth, navigate]);

  return query;
}
