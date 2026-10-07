import express from 'express';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/auth.routes.js';
import { connectDatabase } from './config/database.js';
import { connectRedis } from './config/redis.js';

const app = express();
const port = Number(process.env.PORT || 5000);

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
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDatabase();
    await connectRedis();

    app.listen(port, () => {
      console.log(`Bullet Trans Fleet API listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start API server', error);
    process.exit(1);
  }
};

startServer();

export default app;
