import { PaginatedResult, PaginationParams } from '../common/Pagination';
import { Sequence } from './Sequence';
import { CreateSequenceDTO, UpdateSequenceDTO } from './Sequence.dto';

export type ISequence = {
  create(params: CreateSequenceDTO): Promise<Sequence>;
  getById(id: string): Promise<Sequence>;
  update(id: string, params: UpdateSequenceDTO): Promise<Sequence>;
  delete(id: string): Promise<void>;
  getAll(params: PaginationParams): Promise<PaginatedResult<Sequence>>;
  getTotalSequences(): Promise<any>;
};
