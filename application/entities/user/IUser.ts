import { User } from './User';
import { CreateUserDTO } from './User.dto';

export type IUser = {
  create(params: CreateUserDTO): Promise<User>;
  signIn(password: string, email: string): Promise<any>;
  getByEmail(email: string): Promise<User | null>;
};
