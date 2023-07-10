import { IServices } from 'infrastructure/services/IServices';
import { ILogger } from 'logger/Logger';

import { Auth } from '../../../entities/auth/Auth';
import { CreateAuthDTO } from '../../../entities/auth/Auth.dto';
import { CustomError, Errors } from '../../../entities/shared/Errors';

type Payload = {
  body: CreateAuthDTO;
  identificatorObject: any;
};
export const createAuth =
  ({ authService }: IServices, logger: ILogger) =>
  async ({ body, identificatorObject }: Payload): Promise<Auth> => {
    logger.info('UOC-createAuth');
    const hasPermission = await authService.identify(identificatorObject.authorization?.split(' ')[1], 'createRole');
    if (!hasPermission) throw new CustomError(Errors.BAD_CREDENTIALS, 'Bad permissions');
    const auth = authService.getByRole(body.role);
    if (!auth) throw new CustomError(Errors.ALREADY_EXIST, `Already Exist ${body.role}`);
    return await authService.create(body);
  };
