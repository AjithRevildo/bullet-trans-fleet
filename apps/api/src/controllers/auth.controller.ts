import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { UserModel } from '../models/User.js';
import { errorResponse, successResponse } from '../utils/apiResponse.js';
import { generateTokens } from '../utils/jwt.js';
import type { Request, Response } from 'express';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const refreshSchema = z.object({
  refreshToken: z.string().min(10),
});

export class AuthService {
  static async login(email: string, password: string) {
    const user = await UserModel.findOne({ email: email.toLowerCase() }).lean();

    if (!user) {
      throw new Error('INVALID_CREDENTIALS');
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      throw new Error('INVALID_CREDENTIALS');
    }

    const { accessToken, refreshToken } = generateTokens({
      id: String(user._id),
      email: user.email,
      role: user.role,
      permissions: user.permissions,
      branchId: user.branchId ? String(user.branchId) : undefined,
    });

    return {
      user: {
        id: String(user._id),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        permissions: user.permissions,
        branchId: user.branchId ? String(user.branchId) : null,
      },
      accessToken,
      refreshToken,
    };
  }
}

export const loginController = async (req: Request, res: Response) => {
  try {
    const payload = loginSchema.parse(req.body);
    const result = await AuthService.login(payload.email, payload.password);
    return successResponse(res, result, 'Login successful');
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Login failed';
    const code = message === 'INVALID_CREDENTIALS' ? 'INVALID_CREDENTIALS' : 'LOGIN_FAILED';
    return errorResponse(res, 401, 'Invalid email or password', code);
  }
};

export const meController = async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    return errorResponse(res, 401, 'Authentication required', 'AUTH_REQUIRED');
  }

  return successResponse(res, user, 'User profile retrieved successfully');
};

export const refreshController = async (req: Request, res: Response) => {
  try {
    const payload = refreshSchema.parse(req.body);
    const { verifyRefreshToken } = await import('../utils/jwt.js');
    const decoded = verifyRefreshToken(payload.refreshToken);

    const user = await UserModel.findById(decoded.id).lean();

    if (!user) {
      return errorResponse(res, 401, 'User not found', 'USER_NOT_FOUND');
    }

    const tokens = generateTokens({
      id: String(user._id),
      email: user.email,
      role: user.role,
      permissions: user.permissions,
      branchId: user.branchId ? String(user.branchId) : undefined,
    });

    return successResponse(res, tokens, 'Token refreshed successfully');
  } catch (error) {
    return errorResponse(res, 401, 'Invalid refresh token', 'INVALID_REFRESH_TOKEN');
  }
};
