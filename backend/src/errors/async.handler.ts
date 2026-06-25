import { Request, Response, NextFunction } from 'express';

// Define the express handler signature
type ExpressHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<unknown> | unknown;

export const asyncHandler = (fn: ExpressHandler) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
