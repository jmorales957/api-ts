import { Aggregate } from 'mongoose';

import { IRepositorySequence } from '../../../../../application/entities/Sequence/Sequence.repository';
import { CustomError, Errors } from '../../../../../application/entities/shared/Errors';
import { ILogger } from '../../../../../logger/Logger';
import { paginate } from '../../pagination/Pagination';
import { SequenceModel, sequenceDataParser, parsePaginateData } from './Schema';

export const sequenceRepository = (logger: ILogger): IRepositorySequence => ({
  async create(sequence) {
    const log = logger.child({ function: 'save' });
    try {
      return SequenceModel.create(sequence).then(sequenceDataParser);
    } catch (e) {
      log.error(e);
      if (e instanceof CustomError) {
        throw new CustomError(e.code as Errors, e.message);
      }
      throw new CustomError(Errors.SERVER_ERROR, 'something went wrong');
    }
  },
  async update(id, sequence) {
    const log = logger.child({ function: 'update' });
    try {
      return await SequenceModel.findOneAndUpdate({ _id: id }, sequence, { new: true, omitUndefined: true }).then(
        (sequence: any) => {
          if (!sequence) throw new CustomError(Errors.NOT_FOUND, 'Sequence not found');
          return sequenceDataParser(sequence);
        }
      );
    } catch (e: any) {
      log.error(e);
      if (e instanceof CustomError) {
        throw new CustomError(e.code as Errors, e.message);
      }
      throw new CustomError(Errors.SERVER_ERROR, e);
    }
  },
  async getById(id) {
    const log = logger.child({ function: 'getById' });
    try {
      const sequence = await SequenceModel.findOne({ _id: id });
      if (!sequence) throw new CustomError(Errors.NOT_FOUND, 'Sequence not exist');
      return sequenceDataParser(sequence);
    } catch (e: any) {
      log.error(e);
      if (e instanceof CustomError) {
        throw new CustomError(e.code as Errors, e.message);
      }
      throw new CustomError(Errors.SERVER_ERROR, e);
    }
  },
  async getAll({ aggregationPipeline, options }) {
    const log = logger.child({ function: 'getAll' });
    try {
      const pipeline: Aggregate<any[]> = SequenceModel.aggregate(aggregationPipeline);
      const sequences = await paginate(SequenceModel, pipeline, options);
      return parsePaginateData(sequences);
    } catch (e: any) {
      log.error(e);
      throw new CustomError(Errors.SERVER_ERROR, e);
    }
  },
  async delete(id) {
    const log = logger.child({ function: 'delete' });
    try {
      await SequenceModel.findOneAndDelete({ _id: id }).then((sequence: any) => {
        if (!sequence) throw new CustomError(Errors.NOT_FOUND, 'Sequence not found');
        return;
      });
    } catch (e: any) {
      log.error(e);
      if (e instanceof CustomError) {
        throw new CustomError(e.code as Errors, e.message);
      }
      throw new CustomError(Errors.SERVER_ERROR, e);
    }
  },
  async getSequenceTotal() {
    const log = logger.child({ function: 'getTotal' });
    try {
      return SequenceModel.aggregate([
        {
          $group: {
            _id: null,
            count_sequence_string: { $sum: { $cond: [{ $eq: ['$isSequence', true] }, 1, 0] } },
            count_no_sequence_string: { $sum: { $cond: [{ $eq: ['$isSequence', false] }, 1, 0] } }
          }
        },
        {
          $project: {
            _id: 0,
            count_sequence_string: 1,
            count_no_sequence_string: 1
          }
        }
      ]);
    } catch (e: any) {
      log.error(e);
      throw new CustomError(Errors.SERVER_ERROR, e);
    }
  }
});
