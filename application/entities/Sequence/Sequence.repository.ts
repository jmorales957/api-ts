import { PaginatedResult, PaginationParams } from '../common/Pagination';
import { Sequence } from './Sequence';

type CreateSequenceDTO = {
  chain: string;
  sequenceNumber: number;
  isSequence: boolean;
};

type UpdateSequenceDTO = {
  chain?: string;
  sequenceNumber?: number;
  isSequence?: boolean;
};
export type IRepositorySequence = {
  create(sequence: CreateSequenceDTO): Promise<Sequence>;
  getById(id: string): Promise<Sequence>;
  update(id: string, params: UpdateSequenceDTO): Promise<Sequence>;
  delete(id: string): Promise<void>;
  getAll(params: any): Promise<PaginatedResult<Sequence>>;
  getSequenceTotal(): Promise<any>;
};
