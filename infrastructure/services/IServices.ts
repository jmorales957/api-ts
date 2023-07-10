import { IAuthEntity } from '../../application/entities/auth/IAuth';
import { ISequence } from '../../application/entities/Sequence/ISequence';
import { IUser } from '../../application/entities/user/IUser';

export type IServices = {
  sequenceService: ISequence;
  authService: IAuthEntity;
  userService: IUser;
};
