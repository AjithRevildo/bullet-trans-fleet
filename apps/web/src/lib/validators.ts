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

export const fleetOverviewResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: fleetOverviewSchema,
});

export const fleetVehiclesResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: z.array(fleetVehicleSchema),
});

export type FleetOverview = z.infer<typeof fleetOverviewSchema>;
export type FleetVehicle = z.infer<typeof fleetVehicleSchema>;
