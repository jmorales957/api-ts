import { IServices } from 'infrastructure/services/IServices';
import { ILogger } from 'logger/Logger';

import { CustomError, Errors } from '../../../entities/shared/Errors';

type Payload = {
  identificatorObject: any;
};
export const getTotalSequence =
  ({ sequenceService, authService }: IServices, logger: ILogger) =>
  async ({
    identificatorObject
  }: Payload): Promise<{ count_sequence_string: number; count_no_sequence_string: number }> => {
    logger.info('UOC-getTotal');
    const hasPermission = await authService.identify(identificatorObject.authorization?.split(' ')[1], 'getTotal');
    if (!hasPermission) throw new CustomError(Errors.BAD_CREDENTIALS, 'Bad permissions');
    return await sequenceService.getTotalSequences();
  };
