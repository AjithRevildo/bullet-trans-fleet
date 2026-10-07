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

export type AlertRecord = {
  id: string;
  title: string;
  vehicle: string;
  level: 'ALERT' | 'WARNING' | 'OK';
  description: string;
  time: string;
};

export type MaintenanceRecord = {
  id: string;
  vehicle: string;
  service: string;
  date: string;
  status: 'ACTIVE' | 'WARNING' | 'OK';
};

export type ComplianceRecord = {
  id: string;
  name: string;
  detail: string;
  status: 'OK' | 'WARNING' | 'ALERT';
};

export type AnalyticsRecord = {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: 'LOW' | 'MEDIUM' | 'HIGH';
};

export type DocumentRecord = {
  id: string;
  name: string;
  category: string;
  owner: string;
  updatedAt: string;
  status: 'APPROVED' | 'PENDING' | 'ARCHIVED' | 'REVIEW';
};

export type AuditRecord = {
  id: string;
  actor: string;
  action: string;
  entity: string;
  time: string;
  impact: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
};

export const dispatchQueue = [
  { id: 'DISP-101', route: 'Bengaluru -> Mysuru', vehicle: 'BT-0001', status: 'ACTIVE', eta: '2h 15m' },
  { id: 'DISP-102', route: 'Hubli -> Mangalore', vehicle: 'BT-0042', status: 'ON_ROUTE', eta: '3h 40m' },
  { id: 'DISP-103', route: 'Coimbatore -> Salem', vehicle: 'BT-0137', status: 'DELAYED', eta: '5h 10m' },
  { id: 'DISP-104', route: 'Chennai -> Trichy', vehicle: 'BT-0088', status: 'ACTIVE', eta: '1h 55m' },
];

export const geofenceZones = [
  { id: 'ZONE-01', name: 'Whitefield Gate', region: 'Bengaluru East', status: 'OK' },
  { id: 'ZONE-02', name: 'Industrial Belt', region: 'Hubli', status: 'WARNING' },
  { id: 'ZONE-03', name: 'Urban Core', region: 'Chennai', status: 'ALERT' },
  { id: 'ZONE-04', name: 'Warehouse Route', region: 'Coimbatore', status: 'OK' },
];

export const tripRecords = [
  { id: 'TRIP-1001', route: 'Bengaluru -> Mysuru', vehicle: 'BT-0001', driver: 'Arun Kumar', status: 'ON_ROUTE', eta: '2h 15m', distance: '145 km' },
  { id: 'TRIP-1002', route: 'Hubli -> Mangalore', vehicle: 'BT-0042', driver: 'Suresh Rao', status: 'DELAYED', eta: '3h 40m', distance: '246 km' },
  { id: 'TRIP-1003', route: 'Coimbatore -> Salem', vehicle: 'BT-0137', driver: 'Vignesh P', status: 'ACTIVE', eta: '1h 10m', distance: '85 km' },
  { id: 'TRIP-1004', route: 'Chennai -> Trichy', vehicle: 'BT-0088', driver: 'Naveen M', status: 'COMPLETED', eta: 'Completed', distance: '318 km' },
] satisfies TripRecord[];

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

export const alertRecords: AlertRecord[] = [
  { id: 'ALERT-01', title: 'Fuel anomaly', vehicle: 'BT-0042', level: 'WARNING', description: 'Unexpected fuel drop detected in the last 90 minutes.', time: '8 mins ago' },
  { id: 'ALERT-02', title: 'Hard brake event', vehicle: 'BT-0088', level: 'ALERT', description: 'High-impact brake pattern near urban corridor.', time: '14 mins ago' },
  { id: 'ALERT-03', title: 'Tire pressure warning', vehicle: 'BT-0137', level: 'WARNING', description: 'Rear tire pressure below threshold.', time: '26 mins ago' },
  { id: 'ALERT-04', title: 'Route deviation', vehicle: 'BT-0001', level: 'ALERT', description: 'Vehicle exited approved corridor near Mysuru ring road.', time: '38 mins ago' },
];

export const maintenanceRecords: MaintenanceRecord[] = [
  { id: 'M-101', vehicle: 'BT-0091', service: 'Oil change', date: 'Today', status: 'WARNING' },
  { id: 'M-102', vehicle: 'BT-0220', service: 'Brake inspection', date: 'Tomorrow', status: 'ACTIVE' },
  { id: 'M-103', vehicle: 'BT-0156', service: 'Tire rotation', date: 'Thu 12 Sep', status: 'OK' },
  { id: 'M-104', vehicle: 'BT-0034', service: 'Battery test', date: 'Fri 13 Sep', status: 'WARNING' },
];

export const complianceRecords: ComplianceRecord[] = [
  { id: 'C-01', name: 'Insurance renewals', detail: 'All branches current', status: 'OK' },
  { id: 'C-02', name: 'Driver permits', detail: '2 permits expiring in 12 days', status: 'WARNING' },
  { id: 'C-03', name: 'Vehicle inspections', detail: '3 vehicles require priority review', status: 'ALERT' },
];

export const analyticsRecords: AnalyticsRecord[] = [
  { id: 'A-01', label: 'On-time delivery', value: '94.2%', change: '+3.4% from last week', trend: 'HIGH' },
  { id: 'A-02', label: 'Fuel efficiency', value: '18.7 km/l', change: '+1.2% vs target', trend: 'MEDIUM' },
  { id: 'A-03', label: 'Idle time', value: '6.8%', change: '-1.1% improvement', trend: 'LOW' },
  { id: 'A-04', label: 'Dispatch SLA', value: '97.9%', change: '+2.1% uplift', trend: 'HIGH' },
];

export const documentRecords: DocumentRecord[] = [
  { id: 'DOC-01', name: 'Route permit pack', category: 'Compliance', owner: 'Ops Team', updatedAt: '2 hours ago', status: 'APPROVED' },
  { id: 'DOC-02', name: 'Insurance binder', category: 'Finance', owner: 'Accounts', updatedAt: 'Yesterday', status: 'PENDING' },
  { id: 'DOC-03', name: 'Vehicle registration logs', category: 'Asset Control', owner: 'Fleet Admin', updatedAt: '3 days ago', status: 'ARCHIVED' },
  { id: 'DOC-04', name: 'Driver training checklist', category: 'Safety', owner: 'HSE Manager', updatedAt: '5 days ago', status: 'REVIEW' },
];

export const auditRecords: AuditRecord[] = [
  { id: 'AUD-01', actor: 'Amelia West', action: 'Updated route priority', entity: 'TRIP-1002', time: '09:14 AM', impact: 'HIGH' },
  { id: 'AUD-02', actor: 'Fleet Ops Bot', action: 'Auto-generated alert', entity: 'BT-0042', time: '08:52 AM', impact: 'MEDIUM' },
  { id: 'AUD-03', actor: 'Rahul Menon', action: 'Approved permit file', entity: 'Route permit pack', time: '08:23 AM', impact: 'LOW' },
  { id: 'AUD-04', actor: 'Nina Saldanha', action: 'Marked vehicle for maintenance', entity: 'BT-0091', time: '07:46 AM', impact: 'CRITICAL' },
];
