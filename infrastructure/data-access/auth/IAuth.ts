import { CreateAuthDTO, UpdateAuthDTO } from '../../../application/entities/auth/Auth.dto';
import { Auth } from './Auth';

export type IAuth = {
  create(params: CreateAuthDTO): Promise<Auth>;
  getByRol(role: string): Promise<Auth | null>;
  update(id: string, params: UpdateAuthDTO): Promise<Auth>;
  signIn(password: string, email: string): Promise<any>;
  identify(jwt: string, permission: string): Promise<any>;
};
