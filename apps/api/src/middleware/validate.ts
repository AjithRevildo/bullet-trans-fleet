import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validate = <T>(schema: z.ZodType<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = schema.parse(req.body);
      req.body = validated;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          code: 'VALIDATION_ERROR',
          data: error.flatten(),
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Invalid payload',
        code: 'INVALID_PAYLOAD',
      });
    }
  };
};
