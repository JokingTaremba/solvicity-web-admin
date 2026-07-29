export interface CategoryResponse {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryRequest {
  name: string;
  isActive?: boolean;
}

export interface UpdateCategoryRequest {
  name?: string;
  isActive?: boolean;
}

export interface CategoryFilterParams {
  name?: string;
  isActive?: boolean;
  page?: number;
  size?: number;
  sortBy?: "name" | "createdAt" | "updatedAt" | "isActive";
  sortDirection?: "ASC" | "DESC";
}
