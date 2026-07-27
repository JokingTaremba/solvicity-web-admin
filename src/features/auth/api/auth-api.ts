import { apiClient } from "@/shared/api/client";
import type {
  AuthResponse,
  LoginRequest,
} from "@/features/auth/types/auth-type";

export async function login(request: LoginRequest): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>("/auth/login", request);
  return data;
}
