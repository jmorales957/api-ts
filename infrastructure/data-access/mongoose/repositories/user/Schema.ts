import { Document, Schema, model } from 'mongoose';

import { PaginatedResult } from '../../../../../application/entities/common/Pagination';
import { User } from '../../../../../application/entities/user/User';

// Document interface
export interface UserDocument extends User, Document {
  id: string;
}

// Schema
const schema = new Schema<UserDocument>(
  {
    name: {
      type: String
    },
    role: {
      type: String
    },
    password: {
      type: String
    },
    email: {
      type: String
    }
  },
  { timestamps: {} }
);

export const UserModel = model<UserDocument>('User', schema);

export const userDataParser = (user: UserDocument | null): User | null => {
  if (!user) return null;
  return {
    id: user._id.toString(),
    name: user.name,
    role: user.role,
    password: user.password,
    email: user.email,
    updatedAt: user.createdAt,
    createdAt: user.updatedAt
  };
};

export const parsePaginateData = (paginateData: PaginatedResult<UserDocument>): PaginatedResult<User> => ({
  page: paginateData.page || 1,
  limit: paginateData.limit,
  pages: paginateData.pages,
  total: paginateData.total,
  results: paginateData.results.map((UserDocument: UserDocument) => userDataParser(UserDocument)!)
});
