import { Schema, model, type Document, Types } from 'mongoose';

export type UserRole =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'IT_ADMIN'
  | 'FLEET_MANAGER'
  | 'BRANCH_MANAGER'
  | 'DISPATCHER'
  | 'SUPERVISOR'
  | 'DRIVER'
  | 'VIEWER';

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  permissions: string[];
  branchId?: Types.ObjectId;
  status: 'ACTIVE' | 'INACTIVE' | 'LOCKED';
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    role: {
      type: String,
      enum: ['SUPER_ADMIN', 'ADMIN', 'IT_ADMIN', 'FLEET_MANAGER', 'BRANCH_MANAGER', 'DISPATCHER', 'SUPERVISOR', 'DRIVER', 'VIEWER'],
      required: true,
      default: 'VIEWER',
    },
    permissions: [{ type: String }],
    branchId: { type: Schema.Types.ObjectId, ref: 'Branch' },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE', 'LOCKED'],
      default: 'ACTIVE',
    },
  },
  { timestamps: true },
);

userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ branchId: 1 });

export const UserModel = model<IUser>('User', userSchema);
