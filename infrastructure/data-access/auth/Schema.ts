import { Document, Schema, model } from 'mongoose';

import { Auth } from '../../../application/entities/auth/Auth';

// Document interface
export interface AuthModel extends Auth, Document {
  id: string;
}

// Schema
const schema = new Schema<AuthModel>(
  {
    role: {
      type: String
    },
    permissions: {
      type: [String]
    }
  },
  { timestamps: {} }
);
export const AuthModel = model<AuthModel>('Authentication', schema);

export const authDataParser = (auth: AuthModel): Auth => ({
  id: auth._id.toString(),
  role: auth.role,
  permissions: auth.permissions,
  createdAt: auth.createdAt,
  updatedAt: auth.updatedAt
});
