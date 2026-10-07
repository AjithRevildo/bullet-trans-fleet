export interface FleetVehicleSeed {
  vehicleNumber: string;
  registrationNumber: string;
  vehicleType: string;
  make: string;
  model: string;
  manufacturingYear: number;
  chassisNumber: string;
  engineNumber: string;
  fuelType: 'PETROL' | 'DIESEL' | 'CNG' | 'ELECTRIC';
  fuelCapacity: number;
  gvw: number;
  gpsProvider: 'MOCK' | 'PROVIDER_A' | 'PROVIDER_B' | 'PROVIDER_C';
  ownership: 'OWNED' | 'LEASED' | 'HIRING';
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE' | 'SOLD' | 'BLACKLISTED';
  purchaseDate: Date;
  insuranceExpiry: Date;
  fcExpiry: Date;
  permitExpiry: Date;
  pucExpiry: Date;
  roadTaxExpiry: Date;
}

const vehicleMakes = ['Ashok Leyland', 'Tata Motors', 'Mahindra', 'Eicher', 'BharatBenz', 'Force', 'Volvo'];
const vehicleModels = {
  'Ashok Leyland': ['Dost', 'Ecomet', 'Boss', 'Bada Dost'],
  'Tata Motors': ['LPT 1109', 'Ultra 1512', 'Yodha', 'Ace Gold'],
  'Mahindra': ['Bolero Pickup', 'Jeeto', 'Supro', 'Blazo X'],
  'Eicher': ['Pro 1059', 'Pro 2049', 'Canter'],
  'BharatBenz': ['1917C', '2523C', '1617R'],
  'Force': ['Traveller', 'Urbania', 'Tipper'],
  'Volvo': ['FM 410', 'FMX', 'B8R'],
};

const fuelTypes: Array<FleetVehicleSeed['fuelType']> = ['DIESEL', 'PETROL', 'CNG', 'ELECTRIC'];
const ownerships: Array<FleetVehicleSeed['ownership']> = ['OWNED', 'LEASED', 'HIRING'];

const pad = (value: number) => value.toString().padStart(2, '0');

export const buildFleetSeed = () => {
  const vehicles: FleetVehicleSeed[] = [];

  for (let i = 1; i <= 164; i += 1) {
    const make = vehicleMakes[i % vehicleMakes.length];
    const modelList = vehicleModels[make as keyof typeof vehicleModels] ?? ['Model'];
    const model = modelList[i % modelList.length];
    const fuelType = fuelTypes[i % fuelTypes.length];
    const ownership = ownerships[i % ownerships.length];
    const status: FleetVehicleSeed['status'] =
      i % 11 === 0 ? 'MAINTENANCE' : i % 7 === 0 ? 'INACTIVE' : 'ACTIVE';

    const vehicleNumber = `BT-${String(i).padStart(4, '0')}`;
    const registrationNumber = `KA${pad((i % 10) + 1)}${pad((i % 12) + 1)}${String(2000 + i % 20)}${String(1000 + i)}`;
    const engineNumber = `ENG-${String(100000 + i)}`;
    const chassisNumber = `CH-${String(200000 + i)}`;
    const manufacturingYear = 2018 + (i % 7);

    const now = new Date();
    const purchaseDate = new Date(now.getFullYear() - ((i % 9) + 1), (i % 12), (i % 28) + 1);
    const insuranceExpiry = new Date(now.getFullYear() + 1, (i % 12), (i % 28) + 1);
    const fcExpiry = new Date(now.getFullYear() + 2, (i % 12), (i % 28) + 1);
    const permitExpiry = new Date(now.getFullYear() + 1, (i % 12), (i % 28) + 1);
    const pucExpiry = new Date(now.getFullYear() + 1, (i % 12), (i % 28) + 1);
    const roadTaxExpiry = new Date(now.getFullYear() + 2, (i % 12), (i % 28) + 1);

    vehicles.push({
      vehicleNumber,
      registrationNumber,
      vehicleType: i % 3 === 0 ? 'TRUCK' : i % 2 === 0 ? 'VAN' : 'TRAILER',
      make,
      model,
      manufacturingYear,
      chassisNumber,
      engineNumber,
      fuelType,
      fuelCapacity: 40 + (i % 6) * 10,
      gvw: 1400 + (i % 8) * 500,
      gpsProvider: i % 4 === 0 ? 'PROVIDER_A' : i % 3 === 0 ? 'PROVIDER_B' : i % 2 === 0 ? 'PROVIDER_C' : 'MOCK',
      ownership,
      status,
      purchaseDate,
      insuranceExpiry,
      fcExpiry,
      permitExpiry,
      pucExpiry,
      roadTaxExpiry,
    });
  }

  return vehicles;
};
