import { VehicleModel } from '../models/Vehicle.js';
import { buildFleetSeed } from '../data/fleetSeed.js';
import { GPSLocationModel } from '../models/GPSLocation.js';

const baseLat = 12.9716;
const baseLng = 77.5946;

const statusMap: Record<string, string> = {
  ACTIVE: 'MOVING',
  INACTIVE: 'IDLE',
  MAINTENANCE: 'MAINTENANCE',
  SOLD: 'OFFLINE',
  BLACKLISTED: 'OFFLINE',
};

const generateMockLocation = (index: number) => {
  const offsetLat = ((index % 25) / 1000) * (index % 2 === 0 ? 1 : -1);
  const offsetLng = (((index * 7) % 30) / 1000) * (index % 3 === 0 ? 1 : -1);
  return {
    latitude: Number((baseLat + offsetLat).toFixed(5)),
    longitude: Number((baseLng + offsetLng).toFixed(5)),
    speed: 18 + (index % 30),
    heading: (index * 13) % 360,
  };
};

export const seedFleetData = async () => {
  const existingCount = await VehicleModel.countDocuments();

  if (existingCount > 0) {
    return {
      created: 0,
      total: existingCount,
      message: 'Fleet database already seeded',
    };
  }

  const fleet = buildFleetSeed();
  const inserted = await VehicleModel.insertMany(fleet);

  const gpsPoints = inserted.map((vehicle, index) => {
    const location = generateMockLocation(index + 1);

    return {
      vehicleId: vehicle._id,
      deviceId: vehicle._id,
      timestamp: new Date(),
      location: {
        type: 'Point',
        coordinates: [location.longitude, location.latitude],
      },
      speed: location.speed,
      heading: location.heading,
      ignition: true,
      accuracy: 8 + (index % 6),
      satellites: 12 + (index % 6),
      battery: 80 + (index % 20),
    };
  });

  await GPSLocationModel.insertMany(gpsPoints);

  return {
    created: inserted.length,
    total: inserted.length,
    message: 'Fleet seed data created successfully',
  };
};

export const getFleetOverview = async () => {
  const totalVehicles = await VehicleModel.countDocuments();
  const statusCounts = await VehicleModel.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  const summary: Record<string, number> = {
    total: totalVehicles,
    moving: 0,
    idle: 0,
    maintenance: 0,
    offline: 0,
  };

  for (const group of statusCounts) {
    const label = statusMap[group._id] ?? 'IDLE';
    if (label === 'MOVING') summary.moving += group.count;
    if (label === 'IDLE') summary.idle += group.count;
    if (label === 'MAINTENANCE') summary.maintenance += group.count;
    if (label === 'OFFLINE') summary.offline += group.count;
  }

  return {
    totalVehicles,
    onlineVehicles: totalVehicles - summary.offline,
    ...summary,
  };
};

export const getFleetVehicles = async () => {
  const vehicles = await VehicleModel.find().sort({ vehicleNumber: 1 }).lean();

  return vehicles.map((vehicle) => ({
    id: String(vehicle._id),
    vehicleNumber: vehicle.vehicleNumber,
    registrationNumber: vehicle.registrationNumber,
    status: statusMap[vehicle.status] ?? 'IDLE',
    vehicleType: vehicle.vehicleType,
    make: vehicle.make,
    model: vehicle.model,
    branchId: vehicle.branchId ? String(vehicle.branchId) : null,
    gpsProvider: vehicle.gpsProvider,
    ownership: vehicle.ownership,
    lastUpdated: new Date().toISOString(),
  }));
};

export const getVehicleLocation = async (vehicleId: string) => {
  const vehicle = await VehicleModel.findById(vehicleId).lean();

  if (!vehicle) {
    return null;
  }

  const latestLocation = await GPSLocationModel.findOne({ vehicleId: vehicle._id }).sort({ timestamp: -1 }).lean();

  if (!latestLocation) {
    return {
      vehicleId: String(vehicle._id),
      vehicleNumber: vehicle.vehicleNumber,
      coordinates: {
        latitude: baseLat,
        longitude: baseLng,
      },
      status: statusMap[vehicle.status] ?? 'IDLE',
      speed: 0,
      heading: 0,
      lastUpdated: new Date().toISOString(),
    };
  }

  const [longitude, latitude] = latestLocation.location.coordinates;

  return {
    vehicleId: String(vehicle._id),
    vehicleNumber: vehicle.vehicleNumber,
    coordinates: {
      latitude,
      longitude,
    },
    status: statusMap[vehicle.status] ?? 'IDLE',
    speed: latestLocation.speed ?? 0,
    heading: latestLocation.heading ?? 0,
    lastUpdated: latestLocation.timestamp,
  };
};
