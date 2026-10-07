import { Schema, model, type Document } from 'mongoose';

export interface IGPSDevice extends Document {
  deviceId: string;
  vehicleId: Schema.Types.ObjectId;
  provider: 'MOCK' | 'PROVIDER_A' | 'PROVIDER_B' | 'PROVIDER_C';
  imei?: string;
  status: 'ACTIVE' | 'INACTIVE';
  lastHeartbeat?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const gpsDeviceSchema = new Schema<IGPSDevice>(
  {
    deviceId: { type: String, required: true, unique: true, trim: true },
    vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    provider: {
      type: String,
      enum: ['MOCK', 'PROVIDER_A', 'PROVIDER_B', 'PROVIDER_C'],
      default: 'MOCK',
    },
    imei: { type: String, trim: true },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE',
    },
    lastHeartbeat: Date,
  },
  { timestamps: true },
);

gpsDeviceSchema.index({ deviceId: 1 });
gpsDeviceSchema.index({ vehicleId: 1 });

gpsDeviceSchema.index({ status: 1 });

export const GPSDeviceModel = model<IGPSDevice>('GPSDevice', gpsDeviceSchema);
