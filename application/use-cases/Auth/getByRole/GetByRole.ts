import { IServices } from 'infrastructure/services/IServices';
import { ILogger } from 'logger/Logger';

import { Auth } from '../../../entities/auth/Auth';
import { CustomError, Errors } from '../../../entities/shared/Errors';

type Payload = {
  role: string;
  identificatorObject: any;
};
export const getByRole =
  ({ authService }: IServices, logger: ILogger) =>
  async ({ role, identificatorObject }: Payload): Promise<Auth | null> => {
    logger.info('UOC-getByAuth');
    const hasPermission = await authService.identify(identificatorObject.authorization?.split(' ')[1], 'getByRole');
    if (!hasPermission) throw new CustomError(Errors.BAD_CREDENTIALS, 'Bad permissions');
    return await authService.getByRole(role);
  };
