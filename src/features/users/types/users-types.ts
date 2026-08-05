export type UserRole = "COMMON" | "ADMIN" | "SUPERADMIN";

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: UserRole;
  avatarUrl: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ChangeUserRoleRequest {
  role: UserRole;
}

export interface UserFilterParams {
  name?: string;
  email?: string;
  role?: UserRole;
  phone?: string;
  page?: number;
  size?: number;
  sortBy?: "name" | "email" | "createdAt" | "updatedAt" | "role";
  sortDirection?: "ASC" | "DESC";
}
