import type { Response } from 'express';

export interface ApiResponseMeta {
  [key: string]: unknown;
}

export const successResponse = <T>(
  res: Response,
  data: T,
  message = 'Request successful',
  meta: ApiResponseMeta = {},
) => {
  return res.status(200).json({
    success: true,
    message,
    data,
    meta,
  });
};

export const createdResponse = <T>(res: Response, data: T, message = 'Created successfully') => {
  return res.status(201).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  code: string,
  details?: unknown,
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    code,
    ...(details ? { details } : {}),
  });
};
