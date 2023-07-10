import { AnyZodObject } from 'zod';

import { CreateAuthDTO, GetByRoleDTO, UpdateAuthDTO } from '../../../../application/entities/auth/Auth.dto';

import { CreateUserDTO } from '../../../../application/entities/user/User.dto';
import {
  CreateSequenceDTO,
  GetAllSequencesDTO,
  GetByIdSequenceDTO,
  UpdateSequenceDTO
} from '../../../../application/entities/Sequence/Sequence.dto';

export type Route = {
  path: string;
  verb: string;
  useCase: any;
  successCode?: number;
  fileBuffer?: boolean;
  schemaValidation?: AnyZodObject | undefined;
};

export const routes: (dependencies: any) => Array<Route> = (dependencies: any) => [
  //AUTH
  { path: '/auth', verb: 'POST', useCase: dependencies.createAuth, schemaValidation: CreateAuthDTO },
  { path: '/auth/:role', verb: 'GET', useCase: dependencies.getByRole, schemaValidation: GetByRoleDTO },
  { path: '/auth/:role', verb: 'PUT', useCase: dependencies.updateAuth, schemaValidation: UpdateAuthDTO },
  //USERS
  { path: '/users', verb: 'POST', useCase: dependencies.createUser, schemaValidation: CreateUserDTO },
  { path: '/sign-in', verb: 'POST', useCase: dependencies.signIn },
  //Sequence
  { path: '/sequences', verb: 'POST', useCase: dependencies.createSequence, schemaValidation: CreateSequenceDTO },
  {
    path: '/sequences/:sequenceId',
    verb: 'GET',
    useCase: dependencies.getByIdSequence,
    schemaValidation: GetByIdSequenceDTO
  },
  {
    path: '/sequences/:sequenceId',
    verb: 'PUT',
    useCase: dependencies.updateSequence,
    schemaValidation: UpdateSequenceDTO
  },
  {
    path: '/sequences/:sequenceId',
    verb: 'DELETE',
    useCase: dependencies.deleteSequence,
    schemaValidation: GetByIdSequenceDTO
  },
  { path: '/sequences', verb: 'GET', useCase: dependencies.getAllSequence, schemaValidation: GetAllSequencesDTO },
  { path: '/sequences-total', verb: 'GET', useCase: dependencies.getTotalSequence }
];
