import { IAuthEntity } from '../../../application/entities/auth/IAuth';
import { ILogger } from '../../../logger/Logger';
import { IDataAccess } from '../../data-access/IDataAccess';

export const authService = ({ authModule }: IDataAccess, logger: ILogger): IAuthEntity => ({
  async create({ role, permissions }) {
    return await authModule.create({ role, permissions });
  },
  async getByRole(role) {
    return await authModule.getByRol(role);
  },
  async update(id, params) {
    return await authModule.update(id, params);
  },
  async identify(jwt, permission) {
    return await authModule.identify(jwt, permission);
  }
});
