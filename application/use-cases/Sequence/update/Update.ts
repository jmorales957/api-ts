import { IServices } from 'infrastructure/services/IServices';
import { ILogger } from 'logger/Logger';

import { CustomError, Errors } from '../../../entities/shared/Errors';
import { Sequence } from '../../../../application/entities/Sequence/Sequence';
import { UpdateSequenceDTO } from '../../../../application/entities/Sequence/Sequence.dto';

type Payload = {
  body: UpdateSequenceDTO;
  sequenceId: string;
  identificatorObject: any;
};
export const updateSequence =
  ({ sequenceService, authService }: IServices, logger: ILogger) =>
  async ({ sequenceId, body, identificatorObject }: Payload): Promise<Sequence> => {
    logger.info('UOC-updateSequence');
    const hasPermission = await authService.identify(
      identificatorObject.authorization?.split(' ')[1],
      'updateSequence'
    );
    if (!hasPermission) throw new CustomError(Errors.BAD_CREDENTIALS, 'Bad permissions');
    return await sequenceService.update(sequenceId, body);
  };
