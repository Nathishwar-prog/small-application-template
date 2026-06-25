import { Role } from '@prisma/client';

export interface IUser {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  role: Role;
  isActive: boolean;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = Role;

export const UserRoles = {
  SUPER_ADMIN: 'SUPER_ADMIN' as Role,
  ADMIN: 'ADMIN' as Role,
  MANAGER: 'MANAGER' as Role,
  USER: 'USER' as Role,
} as const;
