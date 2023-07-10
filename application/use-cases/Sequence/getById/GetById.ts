import { IServices } from 'infrastructure/services/IServices';
import { ILogger } from 'logger/Logger';

import { CustomError, Errors } from '../../../entities/shared/Errors';
import { Sequence } from '../../../../application/entities/Sequence/Sequence';

type Payload = {
  sequenceId: string;
  identificatorObject: any;
};
export const getByIdSequence =
  ({ sequenceService, authService }: IServices, logger: ILogger) =>
  async ({ sequenceId, identificatorObject }: Payload): Promise<Sequence> => {
    logger.info('UOC-getByIdTask');
    const hasPermission = await authService.identify(
      identificatorObject.authorization?.split(' ')[1],
      'getByIdSequence'
    );
    if (!hasPermission) throw new CustomError(Errors.BAD_CREDENTIALS, 'Bad permissions');
    return await sequenceService.getById(sequenceId);
  };
