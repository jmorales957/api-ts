import { IRepositorySequence } from '../../application/entities/Sequence/Sequence.repository';
import { IRepositoryUser } from '../../application/entities/user/User.repository';
import { IAuth } from './auth/IAuth';

export type IDataAccess = {
  sequenceRepository: IRepositorySequence;
  authModule: IAuth;
  userRepository: IRepositoryUser;
};
