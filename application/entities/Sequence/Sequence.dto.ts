import { z } from 'zod';

export const CreateSequenceDTO = z
  .object({
    chain: z.string()
  })
  .strict();

export type CreateSequenceDTO = z.infer<typeof CreateSequenceDTO>;

export const UpdateSequenceDTO = z
  .object({
    sequenceId: z.string(),
    chain: z.string().optional()
  })
  .strict();

export type UpdateSequenceDTO = z.infer<typeof UpdateSequenceDTO>;

export const GetByIdSequenceDTO = z
  .object({
    sequenceId: z.string()
  })
  .strict();

export type GetByIdSequenceDTO = z.infer<typeof GetByIdSequenceDTO>;

export const GetAllSequencesDTO = z
  .object({
    limit: z.string().nonempty().regex(/^\d+$/, 'Invalid, need to be a number').transform(Number),
    page: z.string().nonempty().regex(/^\d+$/, 'Invalid, need to be a number').transform(Number),
    search: z.string().optional()
  })
  .strict();
export type GetAllSequencesDTO = z.infer<typeof GetAllSequencesDTO>;
