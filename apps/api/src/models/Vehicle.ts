import { Schema, model, type Document, Types } from 'mongoose';

export interface IVehicle extends Document {
  vehicleNumber: string;
  registrationNumber: string;
  vehicleType: string;
  make: string;
  model: string;
  manufacturingYear: number;
  chassisNumber: string;
  engineNumber: string;
  fuelType: 'PETROL' | 'DIESEL' | 'CNG' | 'ELECTRIC';
  fuelCapacity?: number;
  gvw?: number;
  branchId?: Types.ObjectId;
  currentDriverId?: Types.ObjectId;
  gpsDeviceId?: Types.ObjectId;
  gpsProvider: 'MOCK' | 'PROVIDER_A' | 'PROVIDER_B' | 'PROVIDER_C';
  ownership: 'OWNED' | 'LEASED' | 'HIRING';
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE' | 'SOLD' | 'BLACKLISTED';
  purchaseDate?: Date;
  insuranceExpiry?: Date;
  fcExpiry?: Date;
  permitExpiry?: Date;
  pucExpiry?: Date;
  roadTaxExpiry?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const vehicleSchema = new Schema<IVehicle>(
  {
    vehicleNumber: { type: String, required: true, unique: true, trim: true },
    registrationNumber: { type: String, required: true, unique: true, trim: true },
    vehicleType: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    manufacturingYear: { type: Number, required: true },
    chassisNumber: { type: String, required: true, unique: true },
    engineNumber: { type: String, required: true, unique: true },
    fuelType: {
      type: String,
      enum: ['PETROL', 'DIESEL', 'CNG', 'ELECTRIC'],
      required: true,
    },
    fuelCapacity: Number,
    gvw: Number,
    branchId: { type: Schema.Types.ObjectId, ref: 'Branch' },
    currentDriverId: { type: Schema.Types.ObjectId, ref: 'Driver' },
    gpsDeviceId: { type: Schema.Types.ObjectId, ref: 'GPSDevice' },
    gpsProvider: {
      type: String,
      enum: ['MOCK', 'PROVIDER_A', 'PROVIDER_B', 'PROVIDER_C'],
      default: 'MOCK',
    },
    ownership: {
      type: String,
      enum: ['OWNED', 'LEASED', 'HIRING'],
      default: 'OWNED',
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE', 'MAINTENANCE', 'SOLD', 'BLACKLISTED'],
      default: 'ACTIVE',
    },
    purchaseDate: Date,
    insuranceExpiry: Date,
    fcExpiry: Date,
    permitExpiry: Date,
    pucExpiry: Date,
    roadTaxExpiry: Date,
  },
  { timestamps: true },
);

vehicleSchema.index({ registrationNumber: 1 });
vehicleSchema.index({ vehicleNumber: 1 });
vehicleSchema.index({ branchId: 1 });
vehicleSchema.index({ status: 1 });
vehicleSchema.index({ currentDriverId: 1 });

export const VehicleModel = model<IVehicle>('Vehicle', vehicleSchema);
