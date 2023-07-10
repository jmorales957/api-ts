import { IServices } from 'infrastructure/services/IServices';
import { ILogger } from 'logger/Logger';

import { PaginatedResult } from '../../../entities/common/Pagination';
import { Sequence } from '../../../../application/entities/Sequence/Sequence';

export const getAllSequence =
  ({ sequenceService }: IServices, logger: ILogger) =>
  async ({ page, limit, search }: any): Promise<PaginatedResult<Sequence>> => {
    logger.info('UOC-getAllSequence');
    return await sequenceService.getAll({ page, limit, search });
  };
