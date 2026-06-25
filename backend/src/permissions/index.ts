import { Role } from '@prisma/client';

/**
 * APPLICATION PERMISSION CONFIGURATIONS
 * 
 * Maps user roles to arrays of fine-grained action tags.
 */
export const permissionsMap: Record<Role, string[]> = {
  SUPER_ADMIN: ['*'], // Bypass permission evaluations
  ADMIN: [
    'users:read',
    'users:create',
    'users:update',
    'reports:view',
    'settings:read',
    'settings:write',
  ],
  MANAGER: [
    'users:read',
    'reports:view',
    'settings:read',
  ],
  USER: [
    'users:read',
  ],
};

/**
 * Checks if a role has access to specific tags
 */
export const hasAccess = (role: Role, requiredPermission: string): boolean => {
  const granted = permissionsMap[role] || [];
  return granted.includes('*') || granted.includes(requiredPermission);
};
