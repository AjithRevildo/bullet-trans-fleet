import express, { type Express } from 'express';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/auth.routes.js';
import fleetRoutes from './routes/fleet.routes.js';
import { connectDatabase } from './config/database.js';
import { connectRedis } from './config/redis.js';

export const createApp = async (): Promise<Express> => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/health', (_req, res) => {
    res.status(200).json({
      success: true,
      message: 'API is healthy',
      data: {
        service: 'bullet-trans-fleet-api',
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString(),
      },
    });
  });

  app.get('/api/v1', (_req, res) => {
    res.status(200).json({
      success: true,
      message: 'Bullet Trans Fleet API ready',
      data: {
        version: '1.0.0',
        status: 'ready',
      },
    });
  });

  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/fleet', fleetRoutes);
  app.use(errorHandler);

  await connectDatabase();
  await connectRedis();

  return app;
};

export default createApp;
