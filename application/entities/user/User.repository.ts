import { User } from './User';
import { CreateUserDTO } from './User.dto';

export type IRepositoryUser = {
  create(params: CreateUserDTO): Promise<User>;
  getByEmail(email: string): Promise<User | null>;
};
