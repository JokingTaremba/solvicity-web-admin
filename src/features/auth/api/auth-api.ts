import { apiClient, publicClient } from "@/shared/api/client";
import type {
  AuthResponse,
  LoginRequest,
} from "@/features/auth/types/auth-type";

export async function login(request: LoginRequest): Promise<AuthResponse> {
  const { data } = await publicClient.post<AuthResponse>(
    "/auth/login",
    request,
  );
  return data;
}

export async function getMe() {
  const { data } = await apiClient.get("/auth/me");
  return data;
}
