import { IServices } from '../../../../infrastructure/services/IServices';
import { ILogger } from 'logger/Logger';

import { CustomError, Errors } from '../../../entities/shared/Errors';
import { Sequence } from '../../../../application/entities/Sequence/Sequence';
import { CreateSequenceDTO } from '../../../../application/entities/Sequence/Sequence.dto';

type Payload = {
  body: CreateSequenceDTO;
  identificatorObject: any;
};
export const createSequence =
  ({ sequenceService, authService }: IServices, logger: ILogger) =>
  async ({ body, identificatorObject }: Payload): Promise<Sequence> => {
    logger.info('UOC-createSequence');
    const hasPermission = await authService.identify(
      identificatorObject.authorization?.split(' ')[1],
      'createSequence'
    );
    if (!hasPermission) throw new CustomError(Errors.BAD_CREDENTIALS, 'Bad permissions');
    return await sequenceService.create(body);
  };
