import { z } from 'zod';

export const CreateAuthDTO = z
  .object({
    role: z.string(),
    permissions: z.array(z.string())
  })
  .strict();

export type CreateAuthDTO = z.infer<typeof CreateAuthDTO>;

export const UpdateAuthDTO = z
  .object({
    role: z.string().optional(),
    permissions: z.array(z.string()).optional()
  })
  .strict();

export type UpdateAuthDTO = z.infer<typeof UpdateAuthDTO>;

export const GetByRoleDTO = z
  .object({
    role: z.string()
  })
  .strict();

export type GetByRoleDTO = z.infer<typeof GetByRoleDTO>;
