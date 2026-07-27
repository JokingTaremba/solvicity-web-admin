import type { UserRole } from "@/shared/types/user-role-type";

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
