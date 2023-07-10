import { IDataAccess } from 'infrastructure/data-access/IDataAccess';
import { IServices } from 'infrastructure/services/IServices';

import roles from '../../../../config/roles.json';
import { ILogger } from '../../../../logger/Logger';
import { CustomError, Errors } from '../../../entities/shared/Errors';

export const initialSetup =
  ({ userService, authService }: IServices, logger: ILogger) =>
  async (): Promise<any> => {
    try {
      roles.map(async (role) => {
        const roleFound = await authService.getByRole(role.role);
        if (!roleFound) {
          await authService.create(role);
        }
      });
      const user = await userService.getByEmail('superAdmin@gmail.com');

      if (!user) {
        await userService.create({
          name: 'superAdmin',
          email: 'superAdmin@gmail.com',
          role: 'admin',
          password: 'admin'
        });
      }
    } catch (error: any) {
      throw new CustomError(Errors.SERVER_ERROR, error);
    }
  };
