export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'USER';

export interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: UserRole;
  isActive: boolean;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserPayload {
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  permissions?: string[];
}

export interface UpdateUserPayload {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  permissions?: string[];
  isActive?: boolean;
}

export interface UserListParams {
  skip?: number;
  take?: number;
}
