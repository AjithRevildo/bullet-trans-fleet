export type FleetOverview = {
  totalVehicles: number;
  onlineVehicles: number;
  moving: number;
  idle: number;
  maintenance: number;
  offline: number;
};

export type FleetVehicle = {
  id: string;
  vehicleNumber: string;
  registrationNumber: string;
  status: string;
  vehicleType: string;
  make: string;
  model: string;
  branchId: string | null;
  gpsProvider: string;
  ownership: string;
  lastUpdated: string;
};

export const fallbackOverview: FleetOverview = {
  totalVehicles: 164,
  onlineVehicles: 148,
  moving: 86,
  idle: 42,
  maintenance: 12,
  offline: 16,
};

export const fallbackVehicles: FleetVehicle[] = [
  { id: '1', vehicleNumber: 'BT-0001', registrationNumber: 'KA01AB1001', status: 'MOVING', vehicleType: 'TRUCK', make: 'Ashok Leyland', model: 'Dost', branchId: 'br-01', gpsProvider: 'MOCK', ownership: 'OWNED', lastUpdated: new Date().toISOString() },
  { id: '2', vehicleNumber: 'BT-0002', registrationNumber: 'KA01AB1002', status: 'IDLE', vehicleType: 'VAN', make: 'Tata Motors', model: 'Ultra 1512', branchId: 'br-01', gpsProvider: 'PROVIDER_A', ownership: 'LEASED', lastUpdated: new Date(Date.now() - 300000).toISOString() },
  { id: '3', vehicleNumber: 'BT-0003', registrationNumber: 'KA02AB1003', status: 'MAINTENANCE', vehicleType: 'TRAILER', make: 'Mahindra', model: 'Blazo X', branchId: 'br-02', gpsProvider: 'MOCK', ownership: 'OWNED', lastUpdated: new Date(Date.now() - 900000).toISOString() },
  { id: '4', vehicleNumber: 'BT-0004', registrationNumber: 'KA03AB1004', status: 'MOVING', vehicleType: 'TRUCK', make: 'Eicher', model: 'Pro 1059', branchId: 'br-02', gpsProvider: 'PROVIDER_B', ownership: 'HIRING', lastUpdated: new Date(Date.now() - 120000).toISOString() },
  { id: '5', vehicleNumber: 'BT-0005', registrationNumber: 'KA04AB1005', status: 'OFFLINE', vehicleType: 'TRUCK', make: 'BharatBenz', model: '1917C', branchId: 'br-03', gpsProvider: 'PROVIDER_C', ownership: 'OWNED', lastUpdated: new Date(Date.now() - 1800000).toISOString() },
  { id: '6', vehicleNumber: 'BT-0006', registrationNumber: 'KA05AB1006', status: 'MOVING', vehicleType: 'VAN', make: 'Force', model: 'Traveller', branchId: 'br-03', gpsProvider: 'MOCK', ownership: 'LEASED', lastUpdated: new Date(Date.now() - 240000).toISOString() },
];

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

async function parseApiResponse<T>(response: Response): Promise<T> {
  const data = await response.json();

  if (!response.ok || data?.success === false) {
    throw new Error(data?.message || 'Request failed');
  }

  return data.data as T;
}

export async function fetchFleetOverview(): Promise<FleetOverview> {
  try {
    const response = await fetch(`${API_BASE_URL}/fleet/overview`, {
      headers: {
        Authorization: 'Bearer demo-token',
      },
    });

    return await parseApiResponse<FleetOverview>(response);
  } catch (error) {
    return fallbackOverview;
  }
}

export async function fetchFleetVehicles(): Promise<FleetVehicle[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/fleet/vehicles`, {
      headers: {
        Authorization: 'Bearer demo-token',
      },
    });

    return await parseApiResponse<FleetVehicle[]>(response);
  } catch (error) {
    return fallbackVehicles;
  }
}
