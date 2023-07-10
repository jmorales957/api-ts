import { IServices } from 'infrastructure/services/IServices';
import { ILogger } from 'logger/Logger';

import { Auth } from '../../../entities/auth/Auth';
import { UpdateAuthDTO } from '../../../entities/auth/Auth.dto';
import { CustomError, Errors } from '../../../entities/shared/Errors';

type Payload = {
  body: UpdateAuthDTO;
  identificatorObject: any;
  role: string;
};
export const updateAuth =
  ({ authService }: IServices, logger: ILogger) =>
  async ({ body, role, identificatorObject }: Payload): Promise<Auth> => {
    logger.info('UOC-updateAuth');
    const hasPermission = await authService.identify(identificatorObject.authorization?.split(' ')[1], 'updateRole');
    if (!hasPermission) throw new CustomError(Errors.BAD_CREDENTIALS, 'Bad permissions');
    const auth = await authService.getByRole(role);
    if (!auth) throw new CustomError(Errors.NOT_FOUND, `Not Found ${role}`);

    return await authService.update(auth.id, body);
  };
