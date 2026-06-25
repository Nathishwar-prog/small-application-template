import { Role } from '@prisma/client';
import { IUser } from '../models/user.model';

export interface CreateUserDto {
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  role?: Role;
  permissions?: string[];
}

export interface UpdateUserDto {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  role?: Role;
  permissions?: string[];
  isActive?: boolean;
}

export interface UserResponseDto {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: Role;
  isActive: boolean;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

export class UserDtoMapper {
  /**
   * Sanitizes database/domain user objects by stripping password and formatting fields
   */
  public static toResponse(user: IUser): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName || null,
      lastName: user.lastName || null,
      role: user.role,
      isActive: user.isActive,
      permissions: user.permissions,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }

  /**
   * Sanitizes lists of users
   */
  public static toResponseList(users: IUser[]): UserResponseDto[] {
    return users.map((user) => this.toResponse(user));
  }
}
