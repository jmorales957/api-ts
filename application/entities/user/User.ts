import { z } from 'zod';

export interface User {
  id: string;
  name: string;
  role: string;
  password: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export const UserRole = z.nativeEnum({
  ADMIN: 'admin',
  USER: 'user'
} as const);
