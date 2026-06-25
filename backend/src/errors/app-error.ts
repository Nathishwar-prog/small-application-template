import { StatusCodes } from 'http-status-codes';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly errors?: unknown;

  constructor(
    message: string,
    statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
    errors?: unknown,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Indicates error is anticipated/controlled
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = 'Bad Request', errors?: unknown) {
    super(message, StatusCodes.BAD_REQUEST, errors);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized access') {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Access forbidden') {
    super(message, StatusCodes.FORBIDDEN);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Requested resource not found') {
    super(message, StatusCodes.NOT_FOUND);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Conflict occurred') {
    super(message, StatusCodes.CONFLICT);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = 'Internal server error') {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
