import { IServices } from 'infrastructure/services/IServices';
import { ILogger } from 'logger/Logger';

import { User } from '../../../entities/user/User';
import { CreateUserDTO } from '../../../entities/user/User.dto';

type Payload = {
  body: CreateUserDTO;
};
export const signIn =
  ({ userService }: IServices, logger: ILogger) =>
  async ({ body }: any): Promise<any> => {
    logger.info('UOC-signInUser');
    return await userService.signIn(body.password, body.email);
  };
