import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppError } from './app-error';
import logger from '../logger/winston.logger';
import config from '../config';

export const globalErrorHandler = (
  err: Error & { statusCode?: number; errors?: unknown },
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): Response => {
  let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  let message = err.message || 'An unexpected error occurred';
  let errors = err.errors || undefined;

  // Log the error
  logger.error(`${req.method} ${req.originalUrl} - Error: ${err.message}`, {
    stack: err.stack,
    statusCode,
    url: req.originalUrl,
    method: req.method,
  });

  // Handle specific database errors (like Prisma constraint violations)
  if (err.name === 'PrismaClientKnownRequestError') {
    // Standardize database conflicts/integrity error statuses
    statusCode = StatusCodes.CONFLICT;
    message = 'Database constraint error or resource conflict.';
  }

  // Handle JWT expired/invalid tokens
  if (err.name === 'TokenExpiredError') {
    statusCode = StatusCodes.UNAUTHORIZED;
    message = 'Authentication token expired.';
  }

  if (err.name === 'JsonWebTokenError') {
    statusCode = StatusCodes.UNAUTHORIZED;
    message = 'Invalid authentication token.';
  }

  // Under development, expose stack traces. In production, mask unhandled errors.
  const isProd = config.NODE_ENV === 'production';
  const isOperational = err instanceof AppError;

  return res.status(statusCode).json({
    success: false,
    message: isProd && !isOperational ? 'Internal Server Error' : message,
    errors: errors,
    stack: isProd ? undefined : err.stack,
  });
};

export default globalErrorHandler;
