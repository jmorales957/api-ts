import { Document, Schema, model } from 'mongoose';

import { Sequence } from '../../../../../application/entities/Sequence/Sequence';
import { PaginatedResult } from '../../../../../application/entities/common/Pagination';

// Document interface
export interface SequenceModel extends Sequence, Document {
  id: string;
}

// Schema
const schema = new Schema<SequenceModel>(
  {
    chain: {
      type: String
    },
    sequenceNumber: {
      type: Number
    },
    isSequence: {
      type: Boolean
    }
  },
  { timestamps: {} }
);
export const SequenceModel = model<SequenceModel>('Sequence', schema);

export const sequenceDataParser = (sequence: SequenceModel): Sequence => ({
  id: sequence._id.toString(),
  chain: sequence.chain,
  sequenceNumber: sequence.sequenceNumber,
  isSequence: sequence.isSequence,
  createdAt: sequence.createdAt,
  updatedAt: sequence.updatedAt
});

export const parsePaginateData = (paginateData: PaginatedResult<SequenceModel>): PaginatedResult<Sequence> => ({
  page: paginateData.page || 1,
  limit: paginateData.limit,
  pages: paginateData.pages,
  total: paginateData.total,
  results: paginateData.results.map((sequenceDocument) => sequenceDataParser(sequenceDocument)!)
});
