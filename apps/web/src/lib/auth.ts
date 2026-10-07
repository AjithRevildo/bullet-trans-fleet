import { apiEnvelopeSchema, fleetOverviewSchema, fleetVehicleSchema } from './validators';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

async function parseApiResponse<T>(response: Response, schema?: z.ZodType<T>): Promise<T> {
  const payload = await response.json().catch(() => null);

  if (!response.ok || !payload || payload.success === false) {
    throw new Error(payload?.message || 'Request failed');
  }

  if (!payload || typeof payload !== 'object' || !('data' in payload)) {
    throw new Error('Invalid API response payload');
  }

  const data = payload.data as T;

  if (schema) {
    return schema.parse(data);
  }

  return data;
}

export async function fetchFleetOverview() {
  try {
    const response = await fetch(`${API_BASE_URL}/fleet/overview`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('bt_token') || 'demo-token'}` },
    });

    return await parseApiResponse(
      response,
      apiEnvelopeSchema(fleetOverviewSchema).transform((envelope) => envelope.data),
    );
  } catch (error) {
    console.error('Failed to fetch fleet overview', error);
    const { fallbackOverview } = await import('./fleet');
    return fallbackOverview;
  }
}

export async function fetchFleetVehicles() {
  try {
    const response = await fetch(`${API_BASE_URL}/fleet/vehicles`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('bt_token') || 'demo-token'}` },
    });

    return await parseApiResponse(
      response,
      apiEnvelopeSchema(z.array(fleetVehicleSchema)).transform((envelope) => envelope.data),
    );
  } catch (error) {
    console.error('Failed to fetch fleet vehicles', error);
    const { fallbackVehicles } = await import('./fleet');
    return fallbackVehicles;
  }
}
