import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { login } from "@/features/auth/api/auth-api";
import { useAuthStore } from "@/shared/stores/auth-store";
import type { LoginRequest } from "@/features/auth/types/auth-type";

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (request: LoginRequest) => login(request),
    onSuccess: (data) => {
      setAuth(data.token, {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
        avatarUrl: data.avatarUrl,
      });
      navigate({ to: "/" });
    },
  });
}
