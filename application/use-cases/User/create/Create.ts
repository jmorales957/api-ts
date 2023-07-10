import { IServices } from 'infrastructure/services/IServices';
import { ILogger } from 'logger/Logger';

import { CustomError, Errors } from '../../../entities/shared/Errors';
import { User } from '../../../entities/user/User';
import { CreateUserDTO } from '../../../entities/user/User.dto';

type Payload = {
  body: CreateUserDTO;
  identificatorObject: any;
};
export const createUser =
  ({ userService, authService }: IServices, logger: ILogger) =>
  async ({ body, identificatorObject }: Payload): Promise<User> => {
    logger.info('UOC-createUser');
    const hasPermission = await authService.identify(identificatorObject.authorization?.split(' ')[1], 'createUser');
    if (!hasPermission) throw new CustomError(Errors.BAD_CREDENTIALS, 'Bad permissions');
    return await userService.create(body);
  };
