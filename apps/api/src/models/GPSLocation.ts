import { Schema, model, type Document } from 'mongoose';

export interface IGPSLocation extends Document {
  vehicleId: Schema.Types.ObjectId;
  deviceId: Schema.Types.ObjectId;
  timestamp: Date;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  speed?: number;
  heading?: number;
  ignition?: boolean;
  accuracy?: number;
  satellites?: number;
  battery?: number;
  createdAt: Date;
}

const gpsLocationSchema = new Schema<IGPSLocation>(
  {
    vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true, index: true },
    deviceId: { type: Schema.Types.ObjectId, ref: 'GPSDevice', required: true, index: true },
    timestamp: { type: Date, required: true, index: true },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    speed: Number,
    heading: Number,
    ignition: Boolean,
    accuracy: Number,
    satellites: Number,
    battery: Number,
  },
  { timestamps: true },
);

gpsLocationSchema.index({ 'location': '2dsphere' });
gpsLocationSchema.index({ vehicleId: 1, timestamp: -1 });
gpsLocationSchema.index({ deviceId: 1, timestamp: -1 });

export const GPSLocationModel = model<IGPSLocation>('GPSLocation', gpsLocationSchema);
