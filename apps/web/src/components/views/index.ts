import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('./config/database.js', () => ({
  connectDatabase: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('./config/redis.js', () => ({
  connectRedis: vi.fn().mockResolvedValue(undefined),
}));

import request from 'supertest';
import { createApp } from './app';

describe('api app factory', () => {
  it('creates an Express app and exposes the health endpoint', async () => {
    const app = await createApp();
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});

beforeEach(() => {
  vi.clearAllMocks();
});
