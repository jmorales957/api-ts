import { Auth } from './Auth';
import { CreateAuthDTO, UpdateAuthDTO } from './Auth.dto';

export type IAuthEntity = {
  create(params: CreateAuthDTO): Promise<Auth>;
  getByRole(role: string): Promise<Auth | null>;
  update(id: string, params: UpdateAuthDTO): Promise<Auth>;
  identify(jwt: string, permission: string): Promise<boolean>;
};
