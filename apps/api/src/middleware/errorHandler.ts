import type { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  statusCode: number;
  code: string;

  constructor(statusCode: number, code: string, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}

export const errorHandler = (error: unknown, req: Request, res: Response, _next: NextFunction) => {
  const err = error instanceof AppError ? error : new AppError(500, 'INTERNAL_SERVER_ERROR', 'Internal server error');

  if (process.env.NODE_ENV !== 'production') {
    console.error('Unhandled error:', error);
  }

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
    code: err.code,
  });
};
