import type { Request, Response, NextFunction } from 'express';

export type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
  code?: string;
};

export const isApiEnvelope = <T>(value: unknown): value is ApiEnvelope<T> => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return typeof candidate.success === 'boolean' && 'data' in candidate;
};

export const successResponse = <T>(res: Response, data: T, message = 'Success') => {
  const payload: ApiEnvelope<T> = {
    success: true,
    message,
    data,
  };

  return res.status(200).json(payload);
};

export const errorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  code: string,
) => res.status(statusCode).json({
  success: false,
  message,
  code,
  data: null,
});

export class AppError extends Error {
  statusCode: number;
  code: string;

  constructor(statusCode: number, code: string, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}

export const asyncHandler = <T extends (req: Request, res: Response, next: NextFunction) => Promise<unknown>>(
  handler: T,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
};
