import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { BadRequestError } from '../errors/app-error';

export interface ValidationSchema {
  body?: AnyZodObject;
  query?: AnyZodObject;
  params?: AnyZodObject;
}

/**
 * Reusable middleware to validate requests against Zod schemas
 */
export const validate = (schema: ValidationSchema) => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      if (schema.body) {
        req.body = await schema.body.parseAsync(req.body);
      }
      if (schema.query) {
        req.query = await schema.query.parseAsync(req.query);
      }
      if (schema.params) {
        req.params = await schema.params.parseAsync(req.params);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Format validation issues to be client-friendly
        const formattedErrors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        next(new BadRequestError('Validation failed', formattedErrors));
      } else {
        next(error);
      }
    }
  };
};

/**
 * NOTE: For Express-Validator alternative implementation:
 *
 * import { validationResult, ValidationChain } from 'express-validator';
 *
 * export const validateExpressValidator = (validations: ValidationChain[]) => {
 *   return async (req: Request, res: Response, next: NextFunction) => {
 *     for (let validation of validations) {
 *       const result = await validation.run(req);
 *       if (result.context.errors.length) break;
 *     }
 *
 *     const errors = validationResult(req);
 *     if (errors.isEmpty()) {
 *       return next();
 *     }
 *
 *     next(new BadRequestError('Validation failed', errors.array()));
 *   };
 * };
 */

export default validate;
