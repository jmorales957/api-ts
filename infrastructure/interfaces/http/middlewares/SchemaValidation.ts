import { NextFunction, Request, Response } from 'express-serve-static-core';
import { AnyZodObject, ZodError } from 'zod';

export const schemaValidation = (schema?: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req && schema) schema.parse({ ...req.body, ...req.params, ...req.query });
    next();
  } catch (error) {
    if (error instanceof ZodError) return res.status(400).json(error.issues);
  }
};
