import { Router } from 'express';
import { z } from 'zod';
import { loginController, meController, refreshController } from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const refreshRequestSchema = z.object({
  refreshToken: z.string().min(10),
});

router.post('/login', validate(loginRequestSchema), loginController);
router.post('/refresh', validate(refreshRequestSchema), refreshController);
router.get('/me', requireAuth, meController);
router.post('/logout', (_req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Logged out successfully',
    data: null,
  });
});

export default router;
