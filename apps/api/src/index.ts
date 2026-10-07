import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 5000);

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is healthy',
    data: {
      name: 'Bullet Trans Fleet Command Center API',
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
    },
  });
});

app.get('/api/v1', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Bullet Trans Fleet API',
    data: {
      version: '1.0.0',
      status: 'ready',
    },
  });
});

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const message = err instanceof Error ? err.message : 'Internal server error';
  res.status(500).json({
    success: false,
    message,
    code: 'INTERNAL_SERVER_ERROR',
  });
});

app.listen(port, () => {
  console.log(`Bullet Trans Fleet API listening on http://localhost:${port}`);
});

export default app;
