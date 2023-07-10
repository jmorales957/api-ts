import { IUser } from '../../../application/entities/user/IUser';
import { ILogger } from '../../../logger/Logger';
import { IDataAccess } from '../../data-access/IDataAccess';

export const userService = ({ userRepository, authModule }: IDataAccess, logger: ILogger): IUser => ({
  async create(user) {
    return await userRepository.create(user);
  },
  async signIn(password, email) {
    return await authModule.signIn(password, email);
  },
  async getByEmail(email: string) {
    return await userRepository.getByEmail(email);
  }
});
