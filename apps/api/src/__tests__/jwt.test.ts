import { describe, expect, it } from 'vitest';
import { generateTokens, verifyAccessToken, verifyRefreshToken } from '../utils/jwt.js';

describe('JWT utilities', () => {
  it('creates and verifies access token', () => {
    const payload = {
      id: 'vehicle-123',
      email: 'ops@bullettrans.example',
      role: 'FLEET_MANAGER',
      permissions: ['VIEW_VEHICLES', 'MANAGE_TRIPS'],
    };

    const { accessToken } = generateTokens(payload);
    const decoded = verifyAccessToken(accessToken);

    expect(decoded.id).toBe(payload.id);
    expect(decoded.email).toBe(payload.email);
    expect(decoded.role).toBe(payload.role);
  });

  it('creates and verifies refresh token', () => {
    const payload = {
      id: 'driver-456',
      email: 'driver@bullettrans.example',
      role: 'DRIVER',
      permissions: ['VIEW_VEHICLES'],
    };

    const { refreshToken } = generateTokens(payload);
    const decoded = verifyRefreshToken(refreshToken);

    expect(decoded.id).toBe(payload.id);
    expect(decoded.email).toBe(payload.email);
  });
});
