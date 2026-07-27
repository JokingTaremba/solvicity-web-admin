import type { UserRole } from "@/shared/stores/auth-store";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string | null;
  token: string;
}
