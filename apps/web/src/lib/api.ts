import { z } from 'zod';
import { fleetOverviewSchema, fleetVehicleSchema, apiEnvelopeSchema } from './validators';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

async function parseApiResponse<T>(response: Response, schema: z.ZodType<T>): Promise<T> {
  const payload = await response.json().catch(() => null);

  if (!response.ok || !payload || payload.success === false) {
    throw new Error(payload?.message || 'Request failed');
  }

  if (!payload || typeof payload !== 'object' || !('data' in payload)) {
    throw new Error('Invalid API response payload');
  }

  return schema.parse(payload.data);
}

export async function fetchFleetOverview() {
  try {
    const response = await fetch(`${API_BASE_URL}/fleet/overview`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('bt_token') || 'demo-token'}`,
      },
    });

    return await parseApiResponse(response, fleetOverviewSchema);
  } catch (error) {
    console.error('Failed to fetch fleet overview', error);
    const { fallbackOverview } = await import('./fleet');
    return fallbackOverview;
  }
}

export async function fetchFleetVehicles() {
  try {
    const response = await fetch(`${API_BASE_URL}/fleet/vehicles`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('bt_token') || 'demo-token'}`,
      },
    });

    return await parseApiResponse(response, z.array(fleetVehicleSchema));
  } catch (error) {
    console.error('Failed to fetch fleet vehicles', error);
    const { fallbackVehicles } = await import('./fleet');
    return fallbackVehicles;
  }
}

export { apiEnvelopeSchema, fleetOverviewSchema, fleetVehicleSchema };
