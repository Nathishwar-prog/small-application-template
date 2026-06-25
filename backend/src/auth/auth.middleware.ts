import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError, ForbiddenError } from '../errors/app-error';
import { TokenUtils } from './token.utils';

/**
 * Authentication Middleware: Protects endpoints by verifying the incoming JWT Bearer token
 */
export const authenticate = (req: Request, _res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Access token is missing or malformed');
    }

    const token = authHeader.split(' ')[1];
    const payload = TokenUtils.verifyAccessToken(token);

    // Attach decoded user information to the request context
    req.user = payload;
    next();
  } catch (error) {
    next(new UnauthorizedError('Invalid or expired authentication credentials'));
  }
};

/**
 * Authorization Middleware: Standard Role Based Access Control (RBAC) check
 */
export const requireRole = (allowedRoles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new UnauthorizedError('Authentication credentials required');
    }

    const { role } = req.user;

    // Super Admin has unrestricted permissions
    if (role === 'SUPER_ADMIN') {
      return next();
    }

    if (!allowedRoles.includes(role)) {
      throw new ForbiddenError('You do not have the required role to access this resource');
    }

    next();
  };
};

/**
 * Authorization Middleware: Fine-grained Permission System check
 */
export const requirePermission = (requiredPermissions: string[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new UnauthorizedError('Authentication credentials required');
    }

    const { role, permissions } = req.user;

    // Super Admin has unrestricted permissions
    if (role === 'SUPER_ADMIN' || permissions.includes('*')) {
      return next();
    }

    // Check if user has ALL required permissions (or at least one, depending on design; checking for all is safer)
    const hasAllPermissions = requiredPermissions.every((perm) => permissions.includes(perm));

    if (!hasAllPermissions) {
      throw new ForbiddenError('You do not have the required permissions to perform this action');
    }

    next();
  };
};
