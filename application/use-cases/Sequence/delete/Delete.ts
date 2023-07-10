import { IServices } from '../../../../infrastructure/services/IServices';
import { ILogger } from 'logger/Logger';

import { CustomError, Errors } from '../../../entities/shared/Errors';

type Payload = {
  sequenceId: string;
  identificatorObject: any;
};
export const deleteSequence =
  ({ sequenceService, authService }: IServices, logger: ILogger) =>
  async ({ sequenceId, identificatorObject }: Payload): Promise<void> => {
    logger.info('UOC-deleteSequence');
    const hasPermission = await authService.identify(
      identificatorObject.authorization?.split(' ')[1],
      'deleteSequence'
    );
    if (!hasPermission) throw new CustomError(Errors.BAD_CREDENTIALS, 'Bad permissions');
    await sequenceService.delete(sequenceId);
  };
