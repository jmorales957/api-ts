import { z } from 'zod';

import { UserRole } from './User';

export const CreateUserDTO = z
  .object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    role: UserRole
  })
  .strict();

export type CreateUserDTO = z.infer<typeof CreateUserDTO>;
