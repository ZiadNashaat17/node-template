import AppError from '../utils/appError.js';

/**
 * Middleware factory for validating request data using Zod schemas
 * @param {object} schema - Zod schema with optional properties: body, query, params
 * @returns {Function} Express middleware
 *
 * @example
 * import { z } from 'zod';
 * import validateRequest from './middlewares/validateRequest.js';
 *
 * const createUserSchema = {
 *   body: z.object({
 *     email: z.string().email(),
 *     password: z.string().min(8),
 *   }),
 * };
 *
 * app.post('/users', validateRequest(createUserSchema), (req, res) => {
 *   // req.body is now validated
 * });
 */
export const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      if (schema.body) {
        const bodyValidation = schema.body.safeParse(req.body);
        if (!bodyValidation.success) {
          const errors = bodyValidation.error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          }));
          throw new AppError('Validation error', 400, errors);
        }
        req.body = bodyValidation.data;
      }

      if (schema.query) {
        const queryValidation = schema.query.safeParse(req.query);
        if (!queryValidation.success) {
          const errors = queryValidation.error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          }));
          throw new AppError('Validation error', 400, errors);
        }
        req.query = queryValidation.data;
      }

      if (schema.params) {
        const paramsValidation = schema.params.safeParse(req.params);
        if (!paramsValidation.success) {
          const errors = paramsValidation.error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          }));
          throw new AppError('Validation error', 400, errors);
        }
        req.params = paramsValidation.data;
      }

      next();
    }
    catch (error) {
      next(error);
    }
  };
};

export default validateRequest;
