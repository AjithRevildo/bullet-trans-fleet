import type { Request, Response } from 'express';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import {
  getFleetOverview,
  getFleetVehicles,
  getVehicleLocation,
  seedFleetData,
} from '../services/fleetService.js';

export const getFleetOverviewController = async (_req: Request, res: Response) => {
  try {
    const overview = await getFleetOverview();
    return successResponse(res, overview, 'Fleet overview retrieved successfully');
  } catch (error) {
    return errorResponse(res, 500, 'Unable to fetch fleet overview', 'FLEET_OVERVIEW_ERROR');
  }
};

export const getFleetVehiclesController = async (_req: Request, res: Response) => {
  try {
    const vehicles = await getFleetVehicles();
    return successResponse(res, vehicles, 'Fleet vehicles retrieved successfully');
  } catch (error) {
    return errorResponse(res, 500, 'Unable to fetch fleet vehicles', 'FLEET_VEHICLES_ERROR');
  }
};

export const seedFleetDataController = async (_req: Request, res: Response) => {
  try {
    const result = await seedFleetData();
    return successResponse(res, result, 'Fleet seed data applied successfully');
  } catch (error) {
    return errorResponse(res, 500, 'Unable to seed fleet data', 'FLEET_SEED_ERROR');
  }
};

export const getVehicleLocationController = async (req: Request, res: Response) => {
  try {
    const { vehicleId } = req.params;
    const location = await getVehicleLocation(vehicleId);

    if (!location) {
      return errorResponse(res, 404, 'Vehicle not found', 'VEHICLE_NOT_FOUND');
    }

    return successResponse(res, location, 'Vehicle location retrieved successfully');
  } catch (error) {
    return errorResponse(res, 500, 'Unable to fetch vehicle location', 'VEHICLE_LOCATION_ERROR');
  }
};
