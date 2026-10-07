export type FleetVehicleRecord = {
  id: string;
  vehicleNumber: string;
  registrationNumber: string;
  status: 'MOVING' | 'IDLE' | 'MAINTENANCE' | 'OFFLINE';
  vehicleType: string;
  make: string;
  model: string;
  branchId: string | null;
  gpsProvider: string;
  ownership: string;
  lastUpdated: string;
};

export type TripRecord = {
  id: string;
  route: string;
  vehicle: string;
  driver: string;
  status: 'ACTIVE' | 'ON_ROUTE' | 'DELAYED' | 'COMPLETED';
  eta: string;
  distance: string;
};

export type DriverRecord = {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  status: 'ACTIVE' | 'ASSIGNED' | 'ON_ROUTE' | 'OFFLINE';
  shift: string;
  branch: string;
};

export type BranchRecord = {
  id: string;
  name: string;
  code: string;
  location: string;
  vehicles: number;
  drivers: number;
  operating: string;
};

export const dispatchQueue = [
  { id: 'DISP-101', route: 'Bengaluru -> Mysuru', vehicle: 'BT-0001', status: 'ACTIVE', eta: '2h 15m' },
  { id: 'DISP-102', route: 'Hubli -> Mangalore', vehicle: 'BT-0042', status: 'ON_ROUTE', eta: '3h 40m' },
  { id: 'DISP-103', route: 'Coimbatore -> Salem', vehicle: 'BT-0137', status: 'DELAYED', eta: '5h 10m' },
  { id: 'DISP-104', route: 'Chennai -> Trichy', vehicle: 'BT-0088', status: 'ACTIVE', eta: '1h 55m' },
];

export const tripRecords: TripRecord[] = [
  { id: 'TRIP-1001', route: 'Bengaluru -> Mysuru', vehicle: 'BT-0001', driver: 'Arun Kumar', status: 'ON_ROUTE', eta: '2h 15m', distance: '145 km' },
  { id: 'TRIP-1002', route: 'Hubli -> Mangalore', vehicle: 'BT-0042', driver: 'Suresh Rao', status: 'DELAYED', eta: '3h 40m', distance: '246 km' },
  { id: 'TRIP-1003', route: 'Coimbatore -> Salem', vehicle: 'BT-0137', driver: 'Vignesh P', status: 'ACTIVE', eta: '1h 10m', distance: '85 km' },
  { id: 'TRIP-1004', route: 'Chennai -> Trichy', vehicle: 'BT-0088', driver: 'Naveen M', status: 'COMPLETED', eta: 'Completed', distance: '318 km' },
];

export const driverRecords: DriverRecord[] = [
  { id: 'DRV-01', name: 'Arun Kumar', phone: '+91 99300 11221', vehicle: 'BT-0001', status: 'ON_ROUTE', shift: '06:00 - 14:00', branch: 'Bengaluru HQ' },
  { id: 'DRV-02', name: 'Suresh Rao', phone: '+91 92340 55191', vehicle: 'BT-0042', status: 'ASSIGNED', shift: '14:00 - 22:00', branch: 'Hubli Depot' },
  { id: 'DRV-03', name: 'Vignesh P', phone: '+91 94880 11210', vehicle: 'BT-0137', status: 'ACTIVE', shift: '08:00 - 16:00', branch: 'Coimbatore Hub' },
  { id: 'DRV-04', name: 'Naveen M', phone: '+91 98740 89711', vehicle: 'BT-0088', status: 'OFFLINE', shift: '22:00 - 06:00', branch: 'Chennai South' },
];

export const branchRecords: BranchRecord[] = [
  { id: 'BR-01', name: 'Bengaluru HQ', code: 'BLR-HQ', location: 'Whitefield, Bengaluru', vehicles: 42, drivers: 19, operating: '24x7' },
  { id: 'BR-02', name: 'Hubli Depot', code: 'HBL-DEP', location: 'Gokul Road, Hubli', vehicles: 31, drivers: 14, operating: '18x7' },
  { id: 'BR-03', name: 'Coimbatore Hub', code: 'CBE-HUB', location: 'Perur, Coimbatore', vehicles: 27, drivers: 12, operating: '16x7' },
  { id: 'BR-04', name: 'Chennai South', code: 'CHE-S', location: 'Tambaram, Chennai', vehicles: 35, drivers: 16, operating: '24x7' },
];
