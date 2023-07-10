import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { CustomError, Errors } from '../../../application/entities/shared/Errors';
import { ILogger } from '../../../logger/Logger';
import { IAuth } from './IAuth';
import { authDataParser, AuthModel } from './Schema';
import { UserModel, userDataParser } from '../mongoose/repositories/user/Schema';

type AuthConfig = {
  secretJwt: string;
};
export const authModule = ({ secretJwt }: AuthConfig, logger: ILogger): IAuth => ({
  async create(params) {
    const log = logger.child({ function: 'create' });
    try {
      return AuthModel.create(params).then(authDataParser);
    } catch (e: any) {
      log.error(e);
      if (e instanceof CustomError) {
        throw new CustomError(e.code as Errors, e.message);
      }
      throw new CustomError(Errors.SERVER_ERROR, e);
    }
  },
  async getByRol(role) {
    const log = logger.child({ function: 'getByRol' });
    try {
      const auth = await AuthModel.findOne({ role });
      if (!auth) {
        return null;
      }

      return authDataParser(auth);
    } catch (e: any) {
      log.error(e);
      if (e instanceof CustomError) {
        throw new CustomError(e.code as Errors, e.message);
      }
      throw new CustomError(Errors.SERVER_ERROR, e);
    }
  },

  async update(id, params) {
    const log = logger.child({ function: 'update' });
    try {
      return await AuthModel.findOneAndUpdate({ _id: id }, params, { new: true, omitUndefined: true }).then(
        (auth: any) => {
          if (!auth) throw new CustomError(Errors.NOT_FOUND, 'auth not found');
          return authDataParser(auth);
        }
      );
    } catch (e: any) {
      log.error(e);
      if (e instanceof CustomError) {
        throw new CustomError(e.code as Errors, e.message);
      }
      throw new CustomError(Errors.SERVER_ERROR, e);
    }
  },
  async signIn(password, email) {
    const log = logger.child({ function: 'signIn' });
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        throw new CustomError(Errors.NOT_FOUND, `Not Found ${email}`);
      }
      const userFound = userDataParser(user)!;

      const isValid = await bcrypt.compare(password, userFound.password);
      if (!isValid) throw new CustomError(Errors.BAD_CREDENTIALS, 'Bad Credentiasl');
      return { jwt: jwt.sign({ id: userFound.id, email: userFound.email }, secretJwt, { expiresIn: '1h' }) };
    } catch (e: any) {
      log.error(e);
      if (e instanceof CustomError) {
        throw new CustomError(e.code as Errors, e.message);
      }
      throw new CustomError(Errors.SERVER_ERROR, e);
    }
  },
  async identify(token, permission) {
    const log = logger.child({ function: 'identify' });
    try {
      const decoded: any = await jwt.verify(token, secretJwt);
      const user = await UserModel.findOne({ email: decoded.email });
      if (!user) {
        throw new CustomError(Errors.NOT_FOUND, `Not Found ${decoded.email}`);
      }
      const userFound = userDataParser(user)!;
      const role = await this.getByRol(userFound.role);
      return role?.permissions.includes(permission);
    } catch (e: any) {
      log.error(e);
      if (e instanceof CustomError) {
        throw new CustomError(e.code as Errors, e.message);
      }
      throw new CustomError(Errors.SERVER_ERROR, e);
    }
  }
});
