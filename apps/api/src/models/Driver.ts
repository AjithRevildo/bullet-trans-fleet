import { Schema, model, type Document, Types } from 'mongoose';

export interface IDriver extends Document {
  name: string;
  employeeId: string;
  mobileNumber: string;
  licenseNumber: string;
  licenseType: string;
  licenseExpiry: Date;
  dateOfJoining: Date;
  branchId?: Types.ObjectId;
  assignedVehicleId?: Types.ObjectId;
  emergencyContact?: string;
  status: 'AVAILABLE' | 'ASSIGNED' | 'ON_TRIP' | 'ON_LEAVE' | 'INACTIVE';
  createdAt: Date;
  updatedAt: Date;
}

const driverSchema = new Schema<IDriver>(
  {
    name: { type: String, required: true, trim: true },
    employeeId: { type: String, required: true, unique: true, trim: true },
    mobileNumber: { type: String, required: true, unique: true, trim: true },
    licenseNumber: { type: String, required: true, unique: true, trim: true },
    licenseType: { type: String, required: true },
    licenseExpiry: { type: Date, required: true },
    dateOfJoining: { type: Date, required: true },
    branchId: { type: Schema.Types.ObjectId, ref: 'Branch' },
    assignedVehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle' },
    emergencyContact: { type: String, trim: true },
    status: {
      type: String,
      enum: ['AVAILABLE', 'ASSIGNED', 'ON_TRIP', 'ON_LEAVE', 'INACTIVE'],
      default: 'AVAILABLE',
    },
  },
  { timestamps: true },
);

driverSchema.index({ employeeId: 1 });
driverSchema.index({ branchId: 1 });
driverSchema.index({ assignedVehicleId: 1 });

driverSchema.index({ status: 1 });

export const DriverModel = model<IDriver>('Driver', driverSchema);
