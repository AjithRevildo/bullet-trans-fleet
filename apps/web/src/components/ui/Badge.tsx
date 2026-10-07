import { z } from 'zod';

export const fleetOverviewSchema = z.object({
  totalVehicles: z.number(),
  onlineVehicles: z.number(),
  moving: z.number(),
  idle: z.number(),
  maintenance: z.number(),
  offline: z.number(),
});

export const fleetVehicleSchema = z.object({
  id: z.string(),
  vehicleNumber: z.string(),
  registrationNumber: z.string(),
  status: z.string(),
  vehicleType: z.string(),
  make: z.string(),
  model: z.string(),
  branchId: z.string().nullable(),
  gpsProvider: z.string(),
  ownership: z.string(),
  lastUpdated: z.string(),
});

export const apiEnvelopeSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    message: z.string(),
    data: dataSchema,
  });

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

export async function fetchFleetOverview(): Promise<z.infer<typeof fleetOverviewSchema>> {
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

export async function fetchFleetVehicles(): Promise<z.infer<typeof fleetVehicleSchema>[]> {
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
