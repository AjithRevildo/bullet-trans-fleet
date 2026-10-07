import { Schema, model, type Document, Types } from 'mongoose';

export interface IBranch extends Document {
  name: string;
  code: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  managerId?: Types.ObjectId;
  latitude?: number;
  longitude?: number;
  createdAt: Date;
  updatedAt: Date;
}

const branchSchema = new Schema<IBranch>(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, trim: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    contact: { type: String, required: true },
    managerId: { type: Schema.Types.ObjectId, ref: 'User' },
    latitude: Number,
    longitude: Number,
  },
  { timestamps: true },
);

branchSchema.index({ name: 1 });
branchSchema.index({ code: 1 });

export const BranchModel = model<IBranch>('Branch', branchSchema);
