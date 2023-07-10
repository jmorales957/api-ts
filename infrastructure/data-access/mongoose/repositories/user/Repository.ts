import bcrypt from 'bcrypt';
import { UserModel, userDataParser } from './Schema';
import { ILogger } from 'logger/Logger';
import { IRepositoryUser } from 'application/entities/user/User.repository';
import { CustomError, Errors } from '../../../../../application/entities/shared/Errors';

type AuthConfig = {
  saltRounds: any;
};

export const userRepository = ({ saltRounds }: AuthConfig, logger: ILogger): IRepositoryUser => ({
  async create(user) {
    const log = logger.child({ function: 'create' });
    try {
      user.password = await bcrypt.hash(user.password, Number(saltRounds));
      return await UserModel.create(user);
    } catch (e: any) {
      log.error(e);
      throw new CustomError(Errors.SERVER_ERROR, e);
    }
  },
  async getByEmail(email) {
    const log = logger.child({ function: 'getByEmail' });
    try {
      const user = await UserModel.findOne({ email });

      if (!user) {
        return null;
      }
      return userDataParser(user);
    } catch (e: any) {
      log.error(e);
      throw new CustomError(Errors.SERVER_ERROR, e);
    }
  }
});
