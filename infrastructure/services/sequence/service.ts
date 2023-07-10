import { ISequence } from '../../../application/entities/Sequence/ISequence';
import { ILogger } from '../../../logger/Logger';
import { IDataAccess } from '../../data-access/IDataAccess';
import { searchRegex } from '../../../infrastructure/data-access/mongoose/helper';
import { countSequence } from '../common/helper';
import { CustomError, Errors } from '../../../application/entities/shared/Errors';

export const sequenceService = ({ sequenceRepository }: IDataAccess, logger: ILogger): ISequence => ({
  async create(params) {
    const sequenceNumber = countSequence(params.chain);
    const isSequence = sequenceNumber > 0 ? true : false;
    const sequence = await sequenceRepository.create({ ...params, sequenceNumber, isSequence });
    if (!sequence.isSequence) throw new CustomError(Errors.BAD_CREDENTIALS, 'There is not sequence');
    return sequence;
  },
  async getById(id) {
    return await sequenceRepository.getById(id);
  },
  async update(id, params) {
    const sequenceNumber = countSequence(params.chain!);
    const isSequence = sequenceNumber > 0 ? true : false;
    return await sequenceRepository.update(id, { ...params, sequenceNumber, isSequence });
  },
  async delete(id) {
    await sequenceRepository.delete(id);
  },
  async getAll({ page, limit, search }) {
    const parsedSearch = searchRegex(search ?? '');
    const options = {
      page,
      limit,
      sort: { createdAt: 1 }
    };
    const aggregationPipeline = [
      {
        $match: {
          $or: [{ chain: { $regex: parsedSearch, $options: 'i' } }]
        }
      }
    ];
    return await sequenceRepository.getAll({ aggregationPipeline, options });
  },
  async getTotalSequences() {
    const total = await sequenceRepository.getSequenceTotal();
    return total[0];
  }
});
