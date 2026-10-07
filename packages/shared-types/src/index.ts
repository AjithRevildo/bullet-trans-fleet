export type FleetStatus = 'MOVING' | 'IDLE' | 'STOPPED' | 'OFFLINE' | 'ALERT' | 'MAINTENANCE';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface VehicleSummary {
  id: string;
  vehicleNumber: string;
  status: FleetStatus;
  branchId?: string;
  driverName?: string;
  lastUpdated?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: Record<string, unknown>;
}
